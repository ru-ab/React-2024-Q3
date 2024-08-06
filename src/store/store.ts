import {
  currentPageCardsReducer,
  detailedCardReducer,
  selectedCardsReducer,
} from '@/features';
import { api } from '@/services/api.service';
import { configureStore, Tuple } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';

const reducer = {
  [api.reducerPath]: api.reducer,
  currentPageCardsReducer,
  detailedCardReducer,
  selectedCardsReducer,
};

export const createStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

export const makeStore: MakeStore<ReturnType<typeof createStore>> = ({
  reduxWrapperMiddleware,
}) =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      new Tuple(
        ...getDefaultMiddleware(),
        api.middleware,
        reduxWrapperMiddleware
      ),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore);
