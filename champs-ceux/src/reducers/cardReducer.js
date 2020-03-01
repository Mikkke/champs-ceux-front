import { ADD_PRODUCT_CARD, GET_NUMBERS_IN_CARD } from "../actions/types";

const inistialState = {
  cardNumbers: 0
};

export default (state = inistialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_CARD:
      return {
        cardNumbers: state.cardNumbers + 1
      };
    case GET_NUMBERS_IN_CARD:
      return {
        ...state
      };
    default:
      return state;
  }
};
