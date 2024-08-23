import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISharedSlice, SharedSliceName } from './interfaces';

const sharedSlice = createFeatureSelector<ISharedSlice>(SharedSliceName);

export const selectNotificationData = createSelector(
  sharedSlice,
  (slice) => slice.notification
);
