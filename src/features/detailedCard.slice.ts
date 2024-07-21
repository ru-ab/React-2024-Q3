import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardType } from '@/types';

type SliceState = {
  detailedCard: CardType | null;
};

const initialState: SliceState = {
  detailedCard: null,
};

export const detailedCardSlice = createSlice({
  name: 'detailed card',
  initialState,
  reducers: {
    setDetailedCard: (state, action: PayloadAction<CardType | null>) => {
      state.detailedCard = action.payload;
    },
  },
});

export const detailedCardActions = detailedCardSlice.actions;
export const detailedCardReducer = detailedCardSlice.reducer;
