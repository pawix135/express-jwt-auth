import { Request } from "express";
import { IncomingHttpHeaders } from "http";
export const getAccessToken = (headers: IncomingHttpHeaders): string | null => {
  let accessToken = headers.authorization?.split(" ")[1] ?? null;
  if (!accessToken) throw Error("Access token not found!");
  return accessToken;
};
