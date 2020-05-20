/* eslint-disable class-methods-use-this */
import HttpClient from '../../utils/http.client';
let instance = null;
class RoleService extends HttpClient {
  constructor() {
    super('roles');
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  setAssignRoles(userId, roles) {
    return this.endPoint('assign-roles').request('post', { userId, roles });
  }
}
const RoleApi = new RoleService();
export default RoleApi;
