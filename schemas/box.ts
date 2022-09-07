import { z } from "https://deno.land/x/zod@v3.17.9/mod.ts";
import { OccasionSchema } from "./occasion.ts";

const password = z.string();

const BoxSchema = z.object({
  _id: z.string(),
  code: z.string(),
  new: z.boolean(),
  ownerName: z.string(),
  name: z.string(),
  intro: z.string(),
  occasion: OccasionSchema,
  password
});

export const CreateBoxSchema = BoxSchema.omit({_id: true, code: true, new: true});
export const EditBoxSchema = BoxSchema
  .pick({name: true, ownerName: true, intro: true})
  .extend({
    password: password.optional()
  });

export type Box = z.infer<typeof BoxSchema>;
export type CreateBox = z.infer<typeof CreateBoxSchema>;
export type EditBox = z.infer<typeof EditBoxSchema>;
export type BoxWithoutPassword = Omit<Box, 'password'>;
