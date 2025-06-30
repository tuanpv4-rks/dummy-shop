import { inject, Injectable } from '@angular/core';
import { AuthService } from '@features/auth/services/auth.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { Login, Logout } from './auth.actions';
import { ILoginResponse } from '@features/auth/models/auth.model';

export interface AuthStateModel {
  token: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: { token: null },
})
@Injectable()
export class AuthState {
  private authService = inject(AuthService);

  @Selector()
  static getToken(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static getIsAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Action(Login, { cancelUncompleted: true })
  public login(
    ctx: StateContext<AuthStateModel>,
    { credentials }: Login
  ): Observable<ILoginResponse> {
    return this.authService.login(credentials).pipe(
      tap((result) => {
        const { accessToken } = result;
        ctx.patchState({ token: accessToken });
      })
    );
  }

  @Action(Logout)
  public logout(ctx: StateContext<AuthStateModel>): void {
    ctx.setState({ token: null });
  }
}
