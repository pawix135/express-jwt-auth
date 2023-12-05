import { DocSubsection } from "../docs";

const meRoute: DocSubsection = {
  title: "/me",
  subtitle: "Return user",
  request: {
    http: "GET /api/user/me HTTP/1.1",
    headers: ["Authorization: Bearer <access_token>"],
  },
  responseBody: `interface UserMeResponse {
  ok: boolean;
  me: User;
  error?: APIError;
}`,
};

const changeSettingsRoute: DocSubsection = {
  title: "/settings",
  subtitle: "Update selected user settings",
  request: {
    http: "POST /api/user/settings HTTP/1.1",
    headers: ["Authorization: Bearer <access_token>"],
  },
  requestBody: `interface UserChangeSettingsBody{
  username?: string;
  email?: string;
  password?: string;
}`,
  responseBody: `interface UserChangeSettingsResponse {
  ok: boolean;
  success: boolean;
  error?: APIError;
}`,
};

const changeUsernameRoute: DocSubsection = {
  title: "/settings/username",
  subtitle: "Update user username",
  request: {
    http: "POST /api/user/settings/username HTTP/1.1",
    headers: ["Authorization: Bearer <access_token>"],
  },
  requestBody: `interface UserChangeUsernameBody{
  username: string;
}`,
  responseBody: `interface UserChangeUsernameResponse {
  ok: boolean;
  success: boolean;
  error?: APIError;
}`,
};

const changeEmailRoute: DocSubsection = {
  title: "/settings/username",
  subtitle: "Update user email",
  request: {
    http: "POST /api/user/settings/email HTTP/1.1",
    headers: ["Authorization: Bearer <access_token>"],
  },
  requestBody: `interface UserChangeEmailBody{
  email: string;
}`,
  responseBody: `interface UserChangeEmailResponse {
  ok: boolean;
  success: boolean;
  error?: APIError;
}`,
};

const changePasswordRoute: DocSubsection = {
  title: "/settings/password",
  subtitle: "Update user password",
  request: {
    http: "POST /api/user/settings/password HTTP/1.1",
    headers: ["Authorization: Bearer <access_token>"],
  },
  requestBody: `interface UserChangePasswordBody{
  password: string;
}`,
  responseBody: `interface UserChangePasswordResponse {
  ok: boolean;
  success: boolean;
  error?: APIError;
}`,
};

export const userRoutes = [
  meRoute,
  changeSettingsRoute,
  changeUsernameRoute,
  changeEmailRoute,
  changePasswordRoute,
];
