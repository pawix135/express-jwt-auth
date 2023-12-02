import { REFRESH_TOKEN_COOKIE_NAME } from "@/constants/tokens";
import { Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

// Parses access token from headers and returns it
export const getAccessToken = (headers: IncomingHttpHeaders): string => {
  let accessToken = headers.authorization?.split(" ")[1];
  if (!accessToken) throw Error("Access token not found!");
  return accessToken;
};

// Parses refresh token from headers and returns it
export const getRefreshToken = (cookies: Request["cookies"]): string => {
  let refreshToken = cookies[REFRESH_TOKEN_COOKIE_NAME];
  if (!refreshToken) throw Error("Refresh token not found!");
  return refreshToken;
};

// Sets authorization header
export const setAuthorizationHeader = (res: Response, token: string): void => {
  res.setHeader("Authorization", `Bearer ${token}`);
};
