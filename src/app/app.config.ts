import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { apiInterceptor } from '@core/interceptors/api.interceptor';
import { AuthState } from '@features/auth/stores/auth.state';
import { ProductState } from '@features/product/stores/product.state';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { routes } from './app.routes';
import { tokenInterceptor } from '@core/interceptors/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor, tokenInterceptor])),
    provideStore(
      [AuthState, ProductState],
      withNgxsStoragePlugin({
        keys: ['auth.accessToken', 'auth.refreshToken'],
      })
    ),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
    importProvidersFrom(MatSnackBarModule),
  ],
};
