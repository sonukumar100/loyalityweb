import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state?.offerApi || initialState;

export const selectLogin = createSelector([selectSlice], state => state);
