import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export const selectDataUtility = (): ((
  selector: any,
  props?: any
) => Observable<any>) => {
  const store: Store = inject(Store);

  return (selectorFn: any, props?: any): Observable<any> =>
    new Observable((subscriber) =>
      store.select(selectorFn, props).subscribe({
        next: (data) => subscriber.next(data),
      })
    );
};
