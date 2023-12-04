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
import {
  AuthResponse,
  AuthRevokeResponse,
  AuthSignInResponse,
} from "@/@types/API/Auth";
import { response } from "@/utils/response";

type AuthController = (
  req: Request,
  res: Response,
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

    return response<AuthResponse>(res, { auth: true, endpoint: req.path });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint violation
      if (error.code === "P2002") {
        return response<AuthResponse>(
          res,
          {
            auth: false,
            endpoint: req.path,
            error: {
              message: "Username already taken!",
              type: "username_taken",
            },
          },
          401
        );
      }
    }

    console.error("Internal error", error);
    return response<AuthResponse>(
      res,
      {
        auth: false,
        endpoint: req.path,
        error: {
          message: "Something went wrong!",
          type: "internal_error",
        },
      },
      401
    );
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

    console.log(user);

    if (!user) {
      return response(
        res,
        {
          auth: false,
          endpoint: req.path,
          error: {
            message: "User account not created",
            type: "database_error",
          },
        },
        401
      );
    }

    let comparePasswords = await compare(password, user.hash);

    if (!comparePasswords) {
      return response<AuthResponse>(
        res,
        {
          auth: false,
          endpoint: req.path,
          error: {
            message: "Invalid password!",
            type: "invalid_password",
          },
        },
        401
      );
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

    return response<AuthSignInResponse>(res, {
      auth: true,
      endpoint: req.path,
      access_token: accessToken,
    });
  } catch (error) {
    console.error(error);
    return response<AuthResponse>(
      res,
      {
        auth: false,
        endpoint: req.path,
        error: {
          message: "Internal error",
          type: "internal_error",
        },
      },
      401
    );
  }
};

export const POST_CHECK_ACCESS_TOKEN: AuthController = (req, res) => {
  try {
    let token = getAccessToken(req.headers);
    verifyAccessToken(token);

    return response<AuthResponse>(res, { auth: true, endpoint: req.path });
  } catch (error) {
    console.error(error);
    return response<AuthResponse>(
      res,
      {
        auth: false,
        endpoint: req.path,
        error: {
          message: "Invalid error",
          type: "invalid_token",
        },
      },
      401
    );
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

    return response<AuthRevokeResponse>(res, {
      auth: true,
      endpoint: req.path,
      access_token: newAccessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).end();
  }
};
