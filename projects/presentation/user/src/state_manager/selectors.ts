import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppSlice } from '../../../../../src/app/state_manager/interfaces';
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
 * select the users in the application
 */
export const selectUsersLists = createSelector(
  userSlice,
  (slice) => slice.users
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
 * select preview user data
 */
export const selectPreviewUserData = createSelector(
  selectUsersLists,
  (userList: Array<IUserData>, props: IDynamicObject) =>
    userList.find((user) => user.id.toString() === props['userId']?.toString())
);
