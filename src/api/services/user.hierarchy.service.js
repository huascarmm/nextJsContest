import HttpClient from '../../utils/http.client';
let instance = null;

class UserHierarchyService extends HttpClient {
  constructor() {
    super('user-hierarchies');
    if (!instance) {
      instance = this;
    }
    return instance;
  }
}

const UserHierarchyApi = new UserHierarchyService();
export default UserHierarchyApi;
