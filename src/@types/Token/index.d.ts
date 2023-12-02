import { z } from "zod";

export const TokenSchema = z.object({
  id: z.number(),
  username: z.string(),
});

export type Token = z.infer<typeof TokenSchema>;
