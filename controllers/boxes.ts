import { Request } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { create, clearBox, getByCode, deleteAll, edit, createList, listBoxExists } from "../repositories/box.ts";
import { getByCode as getListByCode } from "../repositories/list.ts";
import { getBody } from "../utils/get-body.ts";
import { CreateBoxSchema, EditBoxSchema } from "../schemas/box.ts";
import { TryCatchWrapper } from "../decorators/try-catch-wrapper.ts";
import { NotFoundError } from "../errors/not-found.ts";
import { BOX_LIST_ADDED } from "../event-bus/events/index.ts";
import { CreateListBoxSchema } from "../schemas/list-in-box.ts";
import { AggregationError } from "../errors/aggregation.ts";

class Controller {
  @TryCatchWrapper(201)
  async addBox({
    request,
  }: {
    request: Request;
  }) {
    const body = await getBody(request);
    const box = CreateBoxSchema.parse(body);
    
    return clearBox(await create(box));
  }
  
  @TryCatchWrapper(200)
  async getBox({
    params: { code }
  }: {
    params: {code: string};
  }) {
    const data = clearBox(await getByCode(code));
    if (!data) {
      throw new NotFoundError();
    }
    return data;
  }
  
  @TryCatchWrapper(200)
  async editBox({
    params: { code },
    request,
  }: {
    params: {code: string};
    request: Request;
  }) {
    const body = await getBody(request);
    const box = EditBoxSchema.parse(body);
    
    return await edit(code, box);
  }
  
  @TryCatchWrapper(200)
  async deleteAllBoxes() {
    return await deleteAll();
  }

  @TryCatchWrapper(200)
  async addList({
    params: { code: boxCode },
    request,
  }: {
    params: {code: string};
    request: Request;
  }) {
    const body = await getBody(request);
    const listToAdd = CreateListBoxSchema.parse(body);

    const list = await getListByCode(listToAdd.listCode);

    if (!list) throw new AggregationError("List not found");

    if (await listBoxExists(boxCode, listToAdd.listCode)) throw new AggregationError("List Box Exists");
    
    
    const listBox = await createList(boxCode, listToAdd);

    BOX_LIST_ADDED.dispatch({
      boxCode,
      listCode: listToAdd.listCode
    });

    return listBox;
  }
}

export default new Controller();
