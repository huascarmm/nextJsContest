import Axios from 'axios';
const urlBase = process.env.API_REST;

function apiGet(apiUrl, where = {}, fields = [], include = [], headers = {}) {
  return new Promise((succes, fail) => {
    Axios.get(urlBase + apiUrl, {
      headers,
      params: {
        filter: {
          order: 'lastUpdated DESC',
          where: Object.assign(
            {
              status: true
            },
            where
          ),
          fields,
          include
        }
      }
    })
      .then(result => {
        succes(result.data);
      })
      .catch(error => fail(error));
  });
}

function apiGet2(apiUrl, where = {}, include = []) {
  return new Promise((succes, fail) => {
    Axios.get(urlBase + apiUrl, {
      params: {
        filter: {
          where,
          include
        }
      }
    })
      .then(result => {
        succes(result.data);
      })
      .catch(error => fail(error));
  });
}

function apiPost(apiUrl, data, config = {}) {
  return new Promise((succes, fail) => {
    Axios.post(urlBase + apiUrl, data, config)
      .then(result => succes(result.data))
      .catch(error => fail(error));
  });
}

export {
  apiGet, apiPost, apiGet2, urlBase
};
