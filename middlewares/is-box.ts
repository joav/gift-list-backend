// deno-lint-ignore-file
import { Response } from "https://deno.land/x/oak@v10.6.0/mod.ts";
export const isBox = async ({
  params,
  response,
  state: {tokenPayload}
}: {
  params: {code: string};
  response: Response;
  state: {tokenPayload: {typ: string, sub: string}}
}, next: () => Promise<unknown>) => {
  if (
    tokenPayload
    && tokenPayload.typ === 'box'
    && params.code === tokenPayload.sub) {
    await next();
  } else {
    response.status = 403;
    response.body = {
      success: false,
      msg: "Access Deny"
    };
  }
}
