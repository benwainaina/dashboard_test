import { createReducer, on } from '@ngrx/store';
import { IUserSlice } from './interfaces';
import * as Actions from './actions';

const initialState: IUserSlice = {
  isFetchingUserData: false,
  users: [],
  pagination: {},
  isFetchingUsers: false,
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
      users: action.users,
      pagination: {
        ...state.pagination,
        ...action.pageMeta,
      },
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
