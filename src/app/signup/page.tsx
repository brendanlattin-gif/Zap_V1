"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AuthPageShell } from "@/components/AuthPageShell";
import { useAuth } from "@/components/providers/AuthProvider";

export default function SignupPage() {
  const { signUp, user, ready } = useAuth();
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
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
    setInfo(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setBusy(false);
      return;
    }

    const result = await signUp(email, password, displayName);
    if (result.error) {
      setError(result.error);
      setBusy(false);
      return;
    }

    if (result.needsEmailConfirmation) {
      setInfo(
        "Check your email to confirm your account, then come back and log in."
      );
      setBusy(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <AuthPageShell
      activeNav="signup"
      title="Create your account"
      subtitle="Sign up and we’ll get started on your story-lesson library."
    >
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="font-body text-sm font-bold">
          Name
          <input
            className="zap-input mt-1"
            type="text"
            autoComplete="name"
            placeholder="Ms. Rivera"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            disabled={busy}
          />
        </label>
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
            autoComplete="new-password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={busy}
          />
        </label>

        {error && (
          <p className="font-body text-sm font-bold text-zap-red" role="alert">
            {error}
          </p>
        )}
        {info && (
          <p className="rounded-lg bg-zap-cream-deep px-3 py-2 font-body text-sm font-semibold text-zap-muted">
            {info}
          </p>
        )}

        <button
          type="submit"
          className="zap-btn zap-btn-primary mt-2 self-end"
          disabled={busy}
        >
          {busy ? "Signing up…" : "Sign up"}
        </button>
      </form>

      <div className="mt-5 flex flex-wrap gap-4 font-body text-sm font-bold">
        <Link href="/login" className="text-zap-red underline">
          Already have an account?
        </Link>
        <Link href="/" className="text-zap-muted underline">
          Back
        </Link>
      </div>
    </AuthPageShell>
  );
}
