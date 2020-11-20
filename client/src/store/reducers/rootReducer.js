import { combineReducers } from "redux";
import productsReducer from "./productsReducer";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";
import orderReducer from "./orderReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  user: userReducer,
  order: orderReducer,
  modal: modalReducer,
});

export default rootReducer;
