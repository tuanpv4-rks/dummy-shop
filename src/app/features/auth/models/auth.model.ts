export interface ICredentials {
  username: string;
  password: string;
}

export interface IAuthToken {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponse extends IAuthToken {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}
