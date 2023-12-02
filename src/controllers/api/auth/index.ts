import { REFRESH_TOKEN_COOKIE_NAME } from "@/constants/tokens";
import {
  getAccessToken,
  getRefreshToken,
  setAuthorizationHeader,
} from "@/utils/headers";
import {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "@/utils/jwt";
import {
  signInSchema,
  signUpSchema,
} from "@/validators/api/auth/auth_validator";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { prisma } from "@/db/prisma";

interface AuthController {
  [key: string]: (
    req: Request,
    response: Response,
    next: NextFunction
  ) => any | Promise<any>;
}

export const authController: AuthController = {
  authRoute: (_, response) => {
    return response.json({ auth: "ok" });
  },
  POST_SIGN_UP: async (req, res) => {
    try {
      let data = signUpSchema.parse(req.body);

      let checkIfExists = await prisma.user.findFirst({
        where: {
          username: data.username,
        },
      });

      if (checkIfExists != null) {
        return res.json({
          ok: false,
          message: "User with given username already exists",
        });
      }

      await prisma.user.create({
        data: {
          hash: await hash(data.password, 10),
          username: data.username,
        },
      });

      return res.json({ ok: true, message: "Account created!" });
    } catch (error) {
      console.log(error);
      return res.json({
        ok: false,
        error,
        message: "Something went wrong while creating account!",
      });
    }
  },
  POST_SIGN_IN: async (req, res) => {
    try {
      let data = signInSchema.parse(req.body);
      let user = await prisma.user.findFirst({
        where: {
          username: data.username,
        },
      });

      if (!user) {
        return res.json({
          ok: false,
          message: "User not found!",
        });
      }

      let comparePasswords = await compare(data.password, user.hash);

      if (!comparePasswords) {
        return res.json({
          ok: false,
          message: "Bad password",
        });
      }

      let accessToken = createAccessToken({
        id: user.id,
        username: user.username,
      });

      let refreshToken = createRefreshToken({
        id: user.id,
        username: user.username,
      });

      res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });

      setAuthorizationHeader(res, accessToken);

      return res.json({ ok: true, message: "Authenticated" });
    } catch (error) {
      console.log(error);

      return res.json({ ok: "no body :( other" });
    }
  },
  POST_CHECK_ACCESS_TOKEN: (req, res) => {
    try {
      let token = getAccessToken(req.headers);
      let verifiedToken = verifyAccessToken(token!);
      console.log(verifiedToken, "verified token");
      res.json({ ok: true, verifiedToken });
    } catch (error) {
      console.log(error);
      res.json({ ok: false, error: "Invalid token!" });
    }
  },
  POST_REVOKE_ACCESS_TOKEN: (req, res) => {
    try {
      let refreshTokenString = getRefreshToken(req.cookies);

      let refreshToken = verifyRefreshToken(refreshTokenString) as JwtPayload;

      let newAccessToken = createAccessToken({
        id: refreshToken.id,
        username: refreshToken.username,
      });

      setAuthorizationHeader(res, newAccessToken);

      res.json({ ok: true, message: "Fresh access token granted" });
    } catch (error) {
      console.log(error);
      res.status(401).end();
    }
  },
} as const;
