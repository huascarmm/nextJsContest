/* eslint-disable class-methods-use-this */
import HttpClient from '../../utils/http.client';
let instance = null;

class LoginService extends HttpClient {
  constructor() {
    super('logins');
    if (!instance) {
      instance = this;
    }
    return instance;
  }
}

const LoginApi = new LoginService();
export default LoginApi;
