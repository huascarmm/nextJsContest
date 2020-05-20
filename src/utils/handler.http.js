/* eslint-disable no-param-reassign */
/* eslint-disable object-shorthand */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-var */
import settle from 'axios/lib/core/settle';

export function transformResponse(data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (e) {
      /* Ignore */
    }
  }
  //console.log(data);
  return data;
}

export function adapterHttp(config) {
  // At this point:
  //  - config has been merged with defaults
  //  - request transformers have already run
  //  - request interceptors have already run

  // Make the request using config provided
  // Upon response settle the Promise

  return new Promise(function (resolve, reject) {
    var response = {
      data: responseData,
      status: request.status,
      statusText: request.statusText,
      headers: responseHeaders,
      config: config,
      request: request
    };

    settle(resolve, reject, response);

    // From here:
    //  - response transformers will run
    //  - response interceptors will run
  });
}

export function requestHandler(request) {
  // Modify request here
  // Example
  // request.headers['X-CodePen'] = 'https://codepen.io/teroauralinna/full/vPvKWe'
  return request;
}

export const errorHandler = error => {
  // Handle errors
  const err = new Error();
  err.message = error.response.data.error.message;
  err.name = error.response.data.error.name;
  err.status = error.response.status;
  err.error = error.message;
  err.statusText = error.response.statusText;
  err.config = error.config;
  err.response = error.response;
  err.request = error.request;
  //console.error(err);
  return Promise.reject(err);
};

export function successHandler(response) {
  // Handle responses
  return response;
}
