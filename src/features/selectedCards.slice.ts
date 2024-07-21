import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SliceState = {
  selectedIds: Record<string, boolean>;
};

const initialState: SliceState = {
  selectedIds: {},
};

export const selectedCardsSlice = createSlice({
  name: 'selected cards',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<string>) => {
      const cardId = action.payload;
      const selected = state.selectedIds[cardId];
      state.selectedIds[cardId] = !selected;
    },
  },
});

export const selectedCardsActions = selectedCardsSlice.actions;
export const selectedCardsReducer = selectedCardsSlice.reducer;

export const selectSelectedById =
  (cardId: string) => (state: { selectedCardsReducer: SliceState }) =>
    !!state.selectedCardsReducer.selectedIds[cardId];
