import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserData, IUserSlice, UserSliceName } from './interfaces';
import { IDynamicObject } from '../../../shared/src/lib/state_manager/interfaces';

const userSlice = createFeatureSelector<IUserSlice>(UserSliceName);

/**
 * select the status for fetching user data
 */
export const selectIsFetchingUserData = createSelector(
  userSlice,
  (slice) => slice.isFetchingUserData
);

/**
 * const page slice
 */
const selectPageSlice = createSelector(userSlice, (slice) => slice.pagination);

/**
 * page number selector
 */
export const selectCurrentPage = createSelector(
  selectPageSlice,
  (slice) => slice.currentPage || 1
);

/**
 * total pages count
 */
export const selectTotalPages = createSelector(
  selectPageSlice,
  (slice) => slice.pages
);

/**
 * select the users in the application
 */
export const selectUsersLists = createSelector(
  userSlice,
  selectCurrentPage,
  (slice, currentPage) =>
    slice.users.filter((user) => user.pageNum === currentPage)
);

/**
 * select status for fetching users list
 */
export const selectIsFetchingUsers = createSelector(
  userSlice,
  (slice) => slice.isFetchingUsers
);

/**
 * select preview user data
 */
export const selectPreviewUserData = createSelector(
  selectUsersLists,
  (userList: Array<IUserData>, props: IDynamicObject) =>
    userList.find((user) => user.id.toString() === props['userId']?.toString())
);

/**
 * select retrieved user data
 */
export const selectRetrievedUserData = createSelector(
  userSlice,
  (slice) => slice.activeUserData
);

/**
 * select whether fetch can be done, based on last ttl
 */
export const selectTTLIsExpired = createSelector(userSlice, (slice) => {
  /**
   * fetch from server if last time of fetching was N seconds ago
   */

  if (
    slice.pagination.currentPage &&
    slice.fetchedPages[slice.pagination.currentPage.toString()]
  ) {
    const timeSinceLastFetch =
      (new Date().getTime() - (slice.ttlLastUserFetch?.getTime() || 0)) / 1000;

    if (timeSinceLastFetch > slice.ttlTimeOutInSeconds) {
      return true;
    }
    return false;
  }
  return true;
});
