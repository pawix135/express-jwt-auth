import { DocSubsection } from "../docs";

const signUpRoute: DocSubsection = {
  title: "/signup",
  subtitle: "Create new user account",
  request: {
    http: "POST /api/auth/signup HTTP/1.1",
    headers: ["Content-Type: application/json"],
  },
  requestBody: `interface AuthSignUpBody {
  username: string;
  password: string;
}`,
  responseBody: `interface AuthSignUpResponse {
  auth: boolean,
  error?: APIError;
}`,
};

const signInRoute: DocSubsection = {
  title: "/signin",
  subtitle:
    "Signs in user and sets authorization header for access token(30min) and cookie for refresh token(30 days).",
  request: {
    http: "POST /api/auth/signin HTTP/1.1",
    headers: ["Content-Type: application/json"],
  },
  requestBody: `interface AuthSignInBody {
  username: string;
  password: string;
}`,
  responseBody: `interface AuthSignUpResponse {
  access_token: string;
  auth: boolean;
  error?: APIError;
}`,
};

const revokeRoute: DocSubsection = {
  title: "/revoke",
  subtitle: "Revoke access token",
  request: {
    http: "POST /api/auth/revoke HTTP/1.1",
    headers: ["Content-Type: application/json", "Cookie: <refresh_token>"],
  },
  responseBody: `interface AuthRevokeResponse {
  access_token: string;
  auth: boolean;
  error?: APIError;
}`,
};

export const authRoutes = [signUpRoute, signInRoute, revokeRoute];
