import HttpClient from '../../utils/http.client';
let instance = null;

class UserChannelService extends HttpClient {
  constructor() {
    super('user-channels');
    if (!instance) {
      instance = this;
    }
    return instance;
  }
}
const UserChannelApi = new UserChannelService();
export default UserChannelApi;
