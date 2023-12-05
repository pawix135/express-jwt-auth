import { APIControler } from "@/@types/API";
import {
  UserChangeEmailResponse,
  UserChangePasswordResponse,
  UserChangeSettingsResponse,
  UserChangeUsernameResponse,
} from "@/@types/API/User";
import { prisma } from "@/db/prisma";
import { createPasswordHash } from "@/utils/password";
import { errorResponse } from "@/utils/response";
import {
  UserChangeEmailSchema,
  UserChangePasswordSchema,
  UserChangeSelectedSettingsSchema,
  UserChangeUsernameSchema,
} from "@/validators/api/user/user_validator";

// TODO - Return error if user subbmit same settings
export const POST_CHANGE_SELECTED_SETTINGS: APIControler<
  UserChangeSettingsResponse
> = async (req, res) => {
  try {
    let validate = UserChangeSelectedSettingsSchema.parse(req.body);

    if (Object.keys(validate).length === 0) {
      return res.json({
        ok: false,
        success: false,
        endpoint: req.originalUrl,
        error: {
          message: "No arguments recieved!",
          type: "internal_error",
        },
      });
    }

    let update = [];

    if (validate.password) {
      let hash = await createPasswordHash(validate.password);
      update.push(
        prisma.user.update({
          where: { id: req.context.id },
          data: { hash },
        })
      );
    }

    if (validate.email) {
      update.push(
        prisma.user.update({
          where: { id: req.context.id },
          data: { email: validate.email },
        })
      );
    }

    if (validate.username) {
      update.push(
        prisma.user.update({
          where: { id: req.context.id },
          data: { username: validate.username },
        })
      );
    }

    await prisma.$transaction(update);

    return res.json({ ok: true, success: true });
  } catch (error) {
    return errorResponse<UserChangeSettingsResponse>(
      res,
      { ok: false, success: false },
      error
    );
  }
};

export const POST_CHANGE_EMAIL: APIControler<UserChangeEmailResponse> = async (
  req,
  res
) => {
  try {
    let data = UserChangeEmailSchema.parse(req.body);

    await prisma.user.update({
      data: {
        email: data.email,
      },
      where: {
        id: req.context.id,
      },
    });

    return res.json({ ok: true, success: true });
  } catch (error) {
    return errorResponse<UserChangeEmailResponse>(
      res,
      {
        ok: false,
        success: false,
      },
      error
    );
  }
};

export const POST_CHANGE_USERNAME: APIControler<
  UserChangeUsernameResponse
> = async (req, res) => {
  try {
    let { username } = UserChangeUsernameSchema.parse(req.body);

    await prisma.user.update({
      data: {
        username,
      },
      where: {
        id: req.context.id,
      },
    });

    return res.json({ ok: true, success: true });
  } catch (error) {
    return errorResponse<UserChangeUsernameResponse>(
      res,
      {
        ok: false,
        success: false,
      },
      error
    );
  }
};

export const POST_CHANGE_PASSWORD: APIControler<
  UserChangePasswordResponse
> = async (req, res) => {
  try {
    let { password } = UserChangePasswordSchema.parse(req.body);

    let newPasswordHash = await createPasswordHash(password);

    await prisma.user.update({
      where: { id: req.context.id },
      data: {
        hash: newPasswordHash,
      },
    });

    return res.json({ ok: true, success: true });
  } catch (error) {
    return errorResponse<UserChangePasswordResponse>(
      res,
      { ok: false, success: false },
      error
    );
  }
};
