import { UserController } from "@/@types/API/User";
import { prisma } from "@/db/prisma";
import {
  UserChangeEmailSchema,
  UserChangePasswordSchema,
  UserChangeUsernameSchema,
} from "@/validators/api/user/user_validator";
import { hash } from "bcrypt";

export const POST_CHANGE_EMAIL: UserController = async (req, res) => {
  try {
    let data = UserChangeEmailSchema.parse(req.body);

    let updateEmail = await prisma.user.setEmail(req.context.id, data.email);

    if (!updateEmail) {
      return res.json({
        ok: false,
        endpoint: req.path,
        error: {
          message: "Email already taken",
          type: "email_taken",
        },
      });
    }

    return res.json({ ok: true, endpoint: req.path });
  } catch (error) {
    console.log(error);
    return res.status(402).end();
  }
};

export const POST_CHANGE_USERNAME: UserController = async (req, res) => {
  try {
    let { username } = UserChangeUsernameSchema.parse(req.body);

    let updateUsername = await prisma.user.setUsername(
      req.context.id,
      username
    );

    if (!updateUsername) {
      return res.json({
        ok: false,
        endpoint: req.path,
        error: {
          message: "Username already taken!",
          type: "username_taken",
        },
      });
    }

    return res.json({ ok: true, endpoint: req.path });
  } catch (error) {
    console.log(error);
    return res.status(402).end();
  }
};

export const POST_CHANGE_PASSWORD: UserController = async (req, res) => {
  try {
    let { password } = UserChangePasswordSchema.parse(req.body);

    let newPasswordHash = await hash(password, 10);

    let updatePassword = await prisma.user.setPassword(
      req.context.id,
      newPasswordHash
    );

    if (!updatePassword) {
      return res.json({
        ok: false,
        endpoint: req.path,
        error: {
          message: "Something went wrong while updating password, try again!",
          type: "password_change_error",
        },
      });
    }

    return res.json({ ok: true, endpoint: req.path });
  } catch (error) {
    console.log(error);
    return res.status(402).end();
  }
};
