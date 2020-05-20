import { fromJS } from 'immutable';
import {
  LIST_USER,
  LIST_HIERARCHY,
  LIST_MUNICIPAL_DEPARTMENT,
  CHANGE_PAGE,
  CHANGE_TOKEN,
  ROLE_REQUESTING,
  ON_LOAD,
  ON_FINISH
} from '../../actions/management/constants';

const initialState = {
  listSidebar: [{
    name: 'Crear invitación',
    key: 'InvitationLink',
    icon: 'inbox'
  }, {
    name: 'Asignar Cargos',
    key: 'AssignHierarchies',
    icon: 'star'
  }, {
    name: 'Asignar Roles',
    key: 'AssignRoles',
    icon: 'send'
  }, {
    name: 'Creación y edición de Cargos',
    key: 'GuideTasksAdmin',
    icon: 'report'
  }],
  currentPage: 'InvitationLink',
  listUsers: {},
  listHierarchies: {},
  listMunicipalDepartment: {},
  tokenGenerated: '',
  loading: false,
  finish: false,
  initValues: {}
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case CHANGE_TOKEN:
      return state.withMutations(mutableState => {
        mutableState.set('tokenGenerated', action.token);
      });
    case CHANGE_PAGE:
      return state.withMutations(mutableState => {
        mutableState.set('loading', false);
        mutableState.set('currentPage', action.page);
      });
    case LIST_USER:
      return state.withMutations(mutableState => {
        mutableState.set('listUsers', action.users);
      });
    case LIST_HIERARCHY:
      return state.withMutations(mutableState => {
        mutableState.set('listHierarchies', action.hierarchies);
      });
    case LIST_MUNICIPAL_DEPARTMENT:
      return state.withMutations(mutableState => {
        mutableState.set('listMunicipalDepartment', action.municipalDepartments);
      });
    case ROLE_REQUESTING:
      return state.withMutations(mutableState => {
        mutableState.set('loading', action.status);
      });
    case ON_LOAD:
      return state.withMutations(mutableState => {
        mutableState.set('initValues', action.data);
      });
    case ON_FINISH:
      return state.withMutations(mutableState => {
        mutableState.set('finish', action.finish);
      });
    default:
      return state;
  }
}
