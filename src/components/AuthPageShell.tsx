import Link from "next/link";
import { BookMascot, ZapLogo } from "@/components/Brand";

type AuthNav = "login" | "signup" | "forgot";

/**
 * Shared comic-panel layout for Login / Signup / Forgot password —
 * matches the landing page: large white card, logo header, mascot + form.
 */
export function AuthPageShell({
  activeNav,
  title,
  subtitle,
  children,
}: {
  activeNav: AuthNav;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      <div className="zap-panel-white relative w-full max-w-4xl p-6 sm:p-10 animate-fade-up">
        <header className="mb-6 flex items-start justify-between gap-4 sm:mb-10">
          <div>
            <ZapLogo size="lg" href="/" />
            <p className="mt-1 font-body text-sm font-extrabold tracking-wide text-zap-ink">
              Story Gen
            </p>
          </div>
          <nav className="flex gap-4 font-body text-base font-extrabold sm:gap-6 sm:text-lg">
            <Link
              href="/login"
              className={
                activeNav === "login" ? "text-zap-red" : "hover:text-zap-red"
              }
            >
              Login
            </Link>
            <Link
              href="/signup"
              className={
                activeNav === "signup" ? "text-zap-red" : "hover:text-zap-red"
              }
            >
              Signup
            </Link>
          </nav>
        </header>

        <div className="grid items-center gap-8 md:grid-cols-[1.1fr_1fr]">
          <div className="flex justify-center">
            <BookMascot
              size="lg"
              className="max-w-[220px] drop-shadow-md sm:max-w-[280px]"
            />
          </div>

          <div className="flex w-full flex-col items-stretch">
            <h1 className="font-display text-3xl leading-tight text-zap-red sm:text-4xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 max-w-md font-body text-base font-bold leading-snug text-zap-ink sm:text-lg">
                {subtitle}
              </p>
            )}
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
