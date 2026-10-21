// Edge-safe: only depends on `jose`. Safe to import from middleware.
import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "session";
export const SEVEN_DAYS = 60 * 60 * 24 * 7;
export const ONE_DAY = 60 * 60 * 24;

// Read lazily so a missing variable can't crash the build or an import.
function getKey() {
  const secret = process.env.SESSION_SECRET; // server-only: no NEXT_PUBLIC_ prefix
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET is missing or shorter than 32 characters.");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(userId, seconds = SEVEN_DAYS) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${seconds}s`)
    .sign(getKey());
}

export async function verifySessionToken(token) {
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getKey(), {
      algorithms: ["HS256"],
    });

    return typeof payload.userId === "string"
      ? { userId: payload.userId }
      : null;
  } catch {
    return null;
  }
}