import * as types from "./types";

export const getUserAction = () => {
  return dispatch => {
    return fetch("/api/check/token")
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch({ type: types.GET_LOGIN_REQUEST, payload: json });
      });
  };
};
