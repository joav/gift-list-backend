import { z } from "https://deno.land/x/zod@v3.17.9/mod.ts";
import { OccasionSchema } from "./occasion.ts";

const BoxSchema = z.object({
  _id: z.string(),
  code: z.string(),
  ownerName: z.string(),
  name: z.string(),
  intro: z.string(),
  occasion: OccasionSchema,
  password: z.string()
});

export const CreateBoxSchema = BoxSchema.omit({_id: true, code: true});

export type Box = z.infer<typeof BoxSchema>;
export type CreateBox = z.infer<typeof CreateBoxSchema>;
export type BoxWithoutPassword = Omit<Box, 'password'>;
