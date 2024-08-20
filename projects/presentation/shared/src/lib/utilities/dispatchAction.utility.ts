import { inject } from '@angular/core';
import { Store } from '@ngrx/store';

export const dispatchActionUtility = () => {
  const store: Store = inject(Store);

  return (action: Function, payload: any = {}) =>
    store.dispatch(action(payload));
};
