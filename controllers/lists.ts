import { Request } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { create, clearList, getByCode, deleteAll } from "../repositories/list.ts";
import { getBody } from "../utils/get-body.ts";
import { CreateListSchema } from "../schemas/list.ts";
import { TryCatchWrapper } from "../decorators/try-catch-wrapper.ts";
import { NotFoundError } from "../errors/not-found.ts";

class Controller {
  @TryCatchWrapper(201)
  async addList({
    request,
  }: {
    request: Request;
  }) {
    const body = await getBody(request);
    const box = CreateListSchema.parse(body);
    
    return clearList(await create(box));
  }
  
  @TryCatchWrapper(200)
  async getList({
    params: { code },
  }: {
    params: {code: string};
  }) {
    const data = clearList(await getByCode(code));
    if (!data) throw new NotFoundError();
    return data;
  }
  
  @TryCatchWrapper(200)
  async deleteAllLists() {
    return await deleteAll();
  }
}

export default new Controller();
