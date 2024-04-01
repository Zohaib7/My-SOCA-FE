import {
  getAgeGroup,
  getDate,
  getDivision,
  getFieldingSession,
  getManager,
  getPlayer,
  getTeam,
  getTeamAllocation,
  getTournament,
  updateFieldingSession,
} from '@Api/App';
import {queryClient} from '@Api/Client';
import {STORAGE_KEYS} from '@Constants/queryKeys';
import { getItem } from '@Service/storageService';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useState} from 'react';

export default function useManagerContainer(
  selectedTourney: string | undefined,
  selectedDivision: string | undefined,
  selectedTeam: string | undefined,
  selectedOpponent: string | undefined,
  selectedDate: any,
) {
  const userData = getItem(STORAGE_KEYS.GET_PARENT_USER_DETAILS)
  const [updateSession, setUpdateSession] = useState();
  const {data: managerData} = useQuery(
    [STORAGE_KEYS.GET_MANAGER],
    () => getManager({}),
    {cacheTime: 0, staleTime: 0},
  );

  const {data: getTournamentData} = useQuery(
    [STORAGE_KEYS.GET_TOURNAMENT],
    getTournament,
    {cacheTime: 0, staleTime: 0},
  );

  const {data: getDivisionData} = useQuery(
    [STORAGE_KEYS.GET_DIVISION],
    getDivision,
    {cacheTime: 0, staleTime: 0},
  );

  const {data: getTeamData} = useQuery([STORAGE_KEYS.GET_TEAMS], getTeam, {
    cacheTime: 0,
    staleTime: 0,
  });

  const {data: getDateData,refetch:getDateRefetch} = useQuery(
    [STORAGE_KEYS.GET_DATE],
    () =>
      getDate({
        selectedTourney,
        selectedDivision,
        selectedTeam,
        selectedOpponent,
        userData
      }),
    {cacheTime: 0, staleTime: 0},
  );

  const {data: getAllocationData, refetch: AllocationRefetch} = useQuery(
    [STORAGE_KEYS.GET_ALLOCATION],
    () =>
      selectedDate ||
      selectedTourney ||
      selectedDivision ||
      selectedTeam ||
      selectedOpponent ||
      getTeamAllocation({
        selectedDate,
        selectedTourney,
        selectedDivision,
        selectedTeam,
        selectedOpponent,
        userData,
      }),
    {cacheTime: 0, staleTime: 0},
  );

  const {data: getSessionData,refetch:fieldingSessionRefetch} = useQuery(
    [STORAGE_KEYS.GET_FIELDING_SESSION],
    () =>
      getFieldingSession({
        selectedDate,
        selectedTourney,
        selectedDivision,
        selectedTeam,
        selectedOpponent,
        userData
      }),
    {cacheTime: 0, staleTime: 0},
  );

  const {mutate: updateFieldingSessionMutate} = useMutation(
    updateFieldingSession,
    {
      onSuccess: (data, payload) => {
        setUpdateSession(data);
        queryClient.invalidateQueries([STORAGE_KEYS.GET_FIELDING_SESSION]);
      },
    },
  );

  return {
    managerData,
    getTournamentData,
    getDivisionData,
    getTeamData,
    getDateData,
    getAllocationData,
    getSessionData,
    updateFieldingSessionMutate,
    updateSession,
    AllocationRefetch,
    fieldingSessionRefetch,
    getDateRefetch
  };
}
