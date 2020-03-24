import { combineReducers } from "redux";
import cardReducer from "./cardReducer";
import auth from "./autReducer";

export default combineReducers({
  cardState: cardReducer,
  userState: auth
});
