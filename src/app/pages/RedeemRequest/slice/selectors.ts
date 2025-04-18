import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.redeemEdit || initialState;
export const selectredeemEdit = createSelector(
  [selectSlice],
  state => state.redeemEdit,
);
