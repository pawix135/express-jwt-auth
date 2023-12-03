type AuthEmailError = "email_taken" | "invalid_email" | "blocked_domain";
type AuthUsernameError = "username_taken" | "too_long" | "too_short";
type AuthPasswordError = "invalid_password";
type AuthTokenError = "invalid_token";

type AuthMiscError = "internal_error" | "database_error";

type AuthErrorType =
  | AuthEmailError
  | AuthUsernameError
  | AuthMiscError
  | AuthPasswordError
  | AuthTokenError;

interface AuthError extends APIError<AuthErrorType> {}

export interface AuthResponse extends APIResponse<AuthError> {
  auth: boolean;
  access_token?: string;
}
