import { PasswordSchema, UsernameSchema } from "@/validators";
import { z } from "zod";

export const signInSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
});

export const signUpSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
});

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
