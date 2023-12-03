import { REFRESH_TOKEN_COOKIE_NAME } from "@/constants/tokens";
import { getAccessToken, getRefreshToken } from "@/utils/headers";
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
import { Prisma } from "@prisma/client";
import { AuthResponse } from "@/@types/API/Auth";

type AuthController = (
  req: Request,
  res: Response<AuthResponse>,
  next: NextFunction
) => Promise<any> | any;

export const POST_SIGN_UP: AuthController = async (req, res) => {
  try {
    let { username, password } = signUpSchema.parse(req.body);

    // Check if user with given username already exists, throws exception
    await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    let hashedPassword = await hash(password, 10);

    await prisma.user.signUp(username, hashedPassword);

    return res.json({ auth: true, endpoint: req.path });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint violation
      if (error.code === "P2002") {
        return res.json({
          auth: false,
          endpoint: req.path,
          error: {
            message: "Username already taken!",
            type: "username_taken",
          },
        });
      }
    }

    console.error("Internal error", error);
    return res.json({
      auth: false,
      endpoint: req.path,
      error: {
        message: "Something went wrong!",
        type: "internal_error",
      },
    });
  }
};

export const POST_SIGN_IN: AuthController = async (req, res) => {
  try {
    let { password, username } = signInSchema.parse(req.body);

    let user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.json({
        auth: false,
        endpoint: req.path,
        error: {
          message: "User account not created",
          type: "database_error",
        },
      });
    }

    let comparePasswords = await compare(password, user.hash);

    if (!comparePasswords) {
      return res.json({
        auth: false,
        endpoint: req.path,
        error: {
          message: "Invalid password!",
          type: "invalid_password",
        },
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
      sameSite: "strict",
      path: "/",
      maxAge: 1000 * 60 * 60 * 24 * 30,
    });

    return res.json({
      auth: true,
      endpoint: req.path,
      access_token: accessToken,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      auth: false,
      endpoint: req.path,
      error: {
        message: "Internal error",
        type: "internal_error",
      },
    });
  }
};

export const POST_CHECK_ACCESS_TOKEN: AuthController = (req, res) => {
  try {
    let token = getAccessToken(req.headers);
    verifyAccessToken(token!);

    return res.json({ auth: true, endpoint: req.path });
  } catch (error) {
    console.error(error);
    return res.json({
      auth: false,
      endpoint: req.path,
      error: {
        message: "Invalid error",
        type: "invalid_token",
      },
    });
  }
};

export const POST_REVOKE_ACCESS_TOKEN: AuthController = (req, res) => {
  try {
    console.log(req.cookies);

    let refreshTokenString = getRefreshToken(req.cookies);

    let refreshToken = verifyRefreshToken(refreshTokenString) as JwtPayload;

    let newAccessToken = createAccessToken({
      id: refreshToken.id,
      username: refreshToken.username,
    });

    return res.json({
      auth: true,
      endpoint: req.path,
      access_token: newAccessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).end();
  }
};
