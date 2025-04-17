import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';




const selectSlice = (state: RootState) => state.couponEdit || initialState;
export const selectCouponEdit = createSelector(
  [selectSlice],
  state => state.edit,
);

