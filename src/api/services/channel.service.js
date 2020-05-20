import HttpClient from '../../utils/http.client';
let instance = null;

class ChannelService extends HttpClient {
  constructor() {
    super('channels');
    if (!instance) {
      instance = this;
    }
    return instance;
  }
}

const ChannelApi = new ChannelService();
export default ChannelApi;
