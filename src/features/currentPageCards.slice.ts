import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardType } from '@/types';

type SliceState = {
  cards: CardType[];
};

const initialState: SliceState = {
  cards: [],
};

export const currentPageCardsSlice = createSlice({
  name: 'current page cards',
  initialState,
  reducers: {
    setCurrentPageCards: (state, action: PayloadAction<CardType[]>) => {
      state.cards = action.payload;
    },
  },
});

export const currentPageCardsActions = currentPageCardsSlice.actions;
export const currentPageCardsReducer = currentPageCardsSlice.reducer;
