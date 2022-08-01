import { z } from "https://deno.land/x/zod@v3.17.9/mod.ts";

export const OccasionSchema = z.enum(["christmas", "another"]);

export type Occasion = z.infer<typeof OccasionSchema>;
