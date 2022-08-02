import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

export const createHash = (password: string) => new Promise<string>((res) => {
  res(bcrypt.hashSync(password));
});

export const isValidPassword = (password: string, hash: string) => new Promise<boolean>((res) => {
  res(bcrypt.compareSync(password, hash));
});
