import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { userReducer } from '../../projects/state_manager/user/reducers';
import { UserSliceName } from '../../projects/state_manager/user/interfaces';
import { UserEffect } from '../../projects/state_manager/user/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({
      [UserSliceName]: userReducer,
    }),
    provideHttpClient(),
    provideEffects(UserEffect),
  ],
};
