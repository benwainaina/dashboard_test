import { createReducer, on } from '@ngrx/store';
import { IUserSlice } from './interfaces';
import * as Actions from './actions';

const initialState: IUserSlice = {
  isFetchingUserData: false,
  users: [],
  pagination: { currentPage: 1 },
  isFetchingUsers: false,
  ttlTimeOutInSeconds: 2,
  fetchedPages: {},
};

export const userReducer = createReducer(
  initialState,
  on(Actions.actionGetUsers, (state) => ({
    ...state,
    isFetchingUsers: true,
  })),
  on(Actions.actionSetUsers, (state, action) => {
    return {
      ...state,
      isFetchingUsers: false,
      users: [
        ...state.users.filter(
          (user) => user.pageNum !== state.pagination.currentPage
        ),
        ...action.users,
      ],
      pagination: {
        ...state.pagination,
        ...action.pageMeta,
      },
      ttlLastUserFetch: !action.persisted ? new Date() : state.ttlLastUserFetch,
      fetchedPages: action.pageMeta?.currentPage
        ? {
            ...state.fetchedPages,
            [action.pageMeta.currentPage.toString()]: true,
          }
        : state.fetchedPages,
    };
  }),
  on(Actions.actionGetUserDetails, (state) => ({
    ...state,
    isFetchingUserData: true,
  })),
  on(Actions.actionSetUserDetails, (state, action) => ({
    ...state,
    isFetchingUserData: false,
    activeUserData: action.userData,
  })),
  on(Actions.actionSetCurrentPage, (state, action) => {
    return {
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: action.page,
      },
    };
  })
);
