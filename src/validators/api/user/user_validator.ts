import { z } from "zod";

export const UserChangeEmailSchema = z.object({
  email: z.string().email(),
});

export const UserChangeUsernameSchema = z.object({
  username: z.string(),
});

export const UserChangePasswordSchema = z.object({
  password: z.string(),
});
