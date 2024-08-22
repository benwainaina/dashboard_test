import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { APIService } from '../../../shared/src/lib/services/api.service';
import * as ActionNames from './actionNames';
import * as UserActions from './actions';
import { concatLatestFrom } from '@ngrx/operators';
import {
  selectCurrentPage,
  selectTTLIsExpired,
  selectUsersLists,
} from './selectors';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { actionSetNotificationData } from '../../../shared/src/lib/state_manager/actions';
import { selectDataUtility } from '../../../shared/src/lib/utilities/selectData.utility';
import { IUserData } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserEffect {
  private _actions: Actions = inject(Actions);
  private _apiService: APIService = inject(APIService);
  private _selectDataUtility = selectDataUtility();

  /**
   * fetch list of users effect
   */
  getUsers$ = createEffect(() =>
    this._actions.pipe(
      ofType(ActionNames.actionNameGetUsers),
      concatLatestFrom(() => [
        this._selectDataUtility(selectCurrentPage),
        this._selectDataUtility(selectTTLIsExpired),
        this._selectDataUtility(selectUsersLists),
      ]),
      mergeMap(([_, currentPage, ttlIsExpired, existingUserList]) =>
        !ttlIsExpired
          ? of(
              UserActions.actionSetUsers({
                users: existingUserList,
                persisted: true,
              })
            )
          : this._apiService.get('users', `page=${currentPage}`).pipe(
              map(
                ({
                  data: rawUsersData,
                  total_pages: pages,
                  per_page: perPage,
                }) =>
                  UserActions.actionSetUsers({
                    users: rawUsersData.map((rawUserData: any) =>
                      mapUserData(rawUserData, currentPage)
                    ),
                    pageMeta: { pages, perPage, currentPage },
                    persisted: false,
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
              userData: mapUserData(userData, 0),
            })
          ),
          catchError((err) =>
            of(UserActions.actionSetUserDetails({ userData: undefined }))
          )
        )
      )
    )
  );
}

const mapUserData = (rawUserData: any, pageNum: number): IUserData => ({
  image: rawUserData.avatar,
  email: rawUserData.email,
  firstName: rawUserData.first_name,
  lastName: rawUserData.last_name,
  id: rawUserData.id,
  pageNum,
});
