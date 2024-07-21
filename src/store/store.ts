import { api } from '@/services/api.service';
import { configureStore } from '@reduxjs/toolkit';
import { currentPageCardsReducer, detailedCardReducer } from '@/features';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    currentPageCardsReducer,
    detailedCardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
