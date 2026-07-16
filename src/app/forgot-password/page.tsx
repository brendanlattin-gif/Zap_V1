"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { AuthPageShell } from "@/components/AuthPageShell";
import { useAuth } from "@/components/providers/AuthProvider";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    const result = await resetPassword(email);
    if (result.error) {
      setError(result.error);
      setBusy(false);
      return;
    }
    setSent(true);
    setBusy(false);
  }

  return (
    <AuthPageShell
      activeNav="forgot"
      title="Forgot password"
      subtitle="Enter your email and we’ll send a reset link."
    >
      {sent ? (
        <div className="flex flex-col gap-4">
          <p className="rounded-lg bg-zap-cream-deep px-3 py-2 font-body text-sm font-semibold text-zap-muted">
            If an account exists for that email, a reset link is on its way. Check
            your inbox (and spam folder).
          </p>
          <Link href="/login" className="font-body text-sm font-bold text-zap-red underline">
            Back to login
          </Link>
        </div>
      ) : (
        <>
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
              {busy ? "Sending…" : "Send reset link"}
            </button>
          </form>

          <div className="mt-5 font-body text-sm font-bold">
            <Link href="/login" className="text-zap-red underline">
              Back to login
            </Link>
          </div>
        </>
      )}
    </AuthPageShell>
  );
}
