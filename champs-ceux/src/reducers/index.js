import { combineReducers } from "redux";
import cardReducer from "./cardReducer";
import auth from "./autReducer";
import { statement } from "@babel/template";

export default combineReducers({
  cardState: cardReducer,
  userState: auth
});
