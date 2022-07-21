import { Request } from "https://deno.land/x/oak@v10.6.0/mod.ts";

export async function getBody(request: Request) {
  return await(await request.body()).value;
}
