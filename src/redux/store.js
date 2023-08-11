import { configureStore } from '@reduxjs/toolkit';
import { persistStore, 
         persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice'; 
import ticketReducer from './slices/ticketSlice'; 

const persistConfig = {
  key: 'root',
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedProductReducer = persistReducer(persistConfig, productReducer);
const persistedTicketReducer = persistReducer(persistConfig, ticketReducer);

const store = configureStore({
  reducer: { 
    cart: persistedCartReducer,
    product: persistedProductReducer,
    ticket: persistedTicketReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store); // Créez le persistor à partir du store

export { store, persistor }; // Exportez à la fois le store et le persistor
