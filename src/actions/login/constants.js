import {
  LOGIN_FIND, LOGIN_FIND_BY_ID, LOGIN_REPLACE_BY_ID, LOGIN_UPDATE_BY_ID, LOGIN_DELETE_BY_ID, GET_RECORD_LOGINS
} from './actions';

export const getRecords = (userId) => ({
  type: GET_RECORD_LOGINS,
  userId
});

export const actionsFind = (filter, param = null) => ({
  type: LOGIN_FIND,
  filter,
  param
});

export const actionsFindById = (id, filter = null, param = null) => ({
  type: LOGIN_FIND_BY_ID,
  id,
  filter,
  param
});

export const actionsUseReplaceById = (data) => ({
  type: LOGIN_REPLACE_BY_ID,
  user: data
});

export const actionsUserUpdateById = (id, data) => ({
  type: LOGIN_UPDATE_BY_ID,
  id,
  data
});

export const actionsUserDeleteById = (id) => ({
  type: LOGIN_DELETE_BY_ID,
  id
});
