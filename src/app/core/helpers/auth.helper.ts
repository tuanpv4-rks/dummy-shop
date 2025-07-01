import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Logout, Refresh } from '@features/auth/stores/auth.actions';
import { AuthState } from '@features/auth/stores/auth.state';
import { Store } from '@ngxs/store';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

export function handle401Error(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
  store: Store,
  refreshToken: string
): Observable<HttpEvent<unknown>> {
  return store.dispatch(new Refresh(refreshToken)).pipe(
    switchMap(() => {
      const newAccessToken = store.selectSnapshot(AuthState.getAccessToken);
      console.log(newAccessToken);
      if (!newAccessToken) {
        store.dispatch(new Logout());
        return throwError(() => new Error('Refresh failed - no new token'));
      }
      const newRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
      return next(newRequest);
    }),
    catchError(err => {
      console.log(err);
      store.dispatch(new Logout());
      return throwError(() => err);
    })
  );
}
