import * as types from "./types";
import axios from "axios";
import store from "../store";
const apiBaseURL = process.env.REACT_APP_BASE_API;
const initialUrl = `${apiBaseURL}/api/auth`;

export const checkToken = () => async dispatch => {
  const state = store.getState();
  console.log("before state", state);
  const res = await axios.get(initialUrl);
  console.log("res", res);
  dispatch({
    type: types.CHECK_TOKEN,
    payload: res.data.uid
  });
  console.log("after state", state);
};
