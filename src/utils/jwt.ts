import { Token } from "@/@types/Token";
import {
  ACCESS_TOKEN_SIGN_ERROR,
  ACCESS_TOKEN_VERIFY_ERROR,
  REFRESH_TOKEN_SIGN_ERROR,
  REFRESH_TOKEN_VERIFY_ERROR,
} from "@/constants/tokens";
import { TokenError } from "@/errors/token_error";
import { sign, verify, JwtPayload } from "jsonwebtoken";

export const createAccessToken = (user: Token): string => {
  try {
    let token = sign(
      {
        ...user,
      },
      process.env.JWT_ACCESS_SECRET!,
      {
        expiresIn: "30m",
      }
    );

    return token;
  } catch (error) {
    throw new TokenError(ACCESS_TOKEN_SIGN_ERROR);
  }
};

export const verifyAccessToken = (
  token: string
): JwtPayload | string | null => {
  try {
    let checkToken = verify(token, process.env.JWT_ACCESS_SECRET!);
    return checkToken;
  } catch (error) {
    throw new TokenError(ACCESS_TOKEN_VERIFY_ERROR);
  }
};

export const createRefreshToken = (user: Token): string | null | JwtPayload => {
  try {
    let token = sign(
      {
        ...user,
      },
      process.env.JWT_REFRESH_SECRET!,
      {
        expiresIn: "30m",
      }
    );

    return token;
  } catch (error) {
    throw new TokenError(REFRESH_TOKEN_SIGN_ERROR);
  }
};

export const verifyRefreshToken = (
  token: string
): JwtPayload | string | null => {
  try {
    return verify(token, process.env.JWT_REFRESH_SECRET!);
  } catch (error) {
    throw new TokenError(REFRESH_TOKEN_VERIFY_ERROR);
  }
};
