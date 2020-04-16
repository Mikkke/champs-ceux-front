import { authTypes } from "../actions/types";

const initialState = {
  currentUser: null
};

const auth2Reducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };

    case authTypes.CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null
      };

    default:
      return state;
  }
};

export default auth2Reducer;
