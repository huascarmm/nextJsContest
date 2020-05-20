import HttpClient from '../../utils/http.client';
let instance = null;


class HierarchyService extends HttpClient {
  constructor() {
    super('hierarchies');
    if (!instance) {
      instance = this;
    }
    return instance;
  }
}

const HierarchyApi = new HierarchyService();
export default HierarchyApi;
