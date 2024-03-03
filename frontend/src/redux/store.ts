import { Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';
import products from './slices/products';
import cartSlice from './slices/cartSlice';
import userSlice from './slices/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  stateReconciles: hardSet as (inboundState: CombinedState) => CombinedState,
  whitelist: ['cart', 'users'],
};
type CombinedState = typeof rootReducer extends Reducer<infer U, any> ? U : never;

const rootReducer = combineReducers({
  product: products,
  cart: cartSlice,
  user: userSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
