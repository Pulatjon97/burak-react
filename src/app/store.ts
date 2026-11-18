import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import HomePageReducer from './screens/homePage/slice';
import ProductsPageReducer from './screens/productsPage/slice';
import reduxLogger from 'redux-logger';

// STEP 8: Build the app-wide Redux store from the home-page reducer.
export const store = configureStore({
  //@ts-ignore
  // Log each dispatched action and the state change in the browser console.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxLogger),
  // State is available to selectors at state.homePage.
  reducer: {
    homePage: HomePageReducer,
    productsPage: ProductsPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
// Infer the complete Redux state type from the configured reducers.
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
