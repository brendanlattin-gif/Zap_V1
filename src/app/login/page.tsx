"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookMascot, ZapLogo } from "@/components/Brand";
import { useAuth } from "@/components/providers/AuthProvider";

/**
 * Shared shell for Login / Signup / Forgot Password pages.
 * Forms are visual only in Slice 1 — real Supabase auth comes later.
 */
function AuthShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="zap-panel w-full max-w-md p-6 sm:p-8 animate-fade-up">
        <div className="mb-6 flex items-center justify-between">
          <BookMascot size="sm" />
          <ZapLogo size="sm" />
        </div>
        <h1 className="mb-5 font-display text-3xl text-zap-ink">{title}</h1>
        {children}
      </div>
    </main>
  );
}

function StubNote() {
  return (
    <p className="mt-4 rounded-lg bg-zap-cream-deep px-3 py-2 font-body text-xs font-semibold text-zap-muted">
      Real email login is not wired yet. Use <strong>Enter as teacher</strong> for Slice 1.
    </p>
  );
}

export default function LoginPage() {
  const { enterAsTeacher } = useAuth();
  const router = useRouter();

  function enter() {
    enterAsTeacher();
    router.push("/dashboard");
  }

  return (
    <AuthShell title="Login">
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          enter();
        }}
      >
        <label className="font-body text-sm font-bold">
          Email
          <input className="zap-input mt-1" type="email" placeholder="you@school.edu" disabled />
        </label>
        <label className="font-body text-sm font-bold">
          Password
          <input className="zap-input mt-1" type="password" placeholder="••••••••" disabled />
        </label>
        <button type="button" className="zap-btn zap-btn-primary mt-2" onClick={enter}>
          Enter as teacher
        </button>
      </form>
      <StubNote />
      <div className="mt-5 flex flex-wrap gap-4 font-body text-sm font-bold">
        <Link href="/signup" className="text-zap-red underline">
          Create account
        </Link>
        <Link href="/forgot-password" className="text-zap-muted underline">
          Forgot password?
        </Link>
        <Link href="/" className="text-zap-muted underline">
          Back
        </Link>
      </div>
    </AuthShell>
  );
}
