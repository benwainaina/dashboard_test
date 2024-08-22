import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PagesComponentComponent } from '../../../shared/src/lib/components/pages-component/pages-component.component';
import { dispatchActionUtility } from '../../../shared/src/lib/utilities/dispatchAction.utility';
import { ListDisplayComponent } from '../../../shared/src/lib/components/list-display/list-display.component';
import { selectDataUtility } from '../../../shared/src/lib/utilities/selectData.utility';
import {
  debounceTime,
  distinctUntilChanged,
  firstValueFrom,
  Subject,
  takeUntil,
} from 'rxjs';
import { selectUsersLists } from '../../../user/src/state_manager/selectors';
import { actionGetUsers } from '../../../user/src/state_manager/actions';
import { IUserData } from '../../../user/src/state_manager/interfaces';
import { UserCardComponent } from '../../../user/src/lib/components/user-card/user-card.component';
import { IListDisplayItem } from '../../../shared/src/lib/state_manager/interfaces';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [
    PagesComponentComponent,
    ListDisplayComponent,
    ReactiveFormsModule,
    NgTemplateOutlet,
  ],
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
})
export class HomeComponent {
  private _dispatchActionUtility = dispatchActionUtility();
  private _usersList$ = selectDataUtility()(selectUsersLists);
  private _onDestroy$: Subject<boolean> = new Subject<boolean>();
  public usersList: Array<IListDisplayItem> = [];
  public searchForm: FormGroup = new FormGroup({
    searchField: new FormControl(''),
  });

  ngOnInit(): void {
    this._dispatchActionUtility(actionGetUsers);
    this._listenForUserList();
    this._listenFormFormSearchField();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next(true);
    this._onDestroy$.complete();
  }

  private _listenForUserList(): void {
    this._usersList$.pipe(takeUntil(this._onDestroy$)).subscribe({
      next: (users) => this._createUserListItems(users),
    });
  }

  private _listenFormFormSearchField(): void {
    this.searchForm
      .get('searchField')
      ?.valueChanges.pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe({
        next: async (searchValue) => {
          const usersList = await firstValueFrom(this._usersList$);
          this._createUserListItems(
            usersList.filter((user: IUserData) =>
              user.id.toString().includes(searchValue)
            )
          );
        },
      });
  }

  private _createUserListItems(usersList: Array<IUserData>): void {
    this.usersList = usersList.map((user) => ({
      componentInput: user,
      componentRef: UserCardComponent,
    }));
  }
}
