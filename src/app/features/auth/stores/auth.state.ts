import { inject, Injectable } from '@angular/core';
import { AuthService } from '@features/auth/services/auth.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { Login, Logout, Refresh } from './auth.actions';
import { IAuthToken, ILoginResponse } from '@features/auth/models/auth.model';

export interface AuthStateModel {
  accessToken: string | null;
  refreshToken: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: { accessToken: null, refreshToken: null },
})
@Injectable()
export class AuthState {
  private authService = inject(AuthService);

  @Selector()
  static getAccessToken(state: AuthStateModel): string | null {
    return state.accessToken;
  }

  @Selector()
  static geRefreshToken(state: AuthStateModel): string | null {
    return state.refreshToken;
  }

  @Selector()
  static getIsAuthenticated(state: AuthStateModel): boolean {
    return !!state.accessToken;
  }

  @Action(Login, { cancelUncompleted: true })
  public login(
    ctx: StateContext<AuthStateModel>,
    { credentials }: Login
  ): Observable<ILoginResponse> {
    return this.authService.login(credentials).pipe(
      tap(result => {
        const { accessToken, refreshToken } = result;
        ctx.patchState({ accessToken, refreshToken });
      })
    );
  }

  @Action(Logout)
  public logout(ctx: StateContext<AuthStateModel>): void {
    ctx.setState({ accessToken: null, refreshToken: null });
  }

  @Action(Refresh, { cancelUncompleted: true })
  public refresh(
    ctx: StateContext<AuthStateModel>,
    { refreshToken }: Refresh
  ): Observable<IAuthToken> {
    return this.authService.refresh(refreshToken).pipe(
      tap(result => {
        const { accessToken, refreshToken } = result;
        ctx.patchState({ accessToken, refreshToken });
      })
    );
  }
}
