import axios from 'axios';

const defaultHeader = {'Content-Type': 'application/json'};

export const postDataApi = (url, body, headers, isRequestTypePost) => {
  body = {...body};

  headers = {...headers, ...defaultHeader};

  if (isRequestTypePost == 0) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, body, {headers: headers, timeout: 60 * 1000})
        .then(response => {
          if (response !== null) {
            resolve(response.data);
          } else {
            reject(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  } else if (isRequestTypePost == 1) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {headers: headers, timeout: 60 * 1000})
        .then(response => {
          if (response !== null) {
            resolve(response);
          } else {
            reject(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
