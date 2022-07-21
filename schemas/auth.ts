import { z } from "https://deno.land/x/zod@v3.17.9/mod.ts";

export const AuthSchema = z.object({
  code: z.string(),
  password: z.string(),
  type: z.enum(['box', 'list'])
});

export type Auth = z.infer<typeof AuthSchema>;
