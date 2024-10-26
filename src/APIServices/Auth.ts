import { API_CONFIG, CONTENT_TYPE, PAGE_SIZE } from '@Constants/api';
import { apiRequest } from '@Service/ServiceAction';
import { SERVICE_CONFIG_URLS } from '../constants/api_urls';
import { getUserType } from '../containers/startupContainer/types';
import apiService from '../services/apiService';
import versionService from '../services/versionService';

export const login = async (params: any) => {
  const { data } = await apiRequest({
    url: SERVICE_CONFIG_URLS.AUTH.LOGIN,
    method: API_CONFIG.POST,
    params,
    showToast:true,
    showSuccessToast:true
  });
  return data;
};


export const signup = async (params: any) => {
  const { data } = await apiRequest({
    url: SERVICE_CONFIG_URLS.AUTH.SIGNUP,
    method: API_CONFIG.POST,
    showToast:true,
    showSuccessToast:true,
    params
  });
  return data;
};

export const getUserRoles = async (params: any) => {
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.AUTH.ROLES}/${params?.parentID}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
  });
  return data;
};



export const getPlayerSelection = async (params: any) => {
  
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.GET_PLAYER_SELECTION}${params.parentId}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
  });
  return data;
};

export const getUser = async () => {
  const payload: getUserType = {
    version: versionService.getVersionNumber(),
  };
  const { ok, response, data } = await apiService.post(
    SERVICE_CONFIG_URLS.STUDENT.USER_DETAILS,
    payload,
  );
  if (ok) {
    return data;
  }
  throw response.message;
};

export const logout = async (params: any) => {
  const { data } = await apiRequest({
    url: SERVICE_CONFIG_URLS.STUDENT.SIGN_OUT,
    method: API_CONFIG.POST,
    params,
  });
  return data;
};

export const getPrivacyPolicy = async (params: any) => {
  const { data } = await apiRequest({
    url: SERVICE_CONFIG_URLS.AUTH.PRIVACY_POLICY,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
  });
  return data;
};

export const deleteUser = async (params: any) => {
  console.log(params?.userData,'paramsparamsparams');
  
  const { data } = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.PLAYER.DELETE_ACCOUNT}/${params?.userData}` ,
    method: API_CONFIG.DELETE,
    params,
    showToast:true,
    showSuccessToast:true
  });
  console.log(data,'urlurlurl')
  return data;
};

export const forgotPassword = async (params: any) => {
  const { data } = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.AUTH.FORGOT_PASSWORD}` ,
    method: API_CONFIG.PUT,
    showToast:true,
    showSuccessToast:true,
    params,
  });
  
  return data;
};



export const getParentIdByEmail = async (params: any) => {
  
  const {data} = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.AUTH.EMAIL}${params.email}`,
    method: API_CONFIG.GET,
    params,
    showLoader: false,
  });
  return data;
};

export const verfiyOtp = async (params: any) => {
  const { data } = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.AUTH.OTP}` ,
    method: API_CONFIG.PUT,
    showToast:true,
    showSuccessToast:true,
    params,
  });
  
  return data;
};

export const resetPassword = async (params: any) => {
  const { data } = await apiRequest({
    url: `${SERVICE_CONFIG_URLS.AUTH.RESET_PASSWORD}` ,
    method: API_CONFIG.PUT,
    showToast:true,
    showSuccessToast:true,
    params,
  });
  
  return data;
};