import {TYPE, returnToDispatch} from './actionTypes';
import {A} from '../apiManager';
import {U} from '../utility';

const initialState = {
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.DEFAULT.REQUEST:
      return {
        ...state,
      };
    case TYPE.DEFAULT.SUCCESS:
      return {
        ...state,
      };
    case TYPE.DEFAULT.FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getResponseFor = ({
  isRequestTypePost = 0,
  url = '',
  params = {},
  header = {},
  onSuccess = () => {},
  onFailure = () => {},
  showAlert = true,
  includeToken = true,
}) => {
  if (includeToken) {
    params.api_token = U.utility.getAccessToken();
  }

  return dispatch => {
    returnToDispatch(dispatch, TYPE.DEFAULT.REQUEST, params);

    A.commonApi
      .postDataApi(url, params, header, isRequestTypePost)
      .then(response => {
        returnToDispatch(dispatch, TYPE.DEFAULT.SUCCESS, response.data);

        if (onSuccess) {
          setTimeout(() => {
            onSuccess(response);
          }, 500);
        }
      })
      .catch(error => {
        returnToDispatch(dispatch, TYPE.DEFAULT.FAILURE, error);
        onFailure(error);
        U.utility.handleError(error, showAlert);
      });
  };
};
