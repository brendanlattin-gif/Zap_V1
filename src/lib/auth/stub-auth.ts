/**
 * Stub authentication for Slice 1.
 *
 * Real Supabase auth will replace this later. We keep a tiny AuthUser shape
 * and a stable API (getSession / signInAsTeacher / signOut) so UI code
 * does not need a rewrite when we plug in the real provider.
 */

import type { StubUser } from "@/lib/types";

const AUTH_STORAGE_KEY = "zap.stubAuth.v1";

/** Fake teacher used by "Enter as teacher" / landing Zap! CTA. */
export const STUB_TEACHER: StubUser = {
  id: "stub-teacher-1",
  displayName: "Teacher",
  email: "teacher@zap.local",
};

/** Read the stub session from localStorage (browser only). */
export function getStubSession(): StubUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StubUser;
  } catch {
    return null;
  }
}

/** Put the teacher into an "authed-looking" state. */
export function signInAsTeacher(): StubUser {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(STUB_TEACHER));
  }
  return STUB_TEACHER;
}

/** Clear stub session. */
export function signOutStub(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}
