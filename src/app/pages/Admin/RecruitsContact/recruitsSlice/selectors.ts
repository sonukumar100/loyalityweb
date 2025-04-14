import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.recruitsEdit || initialState;

export const selectAdminEdit = createSelector(
  [selectSlice],
  state => state.edit,
);
