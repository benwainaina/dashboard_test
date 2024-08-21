import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { APIService } from '../../../shared/src/lib/services/api.service';
import * as ActionNames from './actionNames';
import * as UserActions from './actions';
import { concatLatestFrom } from '@ngrx/operators';
import { selectCurrentPage } from './selectors';
import { catchError, map, mergeMap, of } from 'rxjs';
import { actionSetNotificationData } from '../../../shared/src/lib/state_manager/actions';
import { selectDataUtility } from '../../../shared/src/lib/utilities/selectData.utility';

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
          map((res) =>
            UserActions.actionSetUsers({
              users: res.data,
              pageMeta: { pages: res.total_pages, perPage: res.per_page },
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
}
