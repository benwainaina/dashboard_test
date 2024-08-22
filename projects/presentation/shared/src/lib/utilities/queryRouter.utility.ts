import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const queryRouterUtility = () => {
  const activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  return (paramId: string) =>
    new Observable((subscriber) => {
      activatedRoute.params.subscribe({
        next: (params) => subscriber.next(params[paramId]),
      });
    });
};
