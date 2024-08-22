import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDynamicObject } from '../state_manager/interfaces';

export const queryRouterUtility = () => {
  const activatedRouted: ActivatedRoute = inject(ActivatedRoute);

  return (paramId: string) => activatedRouted.snapshot.params['id'];
};
