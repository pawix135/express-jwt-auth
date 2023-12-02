import { z } from "zod";

export const signInSchema = z.object({
  username: z.string({
    description: "Username",
    required_error: "Username required!",
  }),
  password: z.string(),
});

export const signUpSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
