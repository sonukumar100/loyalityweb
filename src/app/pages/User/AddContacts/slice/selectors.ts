import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.leadEdit || initialState;

export const selectAdminEdit = createSelector([selectSlice], state => state.edit);

