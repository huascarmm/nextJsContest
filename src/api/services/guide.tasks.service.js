import HttpClient from '../../utils/http.client';
let instance = null;


class GuideTasksService extends HttpClient {
  constructor() {
    super('guide-tasks');
    if (!instance) {
      instance = this;
    }
    return instance;
  }
}

const GuideTasksApi = new GuideTasksService();
export default GuideTasksApi;
