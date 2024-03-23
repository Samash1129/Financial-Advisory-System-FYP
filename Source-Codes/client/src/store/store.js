import {configureStore} from '@reduxjs/toolkit'
import authSlice from '../Slices/AuthSlice/authSlice';
import { apiSlice } from '../Slices/ApiSlice/apiSlice';
import previousPageSlice from '../Slices/PageSlice/pageSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    previousPage: previousPageSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

export default store