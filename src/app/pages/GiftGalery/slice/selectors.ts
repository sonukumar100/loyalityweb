import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state?.userAPi || initialState;

export const selectLogin = createSelector([selectSlice], state => state);
