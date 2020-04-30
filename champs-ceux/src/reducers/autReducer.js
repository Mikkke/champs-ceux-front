import * as types from "../constants/index";

const initialState = {
  isAuth: false,
  user: {},
  isLoading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHECK_TOKEN:
      return {
        ...state,
        isAuth: action.payload ? true : false,
        user: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
