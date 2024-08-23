import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { selectDataUtility } from '../../../shared/src/lib/utilities/selectData.utility';
import { queryRouterUtility } from '../../../shared/src/lib/utilities/queryRouter.utility';
import { dispatchActionUtility } from '../../../shared/src/lib/utilities/dispatchAction.utility';

import { routerUtility } from '../../../shared/src/lib/utilities/router.utility';
import { AsyncPipe, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { Observable, Subject, takeUntil } from 'rxjs';

import { IListDisplayItem } from '../../../../state_manager/shared/interfaces';
import { MiniUserCardComponent } from './components/cards/mini-user-card/mini-user-card.component';
import { ListDisplayComponent } from '../../../shared/src/lib/components/list-display/list-display.component';
import { RouterLink } from '@angular/router';
import { IUserData } from '../../../../state_manager/user/interfaces';
import {
  selectIsFetchingUserData,
  selectRetrievedUserData,
  selectUsersLists,
} from '../../../../state_manager/user/selectors';
import {
  actionGetUserDetails,
  actionGetUsers,
} from '../../../../state_manager/user/actions';

@Component({
  selector: 'lib-user',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    AsyncPipe,
    NgStyle,
    ListDisplayComponent,
    NgIf,
    RouterLink,
  ],
  templateUrl: 'user.component.html',
  styleUrl: 'user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  private _queryRouterUtility = queryRouterUtility();
  private _dispatchActionUtility = dispatchActionUtility();
  private _routerUtility = routerUtility();
  private _selectDataUtility = selectDataUtility();
  private _onDestroy$: Subject<boolean> = new Subject<boolean>();
  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  public isLoadingUserDetails$: Observable<boolean>;
  public userData$: Observable<IUserData>;
  public peersList: Array<IListDisplayItem> = [];

  constructor() {
    this.isLoadingUserDetails$ = this._selectDataUtility(
      selectIsFetchingUserData
    );
    this.userData$ = this._selectDataUtility(selectRetrievedUserData);
  }

  ngOnInit(): void {
    this._readUserId();
    this._getPeers();
  }

  private _readUserId(): void {
    this._queryRouterUtility('id')
      .pipe(takeUntil(this._onDestroy$))
      .subscribe({
        next: (userId) =>
          this._dispatchActionUtility(actionGetUserDetails, { userId }),
      });
  }

  private _getPeers(): void {
    this._dispatchActionUtility(actionGetUsers);
    this._createPeersList();
  }

  private _createPeersList(): void {
    this._selectDataUtility(selectUsersLists)
      .pipe(takeUntil(this._onDestroy$))
      .subscribe({
        next: (usersList: Array<IUserData>) => {
          this.peersList = usersList.map((user) => ({
            componentInput: user,
            componentRef: MiniUserCardComponent,
          }));
          this._changeDetectorRef.detectChanges();
        },
      });
  }

  public goToHome(): void {
    this._routerUtility([''], {});
  }
}
