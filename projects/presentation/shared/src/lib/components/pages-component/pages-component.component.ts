import { Component } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { selectDataUtility } from '../../utilities/selectData.utility';
import {
  selectCurrentPage,
  selectTotalPages,
} from '../../../../../user/src/state_manager/selectors';
import { AsyncPipe } from '@angular/common';
import { dispatchActionUtility } from '../../utilities/dispatchAction.utility';
import {
  actionGetUsers,
  actionSetCurrentPage,
} from '../../../../../user/src/state_manager/actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pages-component',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './pages-component.component.html',
  styleUrl: './pages-component.component.scss',
})
export class PagesComponentComponent {
  private _selectDataUtility = selectDataUtility();
  private _dispatchActionUtility = dispatchActionUtility();

  public currentPage$: Observable<number>;
  public skipToPage!: number;
  public allPagesCount$: Observable<number>;

  constructor() {
    this.currentPage$ = this._selectDataUtility(selectCurrentPage);
    this.allPagesCount$ = this._selectDataUtility(selectTotalPages);
  }

  public async goToNext() {
    const currentPage = await this._getCurrentPage();
    const allPages = await this._getTotalPages();
    if (currentPage < allPages) {
      this.goToPage(currentPage + 1);
    }
  }

  public async goToPrevious() {
    const currentPage = await this._getCurrentPage();
    if (currentPage > 1) {
      this.goToPage(currentPage - 1);
    }
  }

  private async _getCurrentPage() {
    return await firstValueFrom(this._selectDataUtility(selectCurrentPage));
  }

  private async _getTotalPages() {
    return await firstValueFrom(this.allPagesCount$);
  }

  public async goToLast() {
    const allPages = await this._getTotalPages();
    this.goToPage(allPages);
  }

  public goToPage(page: number): void {
    this._dispatchActionUtility(actionSetCurrentPage, { page });
    this._dispatchActionUtility(actionGetUsers, {});
  }
}
