import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import auth2Reducer from "./auth2Reducer";
import produitsReducer from "./produitsReducer";
import cartReducer2 from "./cartReducer2";

export default combineReducers({
  cartState: cartReducer,
  auth: auth2Reducer,
  produit: produitsReducer,
  cart: cartReducer2
});
