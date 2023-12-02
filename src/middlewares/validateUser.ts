import { getAccessToken } from "@/utils/headers";
import { verifyAccessToken } from "@/utils/jwt";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = getAccessToken(req.headers);

    let validateToken = verifyAccessToken(token!) as JwtPayload;
    if (!validateToken) res.status(402).end();

    req["context"] = {
      id: validateToken.id,
    };

    next();
  } catch (error) {
    console.log(error, "error");
    res.status(401).end();
  }
};
