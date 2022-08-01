import { deleteMany, findOne, insertOne } from "../db.ts";
import { List, ListWithoutPassword, CreateList } from "../schemas/list.ts";
import { createHash } from "../utils/passwords.ts";
import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts";
import { generateUID } from "../utils/generate-uid.ts";

const COLLECTION = "lists";

export const clearList = (box: List | null): ListWithoutPassword => box ? R.omit(['password'], box) : null;

export async function create(box: CreateList): Promise<List> {
  const code = generateUID();
  const _id = await insertOne(COLLECTION, {
    ...box,
    code,
    password: await createHash(box.password)
  });

  return {
    _id,
    code,
    ...box  
  };
}

export async function getByCode(code: string): Promise<List | null> {
  return await findOne<List>(COLLECTION, {filter: { code }});
}

export function deleteAll(): Promise<number> {
  return deleteMany(COLLECTION, {});
}
