import { Component } from '@angular/core';
import { PagesComponentComponent } from '../../../shared/src/lib/components/pages-component/pages-component.component';
import { dispatchActionUtility } from '../../../shared/src/lib/utilities/dispatchAction.utility';
import { ListDisplayComponent } from '../../../shared/src/lib/components/list-display/list-display.component';
import { selectDataUtility } from '../../../shared/src/lib/utilities/selectData.utility';
import { Subject, takeUntil } from 'rxjs';
import { selectUsersLists } from '../../../user/src/state_manager/selectors';
import { actionGetUsers } from '../../../user/src/state_manager/actions';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [PagesComponentComponent, ListDisplayComponent],
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
})
export class HomeComponent {
  private _dispatchActionUtility = dispatchActionUtility();
  private _usersList$ = selectDataUtility()(selectUsersLists);
  private _onDestroy$: Subject<boolean> = new Subject<boolean>();
  public usersList: Array<Component> = [];

  ngOnInit(): void {
    this._dispatchActionUtility(actionGetUsers, { pageNumber: 1 });
    this._listenForUserList();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(true);
    this._onDestroy$.complete();
  }

  private _listenForUserList(): void {
    this._usersList$.pipe(takeUntil(this._onDestroy$)).subscribe({
      next: (users) => {
        console.log('users', users);
      },
    });
  }
}
