import Axios from 'axios';
// import { urlBase } from "../api/apiRest/primary";
import { successHandler, errorHandler, requestHandler } from './handler.http';
//import Storage from './storage';

const urlBase = process.env.API_REST;

const instanceAxios = Axios.create({
  baseURL: `${urlBase}/`,
  // adapter: adapterHttp,
  // transformResponse: [transformResponse],
  // validateStatus: (status) => {
  //   return true; // default
  // }
});
instanceAxios.interceptors.request.use((request) => requestHandler(request));

instanceAxios.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default class HttpClient {
  constructor(model) {
    this.model = model;
    this.backendApi = urlBase + '/';
    this.point = '';
  }

  /**
   * @param url strign | Array
   */
  endPoint(url) {
    this.point += '/';
    if (typeof url === 'object') {
      this.point += url.join('/');
    } else {
      this.point += url;
    }
    return this;
  }

  request(method, body, filter, param, headers) {
    const urlRequest = this.model + this.point;
    let auth = {};
    // if (Storage.getItem('token')) {
    //   const token = Storage.getItem('token');
    //   auth = {
    //     Authorization: `Bearer ${token}`,
    //   };
    // }
    let params = {};
    if (typeof filter === 'object') {
      params = Object.assign(params, { filter });
    }
    if (typeof param === 'object') {
      params = Object.assign(params, { ...param });
    }
    this.point = '';
    return new Promise((success, fail) => {
      instanceAxios({
        method,
        url: urlRequest,
        headers: {
          ...auth,
          ...headers,
        },
        params,
        data: body,
      })
        .then((result) => success(result.data))
        .catch((error) => fail(error));
    });
  }

  create(data, params, header = {}) {
    return this.request('post', data, {}, params, header);
  }

  count(filter = {}) {
    return this.endPoint('count').request('get', null, filter);
  }

  find(filter = {}, param = {}) {
    return this.request('get', null, filter, param);
  }

  updateAll(data, filter = {}) {
    return this.request('patch', data, filter);
  }

  findById(id, filter = {}, param = {}) {
    return this.endPoint(id).request('get', null, filter, param);
  }

  updateById(id, data) {
    return this.endPoint(id).request('patch', data);
  }

  replaceById(id, data) {
    return this.endPoint(id).request('put', data);
  }

  deleteById(id) {
    return this.endPoint(id).request('delete');
  }
}
