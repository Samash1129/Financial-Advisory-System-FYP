import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import authSlice from '../Slices/User/AuthSlice/authSlice';
import stockSlice from '../Slices/StockSlice/stockSlice';
import stockSearchSlice from '../Slices/StockSlice/stockSearchSlice';
import { apiSlice } from '../Slices/ApiSlice/apiSlice';
import previousPageSlice from '../Slices/PageSlice/pageSlice';
import { stockApiSlice } from '../Slices/StockSlice/stockApiSlice';
import pageSlice from '../Slices/PageSlice/pageSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  stock: stockApiSlice.reducer,
  api: apiSlice.reducer,
  previousPage: previousPageSlice,
  stockSlice: stockSlice,
  stockSearch: stockSearchSlice,
  page: pageSlice
});

const persistConfig = {
  key: 'root', // Key for the persistor to use in storage
  storage, // Specify the storage engine to use, defaults to localStorage
  whitelist: ['auth', 'stockSlice'], // Array of reducers to persist, in this case, only 'auth'
  // You can also blacklist certain reducers if needed: blacklist: ['someReducer']
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer as the root reducer
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

// Create a persistor object
export const persistor = persistStore(store);

export default store;
