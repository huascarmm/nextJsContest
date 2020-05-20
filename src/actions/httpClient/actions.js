import * as httClient from './constants';

export function create(entity) {
  return {
    type: httClient.REQUEST_CREATE,
    entity
  };
}
export function createAll(entities) {
  return {
    type: httClient.REQUEST_CREATE_ALL,
    entities
  };
}
export function actionsFind(filter) {
  return {
    type: httClient.REQUEST_FIND,
    filter
  };
}
export function actionsFindById(id, filter) {
  return {
    type: httClient.REQUEST_FIND_BY_ID,
    id,
    filter
  };
}
export function actionsFindOne(filter) {
  return {
    type: httClient.REQUEST_FIND_ONE,
    filter
  };
}
export function actionsUpdateAll(data, where) {
  return {
    type: httClient.REQUEST_UPDATE_ALL,
    data,
    where
  };
}
export function actionsUpdateById(id, data) {
  return {
    type: httClient.REQUEST_UPDATE_BY_ID,
    id,
    data
  };
}
export function actionsDeleteAll(where) {
  return {
    type: httClient.REQUEST_DELETE_ALL,
    where
  };
}
export function actionsDeleteById(id) {
  return {
    type: httClient.REQUEST_DELETE_BY_ID,
    id
  };
}
