import {
  currentPageCardsReducer,
  detailedCardReducer,
  selectedCardsReducer,
} from '@/features';
import { api } from '@/services/api.service';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      currentPageCardsReducer,
      detailedCardReducer,
      selectedCardsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
