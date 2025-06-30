import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthState } from '@core/stores/auth.state';
import { Store } from '@ngxs/store';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const isAuthenticated = store.selectSnapshot(AuthState.getIsAuthenticated);
  return isAuthenticated;
};
