import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer, formsReducer } from './features';

export const store = configureStore({
  reducer: {
    countriesReducer,
    formsReducer,
  },
});
