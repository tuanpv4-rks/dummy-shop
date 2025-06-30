import { ICredentials } from '@features/auth/models/auth.model';

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public credentials: ICredentials) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
