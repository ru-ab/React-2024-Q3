import { configureStore } from '@reduxjs/toolkit';
import { countriesReducer } from './features/countries/countries.slice';

export const store = configureStore({
  reducer: {
    countriesReducer,
  },
});
