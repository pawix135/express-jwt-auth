import { z } from "zod";

export const UserChangeEmailSchema = z.object({
  email: z.string().email(),
});
