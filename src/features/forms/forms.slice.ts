import { createSlice, PayloadAction } from '@reduxjs/toolkit/react';
import { UUID } from 'crypto';
import { FormType } from '~/models';

export type ReduxFormType = Omit<FormType, 'image'> & {
  image: string;
  id: UUID;
  highlighted: boolean;
};

export type FormsState = ReduxFormType[];

const initialState: FormsState = [];

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<Omit<ReduxFormType, 'id'>>) {
      state.unshift({
        ...action.payload,
        id: crypto.randomUUID(),
        highlighted: false,
      });
    },
    highlight(state, action: PayloadAction<{ id: UUID }>) {
      const form = state.find((form) => form.id === action.payload.id);
      if (form) {
        form.highlighted = true;
      }
    },
  },
});

export const formsReducer = formsSlice.reducer;
export const formsActions = formsSlice.actions;

export const selectForms = (state: { formsReducer: FormsState }) =>
  state.formsReducer;
