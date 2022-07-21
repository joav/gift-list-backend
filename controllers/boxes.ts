import { Request, Response } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { create, clearBox, getByCode } from "../repositories/box.ts";
import { getBody } from "../utils/get-body.ts";
import { CreateBoxSchema } from "../schemas/box.ts";
import { ZodError } from "https://deno.land/x/zod@v3.17.9/ZodError.ts";
import { ResponseBody } from "../models/response-body.ts";

export const addBox = async ({
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
    const box = CreateBoxSchema.parse(body);
    
    responseBody.data = clearBox(await create(box));
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

export const getBox = async ({
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
    responseBody.data = clearBox(await getByCode(code));
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
