"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookMascot, ZapLogo } from "@/components/Brand";
import { useAuth } from "@/components/providers/AuthProvider";

/**
 * Landing page — comic hero from landing-page-mockup.png.
 * Zap! CTA goes to signup (or dashboard if already signed in).
 */
export default function LandingPage() {
  const { user, ready } = useAuth();
  const router = useRouter();

  function handleZap() {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      <div className="zap-panel-white relative w-full max-w-4xl p-6 sm:p-10 animate-fade-up">
        <header className="mb-6 flex items-start justify-between gap-4 sm:mb-10">
          <div>
            <ZapLogo size="lg" href={null} />
            <p className="mt-1 font-body text-sm font-extrabold tracking-wide text-zap-ink">
              Story Gen
            </p>
          </div>
          <nav className="flex gap-4 font-body text-base font-extrabold sm:gap-6 sm:text-lg">
            <Link href="/login" className="hover:text-zap-red">
              Login
            </Link>
            <Link href="/signup" className="hover:text-zap-red">
              Signup
            </Link>
          </nav>
        </header>

        <div className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr]">
          <div className="flex justify-center">
            <BookMascot size="lg" className="max-w-[260px] drop-shadow-md sm:max-w-[300px]" />
          </div>

          <div className="flex flex-col items-start">
            <h1 className="font-display text-4xl leading-tight text-zap-red sm:text-5xl">
              Let’s write a story!
            </h1>
            <p className="mt-4 max-w-md font-body text-lg font-bold leading-snug text-zap-ink sm:text-xl">
              Sign up for an account and we’ll get started on your story-lesson library.
            </p>

            <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:items-end">
              <button
                type="button"
                className="zap-btn zap-btn-primary self-end"
                onClick={handleZap}
                disabled={!ready}
              >
                Zap!
              </button>
              <p className="text-right font-body text-xs text-zap-muted">
                {ready && user
                  ? "You’re signed in — Zap! opens your dashboard."
                  : "Zap! takes you to create an account."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
