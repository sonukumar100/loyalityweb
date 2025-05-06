import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state?.chatApi || initialState;

export const selectLogin = createSelector([selectSlice], state => state);
