import { Request, Response } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { create, clearList, getByCode } from "../repositories/list.ts";
import { getBody } from "../utils/get-body.ts";
import { CreateListSchema } from "../schemas/list.ts";
import { ZodError } from "https://deno.land/x/zod@v3.17.9/ZodError.ts";
import { ResponseBody } from "../models/response-body.ts";

export const addList = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}) => {
  let status = 201;
  const responseBody: ResponseBody = {
    success: true
  };
  try {
    const body = await getBody(request);
    const box = CreateListSchema.parse(body);
    
    responseBody.data = clearList(await create(box));
  } catch (err) {
    console.log(err);
    responseBody.success = false;
    status = 500;
    responseBody.msg = err.toString();
    if (err instanceof ZodError) {
      status = 400;
      responseBody.msg = "Invalid Body";
    }
  }
  response.status = status;
  response.body = responseBody;
};

export const getList = async ({
  params: { code },
  response,
}: {
  params: {code: string};
  response: Response;
}) => {
  let status = 200;
  const responseBody: ResponseBody = {
    success: true
  };
  try {
    responseBody.data = clearList(await getByCode(code));
    if (!responseBody.data) {
      status = 404;
      responseBody.success = false;
      responseBody.msg = "Not Found";
    }
  } catch (err) {
    console.log(err);
    responseBody.success = false;
    status = 500;
    responseBody.msg = err.toString();
  }
  response.status = status;
  response.body = responseBody;
};
