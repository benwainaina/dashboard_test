import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppSliceName, IApp } from './interfaces';

/**
 * the root state slice of the application
 */
const appSelector = createFeatureSelector<IApp>(AppSliceName);

/**
 * select the status for fetching user data
 */
export const selectIsFetchingUserData = createSelector(
  appSelector,
  (slice) => slice.isFetchingUserData
);

/**
 * select the users in the application
 */
export const selectUsers = createSelector(appSelector, (slice) => slice.users);

/**
 * select notification data
 */
export const selectNotificationData = createSelector(
  appSelector,
  (slice) => slice.notification
);

/**
 * const page slice
 */
const selectPageSlice = createSelector(appSelector, (slice) => slice.page);

/**
 * page number selector
 */
export const selectCurrentPage = createSelector(
  selectPageSlice,
  (slice) => slice.currentPage
);
