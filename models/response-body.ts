// deno-lint-ignore no-explicit-any
export type ResponseBody<T = any> = {
  success: boolean;
  data?: T;
  msg?: string;
}
