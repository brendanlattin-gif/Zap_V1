"use client";

/**
 * AuthProvider — Slice 1 stub session for the whole app.
 * Later: swap internals to Supabase Auth; keep the same React context shape.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getStubSession,
  signInAsTeacher,
  signOutStub,
} from "@/lib/auth/stub-auth";
import type { StubUser } from "@/lib/types";

type AuthContextValue = {
  user: StubUser | null;
  /** False until we have read localStorage (avoids flash on protected pages). */
  ready: boolean;
  enterAsTeacher: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<StubUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getStubSession());
    setReady(true);
  }, []);

  const enterAsTeacher = useCallback(() => {
    setUser(signInAsTeacher());
  }, []);

  const signOut = useCallback(() => {
    signOutStub();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, ready, enterAsTeacher, signOut }),
    [user, ready, enterAsTeacher, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
