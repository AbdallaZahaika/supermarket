import { combineReducers } from "redux";
import itemsReducer from "./items/itemsReducer";
import cartReducer from "./cart/cartReducer";
import userReducer from "./user/userReducer";
const RootReducer = combineReducers({
  items: itemsReducer,
  cart: cartReducer,
  user: userReducer,
});

export default RootReducer;
