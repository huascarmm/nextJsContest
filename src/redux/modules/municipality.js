import { fromJS } from 'immutable';
import {
  MUNICIPALITY_DATA,
  SET_FEATURES,
  SET_DEPARTMENTS,
  SET_LAST_LAWS,
  SET_LAST_NEWS,
} from '../../actions/actionConstants';

const initialState = {
  municipalityId: '',
  municipalityName: '',
  logotipo: '',
  features: { data: [] },
  channels: { data: [] },
  departments: { data: [] },
  lastLaws: {},
  lastNews: {},
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case MUNICIPALITY_DATA:
      return state.withMutations((mutableState) => {
        mutableState.set('municipalityId', action.value.id);
        mutableState.set('municipalityName', action.value.name);
        mutableState.set('logotipo', action.value.logotipo);
      });
    case SET_FEATURES:
      return state.withMutations((mutableState) => {
        mutableState.set('features', action.features);
        mutableState.set('channels', action.channels);
      });
    case SET_DEPARTMENTS:
      return state.withMutations((mutableState) => {
        mutableState.set('departments', action.departments);
      });
    case SET_LAST_LAWS:
      return state.withMutations((mutableState) => {
        mutableState.set('lastLaws', action.lastLaws);
      });
    case SET_LAST_NEWS:
      return state.withMutations((mutableState) => {
        mutableState.set('lastNews', action.lastNews);
      });
    default:
      return state;
  }
}
