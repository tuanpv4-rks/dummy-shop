import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { handle401Error } from '@core/helpers/auth.helper';
import { AuthState } from '@core/stores/auth.state';
import { Store } from '@ngxs/store';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const accessToken = store.selectSnapshot(AuthState.getAccessToken);
  const refreshToken = store.selectSnapshot(AuthState.geRefreshToken);

  const request = req.clone({
    setHeaders: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  return next(request).pipe(
    catchError(error => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        refreshToken
      ) {
        return handle401Error(request, next, store, refreshToken);
      }
      return throwError(() => error);
    })
  );
};
