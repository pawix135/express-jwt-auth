import { APIResponse } from "../";

export interface AuthResponse extends APIResponse {
  auth: boolean;
}

export interface AuthSignInResponse extends AuthResponse {
  access_token: string;
}
export interface AuthSignUpResponse extends AuthResponse {}

export interface AuthRevokeResponse extends AuthResponse {
  access_token: string;
}

export interface AuthRevokeResponse extends AuthResponse {
  access_token: string;
}
