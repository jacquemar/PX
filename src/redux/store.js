import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import ticketReducer from "./slices/ticketSlice";
import databaseReducer from "./slices/databaseSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
    ticket: ticketReducer,
    database: databaseReducer,
  },
  devTools:
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
});

export default store;
