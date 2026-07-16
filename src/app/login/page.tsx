"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AuthPageShell } from "@/components/AuthPageShell";
import { useAuth } from "@/components/providers/AuthProvider";

export default function LoginPage() {
  const { signIn, user, ready } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (ready && user) {
      router.replace("/dashboard");
    }
  }, [ready, user, router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    const result = await signIn(email, password);
    if (result.error) {
      setError(result.error);
      setBusy(false);
      return;
    }
    router.push("/dashboard");
  }

  return (
    <AuthPageShell
      activeNav="login"
      title="Welcome back!"
      subtitle="Log in to continue your classroom stories."
    >
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="font-body text-sm font-bold">
          Email
          <input
            className="zap-input mt-1"
            type="email"
            autoComplete="email"
            placeholder="you@school.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={busy}
          />
        </label>
        <label className="font-body text-sm font-bold">
          Password
          <input
            className="zap-input mt-1"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={busy}
          />
        </label>

        {error && (
          <p className="font-body text-sm font-bold text-zap-red" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="zap-btn zap-btn-primary mt-2 self-end"
          disabled={busy}
        >
          {busy ? "Logging in…" : "Log in"}
        </button>
      </form>

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
    </AuthPageShell>
  );
}
