import * as types from "../constants/index";

const initialState = {
  isAuth: false,
  user: {},
  isLoading: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.GET_LOGIN_REQUEST:
      return {
        ...state
      };
    default:
      return state;
  }
}
