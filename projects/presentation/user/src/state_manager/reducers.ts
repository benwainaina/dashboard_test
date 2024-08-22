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
  on(Actions.actionSetUsers, (state, action) => ({
    ...state,
    isFetchingUsers: false,
    users: action.users,
    page: action.pageMeta,
  })),
  on(Actions.actionGetUserDetails, (state) => ({
    ...state,
    isFetchingUserData: true,
  })),
  on(Actions.actionSetUserDetails, (state, action) => ({
    ...state,
    isFetchingUserData: false,
    activeUserData: action.userData,
  }))
);
