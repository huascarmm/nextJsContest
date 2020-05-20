import HttpClient from '../../utils/http.client';

let instance = null;

class UserRolService extends HttpClient {
  constructor() {
    super('user-rols');
    if (!instance) {
      instance = this;
    }
    return instance;
  }
}

const UserRolApi = new UserRolService();
export default UserRolApi;
