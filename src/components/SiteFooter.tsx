"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

/** Cream footer aligned to teacher page content width (matches max-w-6xl headers). */
export function SiteFooter() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  if (!user) return null;

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <footer className="w-full px-4 sm:px-6">
      <div className="zap-site-footer mx-auto w-full max-w-6xl">
        <div className="flex justify-end py-4 pl-4 pr-[1.625rem] sm:pl-6 sm:pr-[2.3125rem]">
          <button
            type="button"
            className="font-display text-[1.3rem] font-bold text-zap-ink hover:text-zap-red"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </footer>
  );
}
