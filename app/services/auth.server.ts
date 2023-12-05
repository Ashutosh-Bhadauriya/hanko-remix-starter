import { parse } from "cookie";
import { jwtVerify, createRemoteJWKSet } from "jose";

const hankoApiUrl = process.env.HANKO_API_URL;

export async function validateJwtAndFetchUserId(request: Request) {
  const cookies = parse(request.headers.get("Cookie") || "");
  const token = cookies.hanko;

  if (!token) {
    return null;
  }

  const JWKS = createRemoteJWKSet(
    new URL(`${hankoApiUrl}/.well-known/jwks.json`)
  );
  let payload;

  try {
    const verifiedJWT = await jwtVerify(token, JWKS);
    payload = verifiedJWT.payload;
  } catch {
    return null;
  }

  const userID = payload.sub;

  if (!userID) {
    return null;
  }

  return userID;
}
