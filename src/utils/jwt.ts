import { User } from "@/@types/User";
import { sign, verify, JwtPayload } from "jsonwebtoken";

export const createAccessToken = (user: User): string => {
  try {
    let token = sign(
      {
        ...user,
      },
      process.env.JWT_ACCESS_SECRET!,
      {
        expiresIn: "5m",
      }
    );

    return token;
  } catch (error) {
    throw new Error("Something went wrong while creating access token!");
  }
};

export const verifyAccessToken = (
  token: string
): JwtPayload | string | null => {
  try {
    let checkToken = verify(token, process.env.JWT_ACCESS_SECRET!);
    return checkToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const createRefreshToken = (user: User): string | null | JwtPayload => {
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
    throw new Error("Something went wrong while creating refresh token!");
  }
};

export const verifyRefreshToken = (
  token: string
): JwtPayload | string | null => {
  try {
    let checkToken = verify(token, process.env.JWT_REFRESH_SECRET!);
    return checkToken;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};
