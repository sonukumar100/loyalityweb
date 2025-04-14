import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.global || initialState;

export const selectGlobal = createSelector([selectSlice], state => state);
export const selectUser = createSelector([selectSlice], state => state.user);
export const selectTwilio = createSelector(
  [selectSlice],
  state => state.twilio,
);
export const selectLoading = createSelector(
  [selectSlice],
  state => state.loading,
);
export const selectError = createSelector([selectSlice], state => state.error);
export const selectCalling = createSelector(
  [selectSlice],
  state => state.calling,
);
export const selectChat = createSelector(
  [selectSlice],
  state => state.twilioChat,
);
export const selectNewNotifications = createSelector([selectSlice], state => state.newNotifications)
