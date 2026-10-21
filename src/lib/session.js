"use server";

// Server Actions: client components (like the login page) can import and
// await these directly, but the code only ever runs on the server.
// Note: a "use server" file may only export async functions.

import { cookies } from "next/headers";
import { adminAuth } from "@/lib/admin";
import {
  SESSION_COOKIE,
  SEVEN_DAYS,
  ONE_DAY,
  createSessionToken,
  verifySessionToken,
} from "@/lib/session-token";

// WRITE the user's id into the session cookie.
// The login page passes the Firebase ID token; the server verifies it and
// stores the verified uid. A client can never choose which id is written.
export async function createSession(idToken, remember = true) {
  try {
    if (typeof idToken !== "string" || !idToken) {
      return { ok: false, message: "Missing ID token." };
    }

    const decoded = await adminAuth.verifyIdToken(idToken);

    // Only accept a token from a sign-in that just happened.
    if (Date.now() / 1000 - decoded.auth_time > 5 * 60) {
      return { ok: false, message: "Please sign in again." };
    }

    const keep = remember !== false;
    const seconds = keep ? SEVEN_DAYS : ONE_DAY;
    const token = await createSessionToken(decoded.uid, seconds);
    const cookieStore = await cookies();

    cookieStore.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // No maxAge = cleared when the browser closes.
      ...(keep ? { maxAge: seconds } : {}),
    });

    return { ok: true, userId: decoded.uid };
  } catch (error) {
    console.error("Session creation failed:", error);
    return { ok: false, message: "Unable to create session." };
  }
}

// READ the session. Returns { userId } or null.
export async function getSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

// READ just the user id. Returns the id string or null.
export async function getUserId() {
  const session = await getSession();
  return session?.userId ?? null;
}

// Remove the session cookie (logout).
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}