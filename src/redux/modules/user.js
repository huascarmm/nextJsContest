/* eslint-disable prefer-destructuring */
import { fromJS } from 'immutable';
import { USER_LOGIN } from 'src/actions/user/constants';
import {
  USER_SET, SET_USER_PROFILE, CLEAR_PROFILE, USER_ID, SET_USER_EDIT, SET_PROFILE_EDIT, LOGIN_SUCCESS, LOGIN_REQUESTING, USER_AVATAR, SET_CHANNEL_EDIT
} from 'src/actions/user/constants';
// import { isServer } from '../../ConditionallyRender';

// const token = '';
// if (!isServer) {
//   token = localStorage.getItem('token');
// }

const initialState = {
  accessToken: '',
  userLogin: {},
  userId: '',
  profile: {},
  avatar: {},
  EditUser: {},
  EditProfile: {},
  listRecordsShareds: [],
  listRecordsSignins: [],
  success: false,
  loading: false,
  channels: {
    contacts: [],
    socialNetworks: [],
    listContacts: [],
    listSocialNetworks: [],
  }
};

const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    case USER_LOGIN:
      return state.withMutations(mutableState => {
        mutableState.set('accessToken', action.token);
      });
    case USER_SET:
      return state.withMutations(mutableState => {
        mutableState.set('userLogin', action.user);
      });
    case USER_ID:
      return state.withMutations(mutableState => {
        mutableState.set('userId', action.id);
      });
    case USER_AVATAR:
      return state.withMutations(mutableState => {
        mutableState.set('avatar', action.avatar);
      });
    case SET_USER_PROFILE:
      return state.withMutations(mutableState => {
        mutableState.set('profile', action.user);
      });
    case CLEAR_PROFILE:
      return state.withMutations(mutableState => {
        mutableState.set('profile', {});
      });
    case SET_CHANNEL_EDIT:
      return state.withMutations(mutableState => {
        mutableState.set('channels', action.channels);
      });
    case SET_USER_EDIT:
      return state.withMutations(mutableState => {
        mutableState.set('EditUser', action.user);
      });
    case SET_PROFILE_EDIT:
      return state.withMutations(mutableState => {
        mutableState.set('EditProfile', action.profile);
      });
    case LOGIN_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set('success', action.status);
      });
    case LOGIN_REQUESTING:
      return state.withMutations(mutableState => {
        mutableState.set('loading', action.status);
      });
    default:
      return state;
  }
}
