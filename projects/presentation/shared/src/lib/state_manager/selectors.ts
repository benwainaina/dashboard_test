import { createSelector } from '@ngrx/store';
import { IAppSlice } from '../../../../../../src/app/state_manager/interfaces';

const sharedSlice = (superSlice: IAppSlice) => superSlice.shared;

export const selectNotificationData = createSelector(
  sharedSlice,
  (slice) => slice.notification
);
