import { GET_NUMBERS_IN_CARD } from "./types";

export const getNumbers = () => {
  return dispatch => {
    console.log("getting to basket");
    dispatch({
      type: GET_NUMBERS_IN_CARD
    });
  };
};
