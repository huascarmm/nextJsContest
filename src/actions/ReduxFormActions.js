import * as types from './actionConstants';

export const initAction = (data) => ({ type: types.INIT, data });
export const clearAction = { type: types.CLEAR };

export const observable = (key, data) => ({
  type: types.SUBSCRIBE,
  key,
  subscribe: data
});
