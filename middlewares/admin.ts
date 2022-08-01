import { Request, Response } from "https://deno.land/x/oak@v10.6.0/mod.ts";
export const admin = async ({
  request,
  response,
}: {
  request: Request;
  response: Response;
}, next: () => Promise<unknown>) => {
  try {
    const token = request.headers.get('Authorization');
    if (!token) throw new Error('Not token');
    if (Deno.env.get('ADMIN_KEY') !== token) throw "NO ADMIN";
    await next();
  } catch {
    response.status = 401;
    response.body = {
      success: false,
      msg: "Unauthorized"
    };
  }
}
