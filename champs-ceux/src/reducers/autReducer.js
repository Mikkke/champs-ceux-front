import * as types from "../constants/index";

const initialState = {
  isAuth: false,
  user: {},
  isLoading: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.CHECK_TOKEN:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
