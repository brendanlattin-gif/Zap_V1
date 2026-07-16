import Link from "next/link";
import { BookMascot, ZapLogo } from "@/components/Brand";

/** Forgot-password page shell — no email flow in Slice 1. */
export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="zap-panel w-full max-w-md p-6 sm:p-8 animate-fade-up">
        <div className="mb-6 flex items-center justify-between">
          <BookMascot size="sm" />
          <ZapLogo size="sm" />
        </div>
        <h1 className="mb-5 font-display text-3xl text-zap-ink">Forgot password</h1>
        <label className="font-body text-sm font-bold">
          Email
          <input className="zap-input mt-1" type="email" placeholder="you@school.edu" disabled />
        </label>
        <button type="button" className="zap-btn zap-btn-primary mt-4 w-full" disabled>
          Send reset link
        </button>
        <p className="mt-4 rounded-lg bg-zap-cream-deep px-3 py-2 font-body text-xs font-semibold text-zap-muted">
          Password reset will arrive with real Supabase auth. For Slice 1, go back and use Enter as
          teacher.
        </p>
        <div className="mt-5 font-body text-sm font-bold">
          <Link href="/login" className="text-zap-red underline">
            Back to login
          </Link>
        </div>
      </div>
    </main>
  );
}
