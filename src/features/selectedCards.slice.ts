import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardType } from '../types';

type SliceState = {
  cards: CardType[];
};

const initialState: SliceState = {
  cards: [],
};

export const selectedCardsSlice = createSlice({
  name: 'selected cards',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<CardType>) => {
      const card = state.cards.find((card) => card.id === action.payload.id);
      if (card) {
        state.cards = state.cards.filter(
          (card) => card.id !== action.payload.id
        );
      } else {
        state.cards.push(action.payload);
      }
    },
    unselectAll: (state) => {
      state.cards = [];
    },
  },
});

export const selectedCardsActions = selectedCardsSlice.actions;
export const selectedCardsReducer = selectedCardsSlice.reducer;

export const selectSelectedById =
  (cardId: string) => (state: { selectedCardsReducer: SliceState }) =>
    !!state.selectedCardsReducer.cards.find((card) => card.id === cardId);

export const selectSelectedCards = (state: {
  selectedCardsReducer: SliceState;
}) => state.selectedCardsReducer.cards;
