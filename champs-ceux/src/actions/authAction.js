import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "./types";

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
export const clearCurrentUser = () => ({
  type: CLEAR_CURRENT_USER
});
