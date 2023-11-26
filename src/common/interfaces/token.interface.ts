export interface ITokenPayload {
  _userId: string;
  email: string;
}

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}
