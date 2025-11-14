import { configureStore } from '@reduxjs/toolkit';
import { productsAPI } from '../features/products/productsAPI'; // RTK Query API
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    [productsAPI.reducerPath]: productsAPI.reducer, // Add the API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsAPI.middleware), // Add the API middleware
});
