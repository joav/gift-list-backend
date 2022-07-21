import "https://deno.land/x/dotenv@v3.2.0/load.ts";
import { create, verify, getNumericDate, Header, Payload } from "https://deno.land/x/djwt@v2.7/mod.ts";
import { AuthError } from "../errors/auth.ts";
import { Auth } from "../schemas/auth.ts";
import { isValidPassword } from "../utils/passwords.ts";
import * as boxRepository from "./box.ts";
import * as listRepository from "./list.ts";

const rawKey = new TextEncoder().encode(Deno.env.get('JWT_SECRET'))

const key = await crypto.subtle.importKey(
  "raw",
  rawKey,
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
)

const header: Header = {
  alg: "HS512",
  typ: "JWT",
};

export const createToken = async (auth: Auth): Promise<{token: string}> => {
  let hash = "";
  switch (auth.type) {
    case 'box': {
      const box = await boxRepository.getByCode(auth.code);
      if (box) {
        hash = box.password;
      }
      break;
    }
    case 'list': {
      const list = await listRepository.getByCode(auth.code);
      if (list) {
        hash = list.password;
      }
      break;
    }
    default:
      throw new Error("Invalid token type");
  }

  if (!hash || !(await isValidPassword(auth.password, hash))){
    throw new AuthError("Auth error");
  }

  const token = await generateToken(auth);

  return {token};
}

export const verifyToken = (token: string) => verify(token, key);

const generateToken = (auth: Auth) => {
  const payload: Payload = {
    sub: auth.code,
    exp: getNumericDate(60 * 60),
    iat: getNumericDate(new Date),
    typ: auth.type
  };

  return create(
    header,
    payload,
    key
  );
}
