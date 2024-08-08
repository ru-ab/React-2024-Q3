import { configureStore } from '@reduxjs/toolkit';
import { selectedCardsReducer } from './features';

export const makeStore = () =>
  configureStore({
    reducer: {
      selectedCardsReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
