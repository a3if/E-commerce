import { combineReducers } from "redux";
import productsSlice from "../slices/apiSlice";
import cartSlice from "../slices/cartSlice";
import modalSlice from "../slices/modalSlice";
const rootReducer = combineReducers({
  products: productsSlice,
  cart:cartSlice,
  modal:modalSlice,
  
});

export default rootReducer;
