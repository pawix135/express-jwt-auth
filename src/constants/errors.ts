import { AUTH_USER_NOT_FOUND, AUTH_USER_WRONG_PASSWORD } from "./auth";
import {
  ACCESS_TOKEN_NO_ID,
  ACCESS_TOKEN_SIGN_ERROR,
  ACCESS_TOKEN_VERIFY_ERROR,
  REFRESH_TOKEN_NO_ID,
  REFRESH_TOKEN_SIGN_ERROR,
  REFRESH_TOKEN_VERIFY_ERROR,
} from "./tokens";
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "./validation";

export const testErrors = {
  auth: {
    [AUTH_USER_NOT_FOUND]: "User not found!",
    [AUTH_USER_WRONG_PASSWORD]: "Password don't match!",
  },
  username: {
    taken: "Username is already taken!",
    required: "Username is required!",
    invalid_type: "Invalid characters, change your username!",
    min_length: `Username too short, minimum ${USERNAME_MIN_LENGTH} characters!`,
    max_length: `Username too logn, maximum ${USERNAME_MAX_LENGTH} characters!`,
  },
  password: {
    required: "Password is required!",
    invalid_type: "Invalid characters, change your password!",
    min_length: `Password too short, minimum ${PASSWORD_MIN_LENGTH} characters!`,
    max_length: `Password too long, maximum ${PASSWORD_MAX_LENGTH} characters!`,
  },
  email: {
    required: "E-mail is required!",
    taken: "This e-mail is already taken!",
    invalid: "E-mail is invalid!",
  },
  unknown: {
    p2002: "Unknown error",
  },
  token: {
    [ACCESS_TOKEN_SIGN_ERROR]:
      "Something went wrong while signing access token!",
    [ACCESS_TOKEN_VERIFY_ERROR]: "Invalid access token!",
    [ACCESS_TOKEN_NO_ID]: "Access token don't contain user id!",
    [REFRESH_TOKEN_SIGN_ERROR]:
      "Something went wrong while signing refresh token!",
    [REFRESH_TOKEN_VERIFY_ERROR]: "Invalid refresh token!",
    [REFRESH_TOKEN_NO_ID]: "Token don't contain user id!",
  },
} as const;
