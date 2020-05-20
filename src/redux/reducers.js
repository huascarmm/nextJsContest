import { reducer as form } from 'redux-form/immutable';
import { routerReducer } from 'connected-next-router';
import { combineReducers } from 'redux-immutable';

import login from "./modules/login";
import user from "./modules/user";
import uiReducer from "./modules/ui";
import initval from "./modules/initForm";
import municipality from "./modules/municipality";
import posts from "./modules/posts";
import waybill from "./modules/waybill";
import management from "./modules/management";
import hierarchy from "./modules/hierarchy";

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    login,
    user,
    ui: uiReducer,
    initval,
    municipality,
    hierarchy,
    waybill,
    posts,
    management,
    router: routerReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
