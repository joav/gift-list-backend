import { z } from "https://deno.land/x/zod@v3.17.9/mod.ts";
import { OccasionSchema } from "./occasion.ts";

export const ListItemSchema = z.object({
  code: z.string(),
  name: z.string(),
  desccription: z.string(),
  url: z.string()
});

export const ListSchema = z.object({
  _id: z.string(),
  code: z.string(),
  new: z.boolean(),
  ownerName: z.string(),
  name: z.string(),
  intro: z.string(),
  occasion: OccasionSchema,
  password: z.string(),
  items: z.array(ListItemSchema).default([]),
  nGifts: z.number().default(0),
  nBoxes: z.number().default(0)
});

export const CreateListSchema = ListSchema.omit({_id: true, code: true, new: true});

export type List = z.infer<typeof ListSchema>;
export type ListItem = z.infer<typeof ListItemSchema>;
export type CreateList = z.infer<typeof CreateListSchema>;
export type ListWithoutPassword = Omit<List, 'password'>;
export type ListCounters = Pick<List, 'nGifts' | 'nBoxes'>;
