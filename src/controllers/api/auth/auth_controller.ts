import { REFRESH_TOKEN_COOKIE_NAME } from "@/constants/tokens";
import { getRefreshToken } from "@/utils/headers";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "@/utils/jwt";
import {
  signInSchema,
  signUpSchema,
} from "@/validators/api/auth/auth_validator";
import { JwtPayload } from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import { prisma } from "@/db/prisma";
import {
  AuthRevokeResponse,
  AuthSignInResponse,
  AuthSignUpResponse,
} from "@/@types/API/Auth";
import { errorResponse } from "@/utils/response";
import { APIControler } from "@/@types/API";
import { AuthError } from "@/errors/auth_error";
import {
  AUTH_USER_NOT_FOUND,
  AUTH_USER_WRONG_PASSWORD,
} from "@/constants/auth";

export const POST_SIGN_UP: APIControler<AuthSignUpResponse> = async (
  req,
  res
) => {
  try {
    let { username, password } = signUpSchema.parse(req.body);

    // Check if user with given username already exists, throws exception
    await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    // Hash plain password into hash
    let hashedPassword = await hash(password, 10);

    // Create new user record in database
    await prisma.user.create({
      data: {
        hash: hashedPassword,
        username,
      },
    });

    return res.json({ auth: true });
  } catch (error) {
    return errorResponse<AuthSignUpResponse>(res, { auth: false }, error);
  }
};

export const POST_SIGN_IN: APIControler<AuthSignInResponse> = async (
  req,
  res
) => {
  try {
    let { password, username } = signInSchema.parse(req.body);

    //Check if user with given username exists
    let user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) throw new AuthError(AUTH_USER_NOT_FOUND);

    // Throw error if password don't match
    if (!(await compare(password, user.hash)))
      throw new AuthError(AUTH_USER_WRONG_PASSWORD);

    // Set refresh token cookie
    res.cookie(
      REFRESH_TOKEN_COOKIE_NAME,
      createRefreshToken({
        id: user.id,
        username: user.username,
      }),
      {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      }
    );

    return res.json({
      access_token: createAccessToken({
        id: user.id,
        username: user.username,
      }),
      auth: true,
    });
  } catch (error) {
    return errorResponse<AuthSignInResponse>(res, { auth: false }, error, 401);
  }
};

export const POST_REVOKE_ACCESS_TOKEN: APIControler<AuthRevokeResponse> = (
  req,
  res
) => {
  try {
    let refreshTokenString = getRefreshToken(req.cookies);

    let refreshToken = verifyRefreshToken(refreshTokenString) as JwtPayload;

    return res.json({
      auth: true,
      access_token: createAccessToken({
        id: refreshToken.id,
        username: refreshToken.username,
      }),
    });
  } catch (error) {
    return errorResponse<AuthRevokeResponse>(res, { auth: false }, error);
  }
};
