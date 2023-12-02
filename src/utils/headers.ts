import {
  ACCESS_TOKEN_HEADER_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from "@/constants/tokens";
import { Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

export const getAccessToken = (headers: IncomingHttpHeaders): string | null => {
  let accessToken = headers.authorization?.split(" ")[1] ?? null;
  if (!accessToken) throw Error("Access token not found!");
  return accessToken;
};

export const getRefreshToken = (cookies: Request["cookies"]): string => {
  let refreshToken = cookies[REFRESH_TOKEN_COOKIE_NAME];
  if (!refreshToken) throw Error("Refresh token not found!");
  return refreshToken;
};

export const setAuthorizationHeader = (res: Response, token: string): void => {
  res.setHeader("Authorization", `Bearer ${token}`);
};
