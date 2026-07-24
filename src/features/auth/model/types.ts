export interface AuthResponse {
  status: "OK" | "FORBIDDEN" | "ERROR";
  data?: AuthUserData;
  message?: string;
}

/** Backend may return raw token object (no wrapper) or wrapped in { status, data }. */
export type LoginApiResponse = AuthResponse | AuthTokenData;

/** Raw token response from backend /auth/login */
export interface AuthTokenData {
  access_token: string;
  refresh_token: string;
  device_id?: string;
  expires_at?: string;
}

export interface AuthUserData extends AuthTokenData {
  id?: string;
  full_name?: string;
  position?: string;
  role_name?: string;
  login?: string;
}
