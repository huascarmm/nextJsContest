import HttpClient from '../../utils/http.client';
let instance = null;

class MunicipalDepartmentService extends HttpClient {
  constructor() {
    super('municipal-departments');
    if (!instance) {
      instance = this;
    }
    return instance;
  }
}

const MunicipalDepartmentApi = new MunicipalDepartmentService();
export default MunicipalDepartmentApi;
