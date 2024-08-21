import { createAction, props } from '@ngrx/store';
import * as ActionNames from './actionNames';
import { INotificationData } from './interfaces';

export const actionSetNotificationData = createAction(
  ActionNames.actionNameSetNotificationData,
  props<{ payload: INotificationData }>()
);
