import { createAction, props } from '@ngrx/store';
import * as ActionNames from './actionNames';
import { INotificationData, IPageMeta, IUserData } from './interfaces';

export const actionGetUsers = createAction(
  ActionNames.actionNameGetUsers,
  props<{ pageNumber: number }>()
);

export const actionSetUsers = createAction(
  ActionNames.actionNameStoreUsers,
  props<{ users: Array<IUserData>; pageMeta: IPageMeta }>()
);

export const actionGetUserDetails = createAction(
  ActionNames.actionNameGetUserDetails,
  props<{ userId: string }>()
);

export const actionSetUserDetails = createAction(
  ActionNames.actionNameStoreUserDetails,
  props<{ userData: IUserData }>()
);

export const actionSetNotificationData = createAction(
  ActionNames.actionNameSetNotificationData,
  props<{ payload: INotificationData }>()
);
