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
      <div className="zap-panel-white relative flex min-h-[min(70vh,900px)] w-full max-w-5xl flex-col p-8 sm:p-12 animate-fade-up">
        <header className="mb-6 flex items-start justify-between gap-4 sm:mb-10">
        <div className="inline-flex flex-col items-end">
        <div className="min-[520px]:hidden">
          <ZapLogo size="lg" href={null} />
        </div>
        <div className="hidden min-[520px]:block">
          <ZapLogo size="xl" href={null} />
        </div>
          <p className="mt-1 font-display text-sm font-extrabold tracking-wide text-zap-ink">
            Story Gen
          </p>
        </div>
          <nav className="flex gap-4 font-display text-base font-extrabold sm:gap-6 sm:text-lg">
            <Link href="/login" className="hover:text-zap-red">
              Login
            </Link>
            <Link href="/signup" className="hover:text-zap-red">
              Signup
            </Link>
          </nav>
        </header>

        <div className="grid items-center gap-8 min-[640px]:grid-cols-[1.1fr_1fr]">
          <div className="flex justify-center">
            <BookMascot size="lg" className="max-w-[160px] drop-shadow-md min-[520px]:max-w-[280px]" />
          </div>

          <div className="flex flex-col items-start">
          <h1 className="font-display text-4xl font-bold leading-tight text-zap-red min-[708px]:hidden">
            Write a story!
          </h1>
          <h1 className="hidden font-display text-4xl font-bold leading-tight text-zap-red min-[708px]:block sm:text-5xl">
            Let’s write a story!
          </h1>
          <div
            className="
              mt-4 flex w-full flex-col gap-4
              min-[520px]:max-[639px]:flex-row
              min-[520px]:max-[639px]:items-end
              min-[520px]:max-[639px]:justify-between
              min-[640px]:flex-col
              min-[640px]:items-stretch
            "
          >
            <p className="min-w-0 flex-1 font-body text-lg font-bold leading-snug text-zap-ink sm:text-xl">
              Sign up for an account and get started on your story library.
            </p>
            <button
              type="button"
              className="zap-btn zap-btn-primary shrink-0 self-end whitespace-nowrap px-5 py-2 text-2xl min-[640px]:mt-4"
              onClick={handleZap}
              disabled={!ready}
            >
              {ready && user ? "Zap!" : "Sign Up!"}
            </button>
          </div>
          </div>
        </div>
      </div>
    </main>
  );
}
