import {API_CONFIG, CONTENT_TYPE, PAGE_SIZE} from '@Constants/api';
import {apiRequest} from '@Service/ServiceAction';
import {SERVICE_CONFIG_URLS} from '../constants/api_urls';

export const getUserDetails = async (params: any) => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.PLAYER.USER_DETAILS,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getPlayer = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_PLAYER}${params.playerId}/profile`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getAnnouncements = async () => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_ANNOUNCEMENTS}`,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getFmailyPlayers = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_ALL_PLAYERS_DATA}/${params.playerId}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getAllFaqs = async () => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.FAQS}`,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getTier = async (params: any) => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.PLAYER.GET_TIER,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
  });
  return data;
};

export const getRedeem = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_REDEEM}${params.playerId}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getActivity = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_ACTIVITY}${params.userData}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });

  return data;
};

export const getPerformance = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_PLAYER}${params.playerId}/performance`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getPayment = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_PLAYER}payments/${params.playerId}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getCoachInfo = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.COACH.COACH_INFO}${params?.parentId}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getParentDetail = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.PARENT_DATA}${params.parentId}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getCoachBatch = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.COACH.COACH_BATCH}${params?.userData}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getCoachActivity = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.COACH.COACH_ACTIVITY}${params?.userData}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getPlayerProfile = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_PLAYER_PROFILE}${params?.playerId}/profile`,
    method: API_CONFIG.GET,
    params,
    showToast: false,
  });
  return data;
};

export const getAgeGroup = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.COACH.AGE_GROUP,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getPlayerPerformance = async (params: any) => {
  const {userData, year} = params || {};

  const getPlayerId = params?.playerId ? params?.playerId : params;
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_PLAYER_PERFORMANCE}${userData}/performance/${year}?playerId=${getPlayerId}`,
    method: API_CONFIG.GET,
    // params,
    showLoader: false,
  });
  return data;
};

export const getManager = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.MANAGER.MANAGER_INFO}zohaib?date=4/6/2024&team=soca strikers&tournament=wycl&opponent=ssca knights`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
  });
  return data;
};

export const getLocation = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.COACH.LOCATION,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getTournament = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.MANAGER.GET_TOURNAMENT,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};
export const getCoachAttendanceList = async params => {
  const {team, tourney} = params?.payload || {};
  const dob='04/02/24'
  let apiURLDefeault = `${SERVICE_CONFIG_URLS.COACH.GET_COACH_ATTENDANCE_LIST}/${params?.coachId}`;
  let apiURLParams = `${SERVICE_CONFIG_URLS.COACH.GET_COACH_ATTENDANCE_LIST}/${params?.coachId}?date=${dob}&age_grp=${tourney}&ids=${team}`;
console.log(apiURLParams,'apiURLParamsapiURLParamsapiURLParams');

  const {data} = await apiRequest({
    url: dob ? apiURLParams : apiURLDefeault,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getDivision = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.MANAGER.GET_DIVISION,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getTeam = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.MANAGER.GET_TEAM,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getOpponent = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.MANAGER.GET_OPPONENT,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getDate = async (params: any) => {
  const {
    selectedDivision,
    selectedOpponent,
    selectedTeam,
    selectedTourney,
    userData,
  } = params || {};
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.MANAGER.GET_DATE}${userData}?team=${selectedTeam}&tournament=${selectedTourney}&opponent=${selectedOpponent}&division=${selectedDivision}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getTeamAllocation = async (params: any) => {
  const {
    selectedDivision,
    selectedOpponent,
    selectedTeam,
    selectedTourney,
    userData,
    selectedDate,
  } = params || {};
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.MANAGER.GET_TEAM_ALLOCATION}${userData}?date=${selectedDate}&team=${selectedTeam}&tournament=${selectedTourney}&opponent=${selectedOpponent}&division=${selectedDivision}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const updateCoachAttendanceList = async params => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.COACH.GET_COACH_ATTENDANCE_LIST}/${params.playerId}/${params.coachId}`,
    method: API_CONFIG.PUT,
    showLoader: false,
    params: {attendance: params?.attendance},
    showToast: false,
  });
};

export const getFieldingSession = async (params: any) => {
  const {
    selectedDivision,
    selectedOpponent,
    selectedTeam,
    selectedTourney,
    userData,
    selectedDate,
  } = params || {};
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.MANAGER.GET_FIELDING}${userData}?date=${selectedDate}&team=${selectedTeam}&tournament=${selectedTourney}&opponent=${selectedOpponent}&division=${selectedDivision}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};
export const updateFieldingSession = async params => {
  const {div, gm_date, managerId, opp_team, playerId, soca_team, tourney} =
    params || {};
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.MANAGER.UPDATE_GET_FIELDING}${managerId}/${playerId}?date=${gm_date}&team=${soca_team}&tournament=${tourney}&opponent=${opp_team}&division=${div}`,
    method: API_CONFIG.PUT,
    showLoader: false,
    params,
    showToast: false,
  });
  return data;
};

export const getSponsors = async (params: any) => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.PLAYER.GET_SPONSORS,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
  });
  return data;
};

export const About = async () => {
  const url = `${SERVICE_CONFIG_URLS.PLAYER.ABOUT_US}`;
  console.log('API URL:', url); // Log the URL
  
  const { data } = await apiRequest({
    url: url,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });

  return data;
};


export const HallOfFame = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.HALL_OF_FAME}?type=${params?.type}`,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getSummary = async (params: any) => {
  const {playerId} = params || {};
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.SUMMARY}${playerId}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getPlayers = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_ALL_PLAYERS}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getKidAges = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.PLAYER.GET_ACADEMY_KID_AGE,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getAcademyLocation = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.PLAYER.GET_ACADEMY_LOCATION,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getWeeksValue = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.PLAYER.GET_ACADEMY_WEEKS,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const academyResult = async (params: any) => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.PLAYER.GET_ACADEMY,
    method: API_CONFIG.POST,
    params,
  });
  return data;
};

export const getGames = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.PLAYER.GET_TYPE_OF_LANE,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getHours = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.PLAYER.GET_NO_OF_HOURS,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const Rentals = async (params: any) => {
  const {locationZustand, selectedGame, selectedHours} = params || {};
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_RENTAL}?location=${locationZustand}&hours=${selectedHours}&lane=${selectedGame}`,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const pendingPayments = async (params:any) => {
  console.log(params,'paramsparamsparams');
  const {email}=params || {};
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_PENDING_PAYMENTS}?parentId=${email}`,
    method: API_CONFIG.GET,
  });
  return data;
};

export const createPayment = async (params: any) => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.PLAYER.CREATE_PAYMENT,
    method: API_CONFIG.POST,
    params,
  });
  return data;
};

export const getSessionType = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.PLAYER.GET_SESSION_TYPE,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};

export const getKidAgeSession = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.PLAYER.GET_KID_AGE_SESSION,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast: false,
  });
  return data;
};


export const privateResult = async (params: any) => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.PLAYER.GET_PRIVATE,
    method: API_CONFIG.POST,
    params,
  });
  return data;
};




