"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BookMascot, ZapLogo } from "@/components/Brand";
import { RequireTeacher } from "@/components/RequireTeacher";
import { useAuth } from "@/components/providers/AuthProvider";
import { storyRepository } from "@/lib/data";
import type { StoryDraft } from "@/lib/types";

function DashboardContent() {
  const { user } = useAuth();
  const [drafts, setDrafts] = useState<StoryDraft[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    storyRepository.listDrafts().then((list) => {
      setDrafts(list);
      setLoaded(true);
    });
  }, []);

  return (
    <main className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col gap-6 overflow-y-auto p-4 pb-24 sm:p-8 sm:pb-28">
      <header className="zap-panel flex shrink-0 items-end justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-end">
          <BookMascot size="sm" />
          <p className="-ml-2 font-body text-base font-bold text-zap-ink">
            Hi, {user?.displayName ?? "Teacher"}
          </p>
        </div>
        <div className="flex items-end">
          <div className="sm:hidden">
            <ZapLogo size="md" href="/dashboard" />
          </div>
          <div className="hidden sm:block">
            <ZapLogo size="lg" href="/dashboard" />
          </div>
        </div>
      </header>

      <section className="zap-panel flex min-h-0 flex-1 flex-col p-6 animate-fade-up">
        <div className="flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-display text-4xl font-extrabold text-zap-red sm:text-5xl">
            Let’s write a story!
          </h1>
          <Link
            href="/stories/new"
            className="zap-btn zap-btn-primary inline-flex shrink-0 self-start sm:self-auto"
          >
            New Story
          </Link>
        </div>
        <div className="my-4 shrink-0 sm:my-5">
          <Image
            src="/assets/bookshelf.png"
            alt=""
            width={1600}
            height={200}
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="h-auto w-full object-contain"
            priority
          />
        </div>
        <h2 className="shrink-0 font-display text-2xl text-zap-ink">
          Saved drafts
        </h2>
        {!loaded && (
          <p className="mt-3 shrink-0 font-body text-zap-muted">Loading drafts…</p>
        )}
        {loaded && drafts.length === 0 && (
          <p className="mt-3 shrink-0 font-body text-zap-muted">
            No drafts yet. Create a new story to get started.
          </p>
        )}
        {drafts.length > 0 && (
          <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {drafts.map((draft) => (
                <li key={draft.id}>
                  <Link
                    href={`/stories/${draft.id}`}
                    className="zap-panel-white flex aspect-[5/3] flex-col justify-between p-3 transition hover:bg-white"
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
          </div>
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
