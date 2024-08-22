import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import {
  AsyncPipe,
  NgClass,
  NgComponentOutlet,
  NgFor,
  NgIf,
} from '@angular/common';
import {
  IDynamicObject,
  IListDisplayItem,
} from '../../state_manager/interfaces';
import { dispatchActionUtility } from '../../utilities/dispatchAction.utility';
import {
  actionGetUsers,
  actionSetCurrentPage,
} from '../../../../../user/src/state_manager/actions';
import { selectDataUtility } from '../../utilities/selectData.utility';
import {
  selectCurrentPage,
  selectIsFetchingUserData,
  selectIsFetchingUsers,
} from '../../../../../user/src/state_manager/selectors';
import { filter, firstValueFrom, take } from 'rxjs';
import { renderer2Utility } from '../../utilities/renderer2.utility';

@Component({
  selector: 'app-list-display',
  standalone: true,
  imports: [NgFor, NgComponentOutlet, NgIf, AsyncPipe, NgClass],
  templateUrl: './list-display.component.html',
  styleUrl: './list-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDisplayComponent {
  @Input({ required: true }) public listItems: Array<IListDisplayItem> = [];
  @Input({}) public customStyles: IDynamicObject = {};
  @Input({}) public isInfinite: boolean = false;
  @ViewChild('infiniteTriggerElementRef', { static: false })
  private _infiniteTriggerElementRef!: ElementRef;
  @ViewChild('wrapperElementRef', { static: true })
  private _wrapperElementRef!: ElementRef;
  private _selectDataUtility = selectDataUtility();
  private _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _dispatchActionUtility = dispatchActionUtility();
  private _renderer2Utility = renderer2Utility();

  public showLoading: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.isInfinite) {
      this._invokeInfiniteScroll();
      this._listenForPostDataFetch();
    }
    this._applyCustomStyles();
  }

  private _applyCustomStyles(): void {
    for (const key in this.customStyles) {
      this._renderer2Utility(
        this._wrapperElementRef.nativeElement,
        key,
        this.customStyles[key]
      );
    }
  }

  private _listenForPostDataFetch(): void {
    this._selectDataUtility(selectIsFetchingUsers)
      .pipe(filter((status) => status === false))
      .subscribe({
        next: () => {
          this.showLoading = false;
          this._commonChangeDetector();
        },
      });
  }

  private async _invokeInfiniteScroll() {
    const observer = new MutationObserver((changes) => {
      for (let { addedNodes, type } of changes) {
        if (
          type === 'childList' &&
          (addedNodes[0] as HTMLDivElement)?.className?.includes('is-last-item')
        ) {
          const lastNode = addedNodes[0];
          if (lastNode) {
            observer.disconnect();
            this._observeIntersection();
          }
        }
      }
    });
    observer.observe(this._wrapperElementRef.nativeElement, {
      childList: true,
    });
  }

  private _observeIntersection(): void {
    const observer = new IntersectionObserver(
      async (entries) => {
        const [{ isIntersecting }] = entries;
        if (isIntersecting) {
          const currentPage = await firstValueFrom(
            this._selectDataUtility(selectCurrentPage)
          );
          this.showLoading = true;
          this._commonChangeDetector();
          setTimeout(() => {
            this._dispatchActionUtility(actionSetCurrentPage, {
              page: currentPage + 1,
            });
            this._dispatchActionUtility(actionGetUsers);
            this._selectDataUtility(selectIsFetchingUserData)
              .pipe(
                filter((status) => status === false),
                take(1)
              )
              .subscribe({
                next: () => {
                  this.showLoading = false;
                  this._commonChangeDetector();
                  observer.disconnect();
                },
              });
          }, 1000);
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(this._infiniteTriggerElementRef?.nativeElement);
  }

  private _commonChangeDetector(): void {
    this._changeDetectorRef.detectChanges();
  }
}
