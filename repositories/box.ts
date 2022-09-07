import { deleteMany, findOne, insertOne, updateOne } from "../db.ts";
import { Box, BoxWithoutPassword, CreateBox, EditBox } from "../schemas/box.ts";
import { createHash } from "../utils/passwords.ts";
import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts";
import { generateUID } from "../utils/generate-uid.ts";

const COLLECTION = "boxes";

export const clearBox = (box: Box | null): BoxWithoutPassword => box ? R.omit(['password'], box) : null;

export async function create(box: CreateBox): Promise<Box> {
  const code = generateUID();
  const _id = await insertOne(COLLECTION, {
    ...box,
    code,
    new: true,
    password: await createHash(box.password)
  });

  return {
    _id,
    code,
    new: true,
    ...box
  };
}

export async function getByCode(code: string): Promise<Box | null> {
  return await findOne<Box>(COLLECTION, {filter: { code }});
}

export function deleteAll(): Promise<number> {
  return deleteMany(COLLECTION, {});
}

export async function edit(code: string, box: EditBox): Promise<number> {
  const editBox = box.password ? {
    ...box,
    password: await createHash(box.password)
  } : box;
  return await updateOne(COLLECTION, { code }, {
    $set: editBox
  });
}
