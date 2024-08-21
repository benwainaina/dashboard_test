import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const routerUtility = () => {
  const router: Router = inject(Router);

  return (commands: Array<any>, extras: any) =>
    router.navigate(commands, extras);
};
