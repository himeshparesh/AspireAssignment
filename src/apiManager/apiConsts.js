const BASE_URL = 'https://340d244b-7073-4333-b96f-d2e36357087a.mock.pstmn.io';

const getBaseURL = () => {
  return global.BaseURL ?? BASE_URL;
};

const api = {
  login: () => {
    return getBaseURL() + '/login';
  },

  //Home
  homeApi: () => {
    return getBaseURL() + '/products';
  },
};

const errors = statusCode => {
  switch (statusCode) {
    case 400:
      return 'Bad Request';
    case 403:
      return 'You are not authorized to invoke the operation';
    case 404:
      return 'Not Found';
    case 405:
      return 'Method Not Allowed';
    case 409:
      return 'An attempt was made to create an object that already exists';
    case 500:
      return 'Internal Server Error';
    case 0:
      return 'Could not connect to the server. Please check your internet connection and try again';
    default:
      return 'Something went wrong';
  }
};

export {api, errors, BASE_URL, getBaseURL};
