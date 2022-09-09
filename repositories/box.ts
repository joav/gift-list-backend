import { deleteMany, executeAggregate, findOne, insertOne, updateOne } from "../db.ts";
import { Box, BoxCounters, BoxWithoutPassword, CreateBox, EditBox } from "../schemas/box.ts";
import { createHash } from "../utils/passwords.ts";
import * as R from "https://deno.land/x/ramda@v0.27.2/mod.ts";
import { generateUID } from "../utils/generate-uid.ts";
import { CompleteListBox, CreateListBox, ListBox } from "../schemas/list-in-box.ts";

const COLLECTION = "boxes";
const LIST_BOX_COLLECTION = "lists-box";

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

export async function createList(boxCode: string, listToAdd: CreateListBox): Promise<ListBox> {
  const _id = await insertOne(LIST_BOX_COLLECTION, {...listToAdd, boxCode});

  return {
    _id,
    boxCode,
    ...listToAdd
  };
}

export async function updateCounters(code: string, counters: BoxCounters): Promise<number> {
  return await updateOne(COLLECTION, { code }, {
    $inc: counters
  });
}

export async function getListsBox(boxCode: string): Promise<CompleteListBox[]> {
  return await executeAggregate(LIST_BOX_COLLECTION, [
    {
      "$match": {
        boxCode
      }
    }, {
      "$lookup": {
        "from": "lists", 
        "localField": "listCode", 
        "foreignField": "code", 
        "as": "list"
      }
    }, {
      "$unwind": "$list"
    }
  ]);
}

export async function listBoxExists(boxCode: string, listCode: string): Promise<boolean> {
  return !!(await findOne(LIST_BOX_COLLECTION, {filter: {boxCode, listCode}}));
}
