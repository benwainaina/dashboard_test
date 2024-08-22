import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { APIService } from '../../../shared/src/lib/services/api.service';
import * as ActionNames from './actionNames';
import * as UserActions from './actions';
import { concatLatestFrom } from '@ngrx/operators';
import { selectCurrentPage } from './selectors';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { actionSetNotificationData } from '../../../shared/src/lib/state_manager/actions';
import { selectDataUtility } from '../../../shared/src/lib/utilities/selectData.utility';
import { IUserData } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserEffect {
  private _store: Store = inject(Store);
  private _actions: Actions = inject(Actions);
  private _apiService: APIService = inject(APIService);
  private _selectDataUtility = selectDataUtility();

  /**
   * fetch list of users effect
   */
  getUsers$ = createEffect(() =>
    this._actions.pipe(
      ofType(ActionNames.actionNameGetUsers),
      concatLatestFrom(() => this._selectDataUtility(selectCurrentPage)),
      mergeMap((_, currentPage) =>
        this._apiService.get('users', `page=${currentPage}`).pipe(
          map(({ data: rawUsersData, total_pages: pages, per_page: perPage }) =>
            UserActions.actionSetUsers({
              users: rawUsersData.map((rawUserData: any) =>
                mapUserData(rawUserData)
              ),
              pageMeta: { pages, perPage },
            })
          ),
          catchError((err) =>
            of(
              actionSetNotificationData({
                payload: {
                  type: 'error',
                  message: 'Could not fetch users at the moment',
                },
              })
            )
          )
        )
      )
    )
  );

  /**
   * get specific user details
   */
  getUserDetails$ = createEffect(() =>
    this._actions.pipe(
      ofType(UserActions.actionGetUserDetails),
      mergeMap((action) =>
        this._apiService.get(`users/${action.userId}`, '').pipe(
          map(({ data: userData }) =>
            UserActions.actionSetUserDetails({
              userData: mapUserData(userData),
            })
          ),
          catchError((err) =>
            of(
              actionSetNotificationData({
                payload: {
                  type: 'error',
                  message: 'Could not fetch details at the moment',
                },
              })
            )
          )
        )
      )
    )
  );
}

const mapUserData = (rawUserData: any): IUserData => ({
  image: rawUserData.avatar,
  email: rawUserData.email,
  firstName: rawUserData.first_name,
  lastName: rawUserData.last_name,
  id: rawUserData.id,
});
