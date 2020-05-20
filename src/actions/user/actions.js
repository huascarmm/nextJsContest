import {
  AUTHENTICATE,
  LOGIN_REQUEST,
  USER_LOGIN,
  LOGOUT,
  USER_REQUEST,
  ACTION_CLEAR_PROFILE,

  USER_UPDATE_BY_ID,
  USER_REPLACE_BY_ID,
  USER_DELETE_BY_ID,
  GET_USER_SETTINGS,
  USER_UPDATE_ALL,
  PROFILE_UPDATE_ALL,
  GENERAL_UPDATE,
  CHANNEL_USER_CREATE,
  UPDATE_AVATAR,
  GET_USER_PROFILE
} from './constants';

export const loginRequest = function loginRequest(user) {
  return {
    type: LOGIN_REQUEST,
    user
  };
};

export function setClientToken(token) {
  return {
    type: USER_LOGIN,
    token
  };
}

export function signUp(user, params) {
  return {
    type: USER_REQUEST,
    user,
    params
  };
}

export const isAuthenticate = () => ({ type: AUTHENTICATE });

export const logoutEvent = () => ({ type: LOGOUT });

export const actionsGetUserProfile = (username) => ({
  type: GET_USER_PROFILE,
  username
});

export const actionsClearProfile = () => ({
  type: ACTION_CLEAR_PROFILE
});

export function getUserSettings(id) {
  return {
    type: GET_USER_SETTINGS,
    id
  };
}

export function actionsUserUpdateAll(data, filter) {
  return {
    type: USER_UPDATE_ALL,
    data,
    filter
  };
}

export function actionsProfileUpdateAll(data, filter) {
  return {
    type: PROFILE_UPDATE_ALL,
    data,
    filter
  };
}

export function actionsGeneralUpdate(user, profile) {
  return {
    type: GENERAL_UPDATE,
    user,
    profile
  };
}

export function actionsChannelsCreate(userId, data) {
  return {
    type: CHANNEL_USER_CREATE,
    userId,
    data
  };
}

export const actionsUseReplaceById = (data) => ({
  type: USER_REPLACE_BY_ID,
  user: data
});

export const actionsUserUpdateById = (id, data) => ({
  type: USER_UPDATE_BY_ID,
  id,
  data
});

export const actionsUserDeleteById = (id) => ({
  type: USER_DELETE_BY_ID,
  id
});

export const actionsUpdateAvatar = (user, file) => ({
  type: UPDATE_AVATAR,
  userLogin: user,
  file
});
