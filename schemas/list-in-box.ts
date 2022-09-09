import { z } from "https://deno.land/x/zod@v3.17.9/index.ts";
import { ListSchema } from "./list.ts";

const ListBoxSchema = z.object({
  _id: z.string(),
  boxCode: z.string(),
  listCode: z.string(),
  gifts: z.array(z.string()).default([]),
  showName: z.boolean()
});

export const CreateListBoxSchema = ListBoxSchema.omit({_id: true, boxCode: true});
export const CompleteListBoxSchema = ListBoxSchema.extend({list: ListSchema})

export type ListBox = z.infer<typeof ListBoxSchema>;
export type CreateListBox = z.infer<typeof CreateListBoxSchema>;
export type CompleteListBox = z.infer<typeof CompleteListBoxSchema>;
