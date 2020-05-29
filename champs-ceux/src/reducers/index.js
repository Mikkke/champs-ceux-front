import { combineReducers } from "redux";
/* import cardReducer from "./cardReducer"; */
import authReducer from "./autReducer";
import cartReducer from "./cartReducer";
import auth2Reducer from "./auth2Reducer";
import produitsReducer from "./produitsReducer";
import cartReducer2 from "./cartReducer2";

export default combineReducers({
  /*   cardState: cardReducer, */
  userState: authReducer,
  cartState: cartReducer,
  auth: auth2Reducer,
  produit: produitsReducer,
  cart: cartReducer2
});
