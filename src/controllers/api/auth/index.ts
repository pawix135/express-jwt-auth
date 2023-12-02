import { getAccessToken } from "@/utils/headers";
import {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
} from "@/utils/jwt";
import { signInSchema } from "@/validators/api/auth/auth_validator";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { ZodError } from "zod";

interface AuthController {
  [key: string]: (
    req: Request,
    response: Response,
    next: NextFunction
  ) => void | Promise<void>;
}

let testUser = {
  username: "pawix",
  password: "123",
};

let textToNumbers = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
} as const;
export const authController: AuthController = {
  authRoute: (request, response) => {
    response.json({ auth: "ok" });
  },
  POST_SIGNIN: (req, res) => {
    try {
      let data = signInSchema.parse(req.body);

      if (
        testUser.password == data.password &&
        testUser.username == data.username
      ) {
        let accessToken = createAccessToken({
          email: "pawelbul01@gmail.com",
          id: 1,
          username: "pawix135",
        });

        let refreshToken = createRefreshToken({
          email: "pawelbul01@gmail.com",
          id: 1,
          username: "pawix135",
        }) as JwtPayload;

        res.cookie("itoken", refreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        res.setHeader("Authorization", `Bearer ${accessToken}`);

        res.json({ ok: "body" });
      } else {
        res.json({ bad: "bad user and pass" });
      }

      console.log(data, req.headers.authorization);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error);

        let errors = error.errors.map((err) => ({ message: err.message }));
        res.json({ ok: "no body :(", errors });
      } else {
        console.log(error);

        res.json({ ok: "no body :( other" });
      }
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
  POST_REVOKE_ACCESS_TOKEN: (req, res) => {},
} as const;
