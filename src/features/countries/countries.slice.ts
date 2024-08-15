import { createSlice } from '@reduxjs/toolkit/react';
import { countries } from './countries';

export type CountriesState = string[];

const initialState: CountriesState = countries;

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const countriesReducer = countriesSlice.reducer;

export const selectCountries = (state: { countriesReducer: CountriesState }) =>
  state.countriesReducer;
