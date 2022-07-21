import { Request, Response } from "https://deno.land/x/oak@v10.6.0/mod.ts";
export const bodyRequired = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}, next: () => Promise<unknown>) => {
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      msg: "No Data"
    };
    return;
  }
  await next();
}
