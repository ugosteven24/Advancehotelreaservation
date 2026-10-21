"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { deleteSession } from "@/lib/session";

// Signs the user out completely:
// 1. removes the server session cookie (what the proxy and getUserId() read)
// 2. signs out of the Firebase client SDK
// Each step runs even if the other fails, so the user is never half signed in.
export async function logout() {
  const results = await Promise.allSettled([
    deleteSession(),
    signOut(auth),
  ]);

  const failed = results.find((result) => result.status === "rejected");

  if (failed) {
    console.error("Logout step failed:", failed.reason);
    throw failed.reason;
  }
}