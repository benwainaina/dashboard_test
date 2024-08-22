import { Component, inject, OnInit } from '@angular/core';
import { selectDataUtility } from '../../../shared/src/lib/utilities/selectData.utility';
import { queryRouterUtility } from '../../../shared/src/lib/utilities/queryRouter.utility';
import { dispatchActionUtility } from '../../../shared/src/lib/utilities/dispatchAction.utility';
import { actionGetUserDetails } from '../state_manager/actions';

@Component({
  selector: 'lib-user',
  standalone: true,
  imports: [],
  templateUrl: 'user.component.html',
  styleUrl: 'user.component.scss',
})
export class UserComponent implements OnInit {
  private _queryRouterUtility = queryRouterUtility();
  private _dispatchActionUtility = dispatchActionUtility();

  ngOnInit(): void {
    const userId = this._queryRouterUtility('id');
    if (userId) {
      this._dispatchActionUtility(actionGetUserDetails, { userId });
    }
  }
}
