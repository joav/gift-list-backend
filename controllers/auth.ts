import { Request, Response } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { ZodError } from "https://deno.land/x/zod@v3.17.9/ZodError.ts";
import { AuthError } from "../errors/auth.ts";
import { ResponseBody } from "../models/response-body.ts";
import { createToken } from "../repositories/auth.ts";
import { AuthSchema } from "../schemas/auth.ts";
import { getBody } from "../utils/get-body.ts";
import { Logger } from "../utils/logger.ts";

const logger = new Logger("AuthController");

export const login = async ({
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
    const data = AuthSchema.parse(body);
    
    responseBody.data = await createToken(data);
  } catch (err) {
    logger.errorWithChannel('login', err);
    responseBody.success = false;
    status = 500;
    responseBody.msg = err.toString();
    if (err instanceof ZodError) {
      status = 400;
      responseBody.msg = "Invalid Body";
    }
    if (err instanceof AuthError) {
      status = 401;
    }
  }
  response.status = status;
  response.body = responseBody;
};
