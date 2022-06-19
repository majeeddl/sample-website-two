import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./account.slice";
import productReducer from "./product.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
  },
});

export default store;
