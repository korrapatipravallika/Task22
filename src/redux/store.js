import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./getproducts";
import authReducer from "./authorizationhandler";
import popupReducer from "./Popup";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
     popup: popupReducer,
  },
});
