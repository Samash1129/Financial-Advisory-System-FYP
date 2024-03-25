import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../Slices/User/AuthSlice/authSlice';
import stockSlice from '../Slices/StockSlice/stockSlice'
import { apiSlice } from '../Slices/ApiSlice/apiSlice';
import previousPageSlice from '../Slices/PageSlice/pageSlice';
import { stockApiSlice } from '../Slices/StockSlice/stockApiSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    previousPage: previousPageSlice,
    stockSlice: stockSlice,
    [stockApiSlice.reducerPath]: stockApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

export default store
