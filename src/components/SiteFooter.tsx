"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

/** Full-width cream footer with Sign out for authenticated teacher views. */
export function SiteFooter() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  if (!user) return null;

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <footer className="zap-site-footer w-full px-4 py-5 sm:px-6">
      <div className="mx-auto flex max-w-5xl justify-end px-4 sm:px-8">
        <button
          type="button"
          className="font-body text-base font-bold text-zap-ink hover:text-zap-red"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </footer>
  );
}
