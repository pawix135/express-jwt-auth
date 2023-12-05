import { TokenMiddlewareResponse } from "@/@types/API/Middleware";
import { testErrors } from "@/constants/errors";
import { ACCESS_TOKEN_NO_ID, REFRESH_TOKEN_NO_ID } from "@/constants/tokens";
import { TokenError } from "@/errors/token_error";
import { handleError } from "@/utils/errors";
import { getAccessToken, getRefreshToken } from "@/utils/headers";
import {
  createAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "@/utils/jwt";
import { errorResponse } from "@/utils/response";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

// Validates user access to enable access to protected routes
export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = getAccessToken(req.headers);

    let validateToken = verifyAccessToken(token!) as JwtPayload;

    if (!validateToken.id) throw new TokenError(ACCESS_TOKEN_NO_ID);

    req["context"] = {
      id: validateToken.id,
    };

    return next();
  } catch (e) {
    let refreshToken = getRefreshToken(req.cookies);

    if (refreshToken) {
      try {
        let token = verifyRefreshToken(refreshToken) as JwtPayload;

        if (!token.id) throw new TokenError(REFRESH_TOKEN_NO_ID);

        let newAccessToken = createAccessToken({
          username: token.username,
          id: token.id,
        });

        return res.json({
          access_token: newAccessToken,
          ok: false,
          error: {
            message: "User re-authenticated, try again!!",
            type: "access_token_invalid",
          },
        });
      } catch (error) {
        return errorResponse<TokenMiddlewareResponse>(
          res,
          {
            ok: false,
            error: handleError(e),
          },
          e,
          401
        );
      }
    } else {
      return errorResponse<TokenMiddlewareResponse>(
        res,
        {
          ok: false,
          error: handleError(e),
        },
        e,
        401
      );
    }
  }
};
