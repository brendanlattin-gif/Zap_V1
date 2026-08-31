"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BookMascot, ZapLogo } from "@/components/Brand";
import { RequireTeacher } from "@/components/RequireTeacher";
import { useAuth } from "@/components/providers/AuthProvider";
import { storyRepository } from "@/lib/data";
import type { StoryDraft } from "@/lib/types";
import Image from "next/image";

function DashboardContent() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [drafts, setDrafts] = useState<StoryDraft[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    storyRepository.listDrafts().then((list) => {
      setDrafts(list);
      setLoaded(true);
    });
  }, []);

  async function handleSignOut() {
    await signOut();
    router.push("/");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-6 p-4 sm:p-8">
     <header className="zap-panel flex items-end justify-between gap-4 px-4 py-3 sm:px-6">
  <div className="flex items-end gap-3">
    <BookMascot size="sm" />
    <p className="font-body text-sm text-zap-muted">
      Hi, {user?.displayName ?? "Teacher"}
    </p>
  </div>

  <div className="flex h-[72px] w-28 flex-col items-center justify-between">
    <Link
      href="/dashboard"
      className="flex min-h-0 flex-1 w-full items-center justify-center"
      aria-label="Zap! home"
    >
      <Image
        src="/brand/zaplogo-tiny.png"
        alt="Zap!"
        width={120}
        height={66}
        className="max-h-full max-w-full object-contain"
      />
    </Link>
    <button
      type="button"
      className="shrink-0 font-body text-sm font-bold text-zap-muted hover:text-zap-red"
      onClick={handleSignOut}
    >
      Sign out
    </button>
  </div>
</header>

      <section className="zap-panel p-6 animate-fade-up">
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <h1 className="font-display text-3xl font-extrabold text-zap-red sm:text-4xl">
      Let’s write a story!
    </h1>
    <Link
      href="/stories/new"
      className="zap-btn zap-btn-primary inline-flex shrink-0 self-start sm:self-auto"
    >
      New Story
    </Link>
  </div>
        <h2 className="font-display text-2xl text-zap-ink mt-3">Saved drafts</h2>
        {!loaded && <p className="mt-3 font-body text-zap-muted">Loading drafts…</p>}
        {loaded && drafts.length === 0 && (
          <p className="mt-3 font-body text-zap-muted">
            No drafts yet. Create a new story to get started.
          </p>
        )}
        {drafts.length > 0 && (
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {drafts.map((draft) => (
            <li key={draft.id}>
              <Link
                href={`/stories/${draft.id}`}
                className="zap-panel-white flex aspect-[4/3] flex-col justify-between p-3 transition hover:bg-white"
              >
                  <p className="font-display text-sm font-bold leading-snug text-zap-ink line-clamp-2">
                    {draft.title}
                  </p>
                  <p className="font-body text-xs text-zap-muted">
                    {new Date(draft.updated_at).toLocaleDateString()}
                  </p>
                </Link>
              </li>
            ))}
        </ul>
        )}
      </section>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <RequireTeacher>
      <DashboardContent />
    </RequireTeacher>
  );
}
