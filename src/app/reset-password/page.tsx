"use client";

/**
 * Password reset landing page — opened from the Supabase email link.
 * The session is already established via the recovery token in the URL.
 */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthPageShell } from "@/components/AuthPageShell";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError(null);

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setBusy(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      setBusy(false);
      return;
    }
    setDone(true);
    setBusy(false);
    setTimeout(() => router.push("/dashboard"), 1500);
  }

  return (
    <AuthPageShell
      activeNav="forgot"
      title="Choose a new password"
      subtitle="You’re almost back in — pick a new password for your account."
    >
      {done ? (
        <p className="font-body text-base font-bold text-zap-ink">
          Password updated! Taking you to the dashboard…
        </p>
      ) : (
        <>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <label className="font-body text-sm font-bold">
              New password
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
            <label className="font-body text-sm font-bold">
              Confirm password
              <input
                className="zap-input mt-1"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
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

            <button
              type="submit"
              className="zap-btn zap-btn-primary mt-2 self-end"
              disabled={busy}
            >
              {busy ? "Saving…" : "Update password"}
            </button>
          </form>

          <div className="mt-5 font-body text-sm font-bold">
            <Link href="/login" className="text-zap-muted underline">
              Back to login
            </Link>
          </div>
        </>
      )}
    </AuthPageShell>
  );
}
