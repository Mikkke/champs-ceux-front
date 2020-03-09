import * as types from "./types";
import store from "../store";
const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/auth`;
export const checkToken = () => {
  return dispatch => {
    const state = store.getState();
    return fetch(initialUrl)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        dispatch({ type: types.CHECK_TOKEN, payload: json });
        console.log("state :", state);
      });
  };
};
