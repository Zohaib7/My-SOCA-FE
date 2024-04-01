import {API_CONFIG, CONTENT_TYPE, PAGE_SIZE} from '@Constants/api';
import {apiRequest} from '@Service/ServiceAction';
import {SERVICE_CONFIG_URLS} from '../constants/api_urls';

export const getUserDetails = async (params: any) => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.PLAYER.USER_DETAILS,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const getPlayer = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_PLAYER}${params.playerId}/profile`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const getAnnouncements = async () => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_ANNOUNCEMENTS}`,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const getFmailyPlayers = async (params: any) => {
  console.log(params, "params getFmailyPlayers")
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_ALL_PLAYERS_DATA}/${params.playerId}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const getAllFaqs = async () => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.FAQS}`,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast:false
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
    showToast:false
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
    showToast:false
  });
  return data;
};

export const getPayment = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_PLAYER}payments/${params.playerId}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const getCoachInfo = async (params: any) => {
  
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.COACH.COACH_INFO}${params?.parentId}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const getParentDetail = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.PARENT_DATA}${params.parentId}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const getCoachBatch = async (params: any) => {
  
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.COACH.COACH_BATCH}${params?.userData}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const getCoachActivity = async (params: any) => {
  console.log(params?.userData,'params?.userDataparams?.userDataparams?.userDataparams?.userData');
  
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.COACH.COACH_ACTIVITY}${params?.userData}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const getPlayerProfile = async (params: any) => {
  
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_PLAYER_PROFILE}${params?.playerId}/profile`,
    method: API_CONFIG.GET,
    params,
    showToast:false
  })
  return data;
}   

export const getAgeGroup = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.COACH.AGE_GROUP,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const getPlayerPerformance = async (params: any) => {

  const getPlayerId= params?.playerId ? params?.playerId : params
  console.log(getPlayerId, "-----",params,'paramsparamsparamsparamsparamsparams getPlayerPerformancegetPlayerPerformancegetPlayerPerformancegetPlayerPerformance');
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_PLAYER_PERFORMANCE}zohaib/performance/2024?playerId=${getPlayerId}`,
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
    showToast:false
  });
  return data;
};


export const getTournament = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.MANAGER.GET_TOURNAMENT,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast:false
  });
  return data;
};
export const getCoachAttendanceList = async (params) => {
  console.log(params, "params OF getCoachAttendanceList")
  const {dob,team,tourney}=params?.payload || {}
  let apiURLDefeault = `${SERVICE_CONFIG_URLS.COACH.GET_COACH_ATTENDANCE_LIST}/${params?.coachId}`
  let apiURLParams = `${SERVICE_CONFIG_URLS.COACH.GET_COACH_ATTENDANCE_LIST}/${params?.coachId}?date=${dob}&location=${team}&age_grp=${tourney}`
 
 
  const {data} = await apiRequest({
    url: params?.dob ? apiURLParams : apiURLDefeault,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const getDivision = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.MANAGER.GET_DIVISION,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const getTeam = async () => {
  const {data} = await apiRequest({
    url: SERVICE_CONFIG_URLS.MANAGER.GET_TEAM,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const getDate = async (params: any) => {
  console.log(params,'paramsparamsparamsparams');
  
 const {selectedDivision,selectedOpponent,selectedTeam,selectedTourney,userData}=params || {}
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.MANAGER.GET_DATE}${userData}?team=${selectedTeam}&tournament=${selectedTourney}&opponent=${selectedOpponent}&division=${selectedDivision}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const getTeamAllocation = async (params: any) => {
  const {selectedDivision,selectedOpponent,selectedTeam,selectedTourney,userData,  selectedDate}=params || {}
  console.log(params,"This is params")
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.MANAGER.GET_TEAM_ALLOCATION}${userData}?date=${selectedDate}&team=${selectedTeam}&tournament=${selectedTourney}&opponent=${selectedOpponent}&division=${selectedDivision}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast:false
  });
  return data;
};

export const updateCoachAttendanceList = async (params) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.COACH.GET_COACH_ATTENDANCE_LIST}/${params.playerId}/${params.coachId}`,
    method: API_CONFIG.PUT,
    showLoader: false,
    params: {attendance: params?.attendance},
    showToast:false
  });
}

export const getFieldingSession = async (params: any) => {
  console.log(params,"This is paramsss")
  const {selectedDivision,selectedOpponent,selectedTeam,selectedTourney,userData,  selectedDate}=params || {}
  const {data} = await apiRequest({
    // url: `${SERVICE_CONFIG_URLS.MANAGER.GET_FIELDING}1?date=4/6/2024&team=soca strikers&tournament=wycl&opponent=ssca knights&division=1`,
    url: `${SERVICE_CONFIG_URLS.MANAGER.GET_FIELDING}${userData}?date=${selectedDate}&team=${selectedTeam}&tournament=${selectedTourney}&opponent=${selectedOpponent}&division=${selectedDivision}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
    showToast:false
  });
  return data;
};
export const updateFieldingSession = async (params) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.MANAGER.UPDATE_GET_FIELDING}1/CLB-154?date=4/6/2024&team=soca strikers&tournament=wycl&opponent=ssca knights`,
    method: API_CONFIG.PUT,
    showLoader: false,
    params,
    showToast:false
  });
    return data;
}

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
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.ABOUT_US}`,
    method: API_CONFIG.GET,
    showLoader: false,
    showToast:false
  });
  return data;
};