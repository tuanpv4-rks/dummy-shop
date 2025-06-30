import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthState } from '@core/stores/auth.state';
import { Store } from '@ngxs/store';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const authToken = store.selectSnapshot(AuthState.getToken);

  const request = req.clone({
    setHeaders: {
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
  });

  return next(request);
};
