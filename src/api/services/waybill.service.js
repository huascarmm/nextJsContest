/* eslint-disable class-methods-use-this */
import HttpClient from '../../utils/http.client';
let instance = null;

class WaybillService extends HttpClient {
  constructor() {
    super('king-of-procedures');
    if (!instance) {
      instance = this;
    }
    return instance;
  }
}
const WaybillApi = new WaybillService();
export default WaybillApi;
