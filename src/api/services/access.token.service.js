import HttpClient from '../../utils/http.client';
let instance = null;

class AccessTokenService extends HttpClient {
  constructor() {
    super('access-token');
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  verify(token) {
    return this.endPoint(['verify', token]).request('post');
  }
}

const AccessTokenApi = new AccessTokenService();
export default AccessTokenApi;
