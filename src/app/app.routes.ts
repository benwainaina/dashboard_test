import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('../../projects/presentation/home/src/lib/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('../../projects/presentation/user/src/lib/user.component').then(
        (c) => c.UserComponent
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];
