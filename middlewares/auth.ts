// deno-lint-ignore-file no-explicit-any
import { Request, Response } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { verifyToken } from "../repositories/auth.ts";
export const auth = async (ctx: {
  request: Request;
  response: Response;
  state: Record<string, any>
}, next: () => Promise<unknown>) => {
  const { request, response } = ctx;
  try {
    const token = request.headers.get('Authorization');
    if (!token) throw new Error('Not token');
    const tokenPayload = await verifyToken(token);
    ctx.state = { tokenPayload };
    await next();
  } catch {
    response.status = 401;
    response.body = {
      success: false,
      msg: "Unauthorized"
    };
  }
}
