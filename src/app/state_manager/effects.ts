import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import * as AppActionNames from './actionNames';
import * as AppActions from './actions';
import { selectCurrentPage } from './selectors';
import { catchError, map, mergeMap, of } from 'rxjs';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AppRootEffect {
  private _store$: Store = inject(Store);
  private _actions$: Actions = inject(Actions);
  private _apiService: APIService = inject(APIService);

  getUsers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AppActionNames.actionNameGetUsers),
      concatLatestFrom(() => this._store$.select(selectCurrentPage)),
      mergeMap((action, currentPage) =>
        this._apiService.get('users', `page=${currentPage}`).pipe(
          map((res) =>
            AppActions.actionSetUsers({
              users: res.data,
              pageMeta: { pages: res.total_pages, perPage: res.per_page },
            })
          ),
          catchError((errors) =>
            of(
              AppActions.actionSetNotificationData({
                payload: {
                  type: 'error',
                  message: 'Could not fetch users list',
                },
              })
            )
          )
        )
      )
    )
  );
}
