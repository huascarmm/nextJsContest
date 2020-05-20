import { fromJS } from 'immutable';
import { LOGIN_REQUESTING } from 'src/actions/user/constants';
import { LOGIN_SUCCESS, LOGIN_ERROR } from 'src/actions/user/constants';
import { SET_RECORD_LOGINS, ON_ROLES } from 'src/actions/login/actions';

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: [],
  records: [],
  roles: [],
  guideTasks: []
};
const initialImmutableState = fromJS(initialState);
export default function reducer(state = initialImmutableState, action = {}) {
  switch (action.type) {
    // Set the requesting flag and append a message to be shown
    case LOGIN_REQUESTING:
      return state.withMutations(mutableState => {
        mutableState.set('requesting', true);
        mutableState.set('successful', false);
        mutableState.set('messages', [{ body: 'Logging in...', time: new Date() }]);
        mutableState.set('errors', []);
      });
    // Successful?  Reset the login state.
    case LOGIN_SUCCESS:
      return state.withMutations(mutableState => {
        mutableState.set('requesting', false);
        mutableState.set('successful', true);
        mutableState.set('messages', []);
        mutableState.set('errors', []);
      });
    // Append the error returned from our api
    // set the success and requesting flags to false
    case LOGIN_ERROR:
      return state.withMutations(mutableState => {
        mutableState.set('requesting', false);
        mutableState.set('successful', false);
        mutableState.set('messages', []);
        mutableState.set('errors', [{
          body: action.error.toString(),
          time: new Date(),
        }]);
      });
    case SET_RECORD_LOGINS:
      return state.withMutations(mutableState => {
        mutableState.set('records', action.records);
      });
    case ON_ROLES:
      return state.withMutations(mutableState => {
        mutableState.set('roles', action.list);
      });
    case 'RESET_STATE':
      return initialImmutableState;
    default:
      return state;
  }
}
