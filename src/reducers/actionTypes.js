//Internet check
export const INTERNET_STATE_CHANGED = 'INTERNET_STATE_CHANGED';
export const SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN';

export const TYPE = {
  DEFAULT: {
    REQUEST: 'REQUEST',
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
  },
};

export const returnToDispatch = (dispatch, type, payload) => {
  dispatch({
    type: type,
    payload: payload,
  });
};
