import { ADD_PRODUCT_CARD } from "./types";

export const addCard = () => {
  return dispatch => {
    console.log("Adding to basket");
    dispatch({
      type: ADD_PRODUCT_CARD
    });
  };
};
