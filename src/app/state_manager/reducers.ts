import { Action, createReducer, on } from '@ngrx/store';
import { InitialAppState } from './store';
import * as AppActions from './actions';
import { IApp } from './interfaces';

export const appReducer = createReducer(
  InitialAppState,
  on(AppActions.actionGetUsers, (state) => ({
    ...state,
    isFetchingUsers: true,
  })),
  on(AppActions.actionSetUsers, (state, action) => ({
    ...state,
    isFetchingUsers: false,
    users: action.users,
    page: action.pageMeta,
  })),
  on(AppActions.actionGetUserDetails, (state) => ({
    ...state,
    isFetchingUserData: true,
  })),
  on(AppActions.actionSetUserDetails, (state, action) => ({
    ...state,
    isFetchingUserData: false,
    users: [
      ...state.users.map((user) => {
        if (user.id === action.userData.id) {
          user = action.userData;
        }
        return user;
      }),
    ],
  }))
);
