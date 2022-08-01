import { z } from "https://deno.land/x/zod@v3.17.9/mod.ts";
import { OccasionSchema } from "./occasion.ts";

const ListSchema = z.object({
  _id: z.string(),
  code: z.string(),
  ownerName: z.string(),
  name: z.string(),
  intro: z.string(),
  occasion: OccasionSchema,
  password: z.string()
});

export const CreateListSchema = ListSchema.omit({_id: true, code: true});

export type List = z.infer<typeof ListSchema>;
export type CreateList = z.infer<typeof CreateListSchema>;
export type ListWithoutPassword = Omit<List, 'password'>;
