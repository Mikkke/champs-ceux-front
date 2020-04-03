import { combineReducers } from "redux";
import cardReducer from "./cardReducer";
import auth from "./autReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  cardState: cardReducer,
  userState: auth,
  cartState: cartReducer
});
