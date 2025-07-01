import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthState } from '@features/auth/stores/auth.state';
import { Store } from '@ngxs/store';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  const isAuthenticated = store.selectSnapshot(AuthState.getIsAuthenticated);

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
