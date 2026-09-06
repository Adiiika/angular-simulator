export interface IToken {
  accessToken: string;
  refreshToken: string;
  expiresInMins?: number;
}