// deno-lint-ignore-file no-explicit-any
import { ZodError } from "https://deno.land/x/zod@v3.17.9/ZodError.ts";
import { NotFoundError } from "../errors/not-found.ts";
import { ResponseBody } from "../models/response-body.ts";

export const TryCatchWrapper = (defaultStatus: number, ) => (_target: any, _key: any, descriptor: any) => {
  const fn = descriptor.value;
  descriptor.value = async (...args: any[]) => {
    let status = defaultStatus;
    const responseBody: ResponseBody = {
      success: true
    };
    try {
      responseBody.data = await fn.apply(this, args);
    } catch (err) {
      console.log(err);
      responseBody.success = false;
      status = 500;
      responseBody.msg = err.toString();
      if (err instanceof NotFoundError) {
        status = 404;
        responseBody.success = false;
        responseBody.msg = "Not Found";
      }
      if (err instanceof ZodError) {
        status = 400;
        responseBody.msg = "Invalid Body";
      }
    }

    args[0].response.status = status;
    args[0].response.body = responseBody;
  };
};
