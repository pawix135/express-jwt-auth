import { prisma } from "@/db/prisma";
import { UserChangeEmailSchema } from "@/validators/api/user/user_validator";
import { NextFunction, Request, Response } from "express";

type UserController = {
  [key: string]: (
    req: Request,
    response: Response,
    next: NextFunction
  ) => Response | Promise<Response>;
};

export const userController: UserController = {
  GET_ME: async (req, res) => {
    console.log(req.headers.authorization);

    let user = await prisma.user.me(req.context.id);

    if (!user) {
      return res.json({ ok: false, message: "User not found" });
    }

    console.log(req.cookies);

    return res.json({ me: user });
  },
  POST_CHANGE_EMAIL: async (req, res) => {
    try {
      let data = UserChangeEmailSchema.parse(req.body);
      let updateEmail = await prisma.user.setEmail(req.context.id, data.email);

      if (!updateEmail) {
        return res.json({ ok: false, message: "Email already taken!" });
      }

      return res.json({ ok: true, message: "Email successfuly changed!" });
    } catch (error) {
      return res.status(401).end();
    }
  },
} as const;
