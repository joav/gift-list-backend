import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts";

export const createHash = (password: string) => bcrypt.hash(password);

export const isValidPassword = (password: string, hash: string) => bcrypt.compare(password, hash);
