"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BookMascot, ZapLogo } from "@/components/Brand";
import { RequireTeacher } from "@/components/RequireTeacher";
import { useAuth } from "@/components/providers/AuthProvider";
import { storyRepository } from "@/lib/data";
import type { StoryDraft } from "@/lib/types";

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
      <header className="zap-panel flex flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <BookMascot size="sm" />
          <div>
            <p className="font-display text-xl text-zap-ink">Dashboard</p>
            <p className="font-body text-sm text-zap-muted">
              Hi, {user?.displayName ?? "Teacher"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ZapLogo size="sm" href="/dashboard" />
          <button
            type="button"
            className="font-body text-sm font-bold text-zap-muted underline"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </header>

      <section className="zap-panel p-6 animate-fade-up">
        <h1 className="font-display text-3xl text-zap-red">Let’s write a story!</h1>
        <p className="mt-2 max-w-xl font-body text-base font-semibold text-zap-muted">
          Start a new classroom story, or resume a draft where you left off.
        </p>
        <Link href="/stories/new" className="zap-btn zap-btn-primary mt-6 inline-flex">
          Create New Story
        </Link>
      </section>

      <section className="zap-panel p-6">
        <h2 className="font-display text-2xl text-zap-ink">Saved drafts</h2>
        {!loaded && <p className="mt-3 font-body text-zap-muted">Loading drafts…</p>}
        {loaded && drafts.length === 0 && (
          <p className="mt-3 font-body text-zap-muted">
            No drafts yet. Create a new story to get started.
          </p>
        )}
        {drafts.length > 0 && (
          <ul className="mt-4 flex flex-col gap-3">
            {drafts.map((draft) => (
              <li key={draft.id}>
                <Link
                  href={`/stories/${draft.id}`}
                  className="zap-panel-white flex flex-col gap-1 px-4 py-3 transition hover:bg-white sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-body text-lg font-extrabold text-zap-ink">{draft.title}</p>
                    <p className="font-body text-sm text-zap-muted">
                      Updated {new Date(draft.updated_at).toLocaleString()}
                    </p>
                  </div>
                  <span className="font-display text-zap-red">Resume →</span>
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
