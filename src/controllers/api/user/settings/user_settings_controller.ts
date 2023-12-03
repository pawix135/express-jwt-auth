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

export const userSettingsController: UserController = {
  POST_CHANGE_EMAIL: async (req, res) => {
    try {
      let data = UserChangeEmailSchema.parse(req.body);

      let updateEmail = await prisma.user.setEmail(req.context.id, data.email);

      if (!updateEmail) {
        return res.json({ ok: false, message: "Email already taken!" });
      }

      return res.json({ ok: true, message: "Email successfuly changed!" });
    } catch (error) {
      console.log(error);
      return res.status(402).end();
    }
  },
} as const;
