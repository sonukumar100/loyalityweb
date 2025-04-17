import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.addTeamMember || initialState;
export const selectAdminList = createSelector([selectSlice], state => state);
export const selectAdminEdit = createSelector([selectSlice], state => state.edit);
export const selectAdminEditGift = createSelector([selectSlice], state => state.editGift);
