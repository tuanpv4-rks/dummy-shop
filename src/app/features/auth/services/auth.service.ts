import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Logout } from '@core/stores/auth.actions';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IAuthToken, ICredentials, ILoginResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private store = inject(Store);

  public login(credentials: ICredentials): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>('/auth/login', credentials);
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }

  public refresh(refreshToken: string): Observable<IAuthToken> {
    return this.http.post<ILoginResponse>('/auth/refresh', { refreshToken });
  }
}
