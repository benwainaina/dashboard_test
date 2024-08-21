import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { UserEffect } from '../../projects/presentation/user/src/state_manager/effects';
import { UserSliceName } from '../../projects/presentation/user/src/state_manager/interfaces';
import { userReducer } from '../../projects/presentation/user/src/state_manager/reducers';

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
