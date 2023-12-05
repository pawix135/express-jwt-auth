import { EmailSchema, PasswordSchema, UsernameSchema } from "@/validators";
import { z } from "zod";

export const UserChangeEmailSchema = z.object({
  email: EmailSchema,
});

export const UserChangeUsernameSchema = z.object({
  username: UsernameSchema,
});

export const UserChangePasswordSchema = z.object({
  password: PasswordSchema,
});

export const UserChangeSelectedSettingsSchema = z.object({
  username: UsernameSchema.optional(),
  password: PasswordSchema.optional(),
  email: EmailSchema.optional(),
});
