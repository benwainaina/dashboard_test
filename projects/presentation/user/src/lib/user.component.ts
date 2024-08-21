import { Component, inject } from '@angular/core';
import { selectDataUtility } from '../../../shared/src/lib/utilities/selectData.utility';
import { selectUsersLists } from '../state_manager/selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-user',
  standalone: true,
  imports: [],
  template: ` <p>user works!</p> `,
  styles: ``,
})
export class UserComponent {
  private _usersList$ = selectDataUtility()(selectUsersLists);
  private _store: Store = inject(Store);

  ngOnInit(): void {
    this._usersList$.subscribe({
      next: (users) => {
        console.log('users', users);
      },
    });
  }
}
