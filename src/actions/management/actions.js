import {
  ON_INIT, ON_DESTROY, SAVE_ROLES, CHANGE_PAGE, SAVE_HIERARCHIES, SAVE_GUIDE_TASKS, ON_GENERATE_LINK_INVITED, ON_LOAD
} from './constants';

export const actionsOnLoad = (data) => ({
  type: ON_LOAD,
  data
});

export const actionsOnInit = () => ({
  type: ON_INIT,
});

export const actionsOnDestroy = () => ({
  type: ON_DESTROY
});

export const actionsChangePage = (page) => ({
  type: CHANGE_PAGE,
  page
});

export const actionsSaveRoles = (userId, optionRoles) => ({
  type: SAVE_ROLES,
  userId,
  optionRoles,
});

export const actionsSaveHierarchies = (id, hierarchies, user) => ({
  type: SAVE_HIERARCHIES,
  id,
  hierarchies,
  user
});

export const actionsSaveGuideTasks = (form) => ({
  type: SAVE_GUIDE_TASKS,
  form
});

export const actionsGenerateLinkInvited = (request, callback) => ({
  type: ON_GENERATE_LINK_INVITED,
  request,
  callback
});
