import { createSlice, PayloadAction } from '@reduxjs/toolkit/react';
import { FormType } from '~/models';

type ReduxFormType = Omit<FormType, 'image'> & { image: string };

export type FormsState = ReduxFormType[];

const initialState: FormsState = [];

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm(state, action: PayloadAction<ReduxFormType>) {
      state.push(action.payload);
    },
  },
});

export const formsReducer = formsSlice.reducer;
export const formsActions = formsSlice.actions;

export const selectForms = (state: { formsReducer: FormsState }) =>
  state.formsReducer;
