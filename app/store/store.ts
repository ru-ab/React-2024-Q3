import { configureStore } from '@reduxjs/toolkit';
import { selectedCardsReducer } from '~/features';

export const store = configureStore({
  reducer: {
    selectedCardsReducer,
  },
});
