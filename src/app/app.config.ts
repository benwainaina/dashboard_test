import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppRootEffect } from './state_manager/effects';
import { appReducer } from './state_manager/reducers';
import { AppSliceName } from './state_manager/interfaces';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideHttpClient(),
    provideState({
      name: AppSliceName,
      reducer: appReducer,
    }),
    provideEffects(AppRootEffect),
  ],
};
