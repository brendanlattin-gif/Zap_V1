"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ZapLogo } from "@/components/Brand";
import { FullScreenReader } from "@/components/FullScreenReader";
import { PlotIdeasOverlay } from "@/components/PlotIdeasOverlay";
import { RequireTeacher } from "@/components/RequireTeacher";
import { SaveIndicator } from "@/components/SaveIndicator";
import { SoftProgressDots } from "@/components/SoftProgressDots";
import { storyRepository } from "@/lib/data";
import { appendContinuation, softRoundIndex } from "@/lib/story/engine";
import { normalizeStoryTitle, TITLE_MAX_LENGTH } from "@/lib/story/title";
import type { SaveState, StoryDraft } from "@/lib/types";

/**
 * Story workspace — compact story view + custom choice + plot ideas.
 * Auto-saves after each successful continuation.
 */
function WorkspaceContent() {
  const params = useParams();
  const storyId = String(params.id ?? "");

  const [draft, setDraft] = useState<StoryDraft | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [customDirection, setCustomDirection] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [readerOpen, setReaderOpen] = useState(false);

  const [plotOpen, setPlotOpen] = useState(false);
  const [plotLoading, setPlotLoading] = useState(false);
  const [plotIdeas, setPlotIdeas] = useState<string[]>([]);
  const [plotMock, setPlotMock] = useState(false);
  const [plotError, setPlotError] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState("");
  const ignoreTitleBlur = useRef(false);

  useEffect(() => {
    if (!storyId) return;
    storyRepository.getDraft(storyId).then((found) => {
      if (!found) {
        setLoadError("Draft not found. It may have been cleared from this browser.");
        return;
      }
      setDraft(found);
      setSaveState("saved");
    });
  }, [storyId]);

  const persist = useCallback(async (next: StoryDraft) => {
    setSaveState("saving");
    try {
      const saved = await storyRepository.updateDraft(next);
      setDraft(saved);
      setSaveState("saved");
      return saved;
    } catch {
      setSaveState("error");
      throw new Error("Could not save draft.");
    }
  }, []);

  async function continueWithDirection(direction: string) {
    if (!draft || busy) return;
    const trimmed = direction.trim();
    if (!trimmed) {
      setError("Please enter what happens next.");
      return;
    }

    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/continue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          setup: {
            characters: draft.characters,
            setting: draft.setting,
            storyStarter: draft.storyStarter,
          },
          currentStoryText: draft.currentStoryText,
          direction: trimmed,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not continue the story.");
      }

      const next = appendContinuation(draft, String(data.text), trimmed);
      await persist(next);
      setCustomDirection("");
      setPlotOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  function startEditTitle() {
    if (!draft) return;
    setTitleDraft(draft.title);
    setEditingTitle(true);
  }

  async function saveTitle() {
    if (!draft) return;
    const nextTitle = normalizeStoryTitle(titleDraft) || draft.title;
    setEditingTitle(false);
    if (nextTitle === draft.title) return;
    try {
      await persist({ ...draft, title: nextTitle });
    } catch {
      setError("Could not save the title.");
    }
  }

  async function loadPlotIdeas() {
    if (!draft) return;
    setPlotOpen(true);
    setPlotLoading(true);
    setPlotError(null);

    try {
      const response = await fetch("/api/ai/plot-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          setup: {
            characters: draft.characters,
            setting: draft.setting,
            storyStarter: draft.storyStarter,
          },
          currentStoryText: draft.currentStoryText,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not generate plot ideas.");
      }
      setPlotIdeas(Array.isArray(data.ideas) ? data.ideas.map(String) : []);
      setPlotMock(Boolean(data.usedMock));
    } catch (err) {
      setPlotError(err instanceof Error ? err.message : "Something went wrong.");
      setPlotIdeas([]);
    } finally {
      setPlotLoading(false);
    }
  }

  if (loadError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <p className="font-body text-lg font-bold text-zap-red">{loadError}</p>
        <Link href="/dashboard" className="zap-btn zap-btn-primary">
          Back to dashboard
        </Link>
      </main>
    );
  }

  if (!draft) {
    return (
      <main className="flex min-h-screen items-center justify-center font-body text-lg">
        Loading story…
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col p-4 sm:p-6">
      <div className="zap-panel flex flex-1 flex-col gap-4 p-4 sm:p-6 animate-fade-up">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <ZapLogo size="md" href="/dashboard" />
          <div className="flex flex-wrap items-center gap-3">
            <SaveIndicator state={saveState} />
            <button
              type="button"
              className="zap-btn zap-btn-peach"
              onClick={() => setReaderOpen(true)}
            >
              Full screen
            </button>
            <Link
              href="/dashboard"
              className="font-body text-sm font-bold text-zap-muted underline"
            >
              Dashboard
            </Link>
          </div>
        </header>

        {editingTitle ? (
          <input
            className="zap-input font-display text-xl font-bold text-zap-ink sm:text-2xl"
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={() => {
              if (ignoreTitleBlur.current) {
                ignoreTitleBlur.current = false;
                return;
              }
              void saveTitle();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.currentTarget.blur();
              }
              if (e.key === "Escape") {
                e.preventDefault();
                ignoreTitleBlur.current = true;
                setEditingTitle(false);
              }
            }}
            maxLength={TITLE_MAX_LENGTH}
            aria-label="Story title"
            autoFocus
            disabled={busy}
          />
        ) : (
          <div className="flex items-start gap-3">
            <h1 className="min-w-0 flex-1 font-display text-xl font-bold leading-snug text-zap-ink sm:text-2xl">
              {draft.title}
            </h1>
            <button
              type="button"
              className="mt-1 shrink-0 rounded-lg p-1 text-zap-muted transition hover:bg-zap-cream-deep hover:text-zap-ink"
              onClick={startEditTitle}
              aria-label="Rename story"
              disabled={busy}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
              </svg>
            </button>
          </div>
        )}

        <article className="zap-panel-white max-h-[42vh] flex-1 overflow-y-auto p-4 sm:p-5">
          <p className="whitespace-pre-wrap font-body text-lg leading-relaxed text-zap-ink sm:text-xl">
            {draft.currentStoryText}
          </p>
        </article>

        <div>
          <p className="mb-2 font-display text-xl text-zap-ink sm:text-2xl">
            What happens next?
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <input
              className="zap-input flex-1"
              value={customDirection}
              onChange={(e) => setCustomDirection(e.target.value)}
              placeholder="Type a custom choice for the class…"
              disabled={busy}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  continueWithDirection(customDirection);
                }
              }}
            />
            <div className="flex gap-2">
              <button
                type="button"
                className="zap-btn zap-btn-primary"
                onClick={() => continueWithDirection(customDirection)}
                disabled={busy || !customDirection.trim()}
              >
                {busy ? "Writing…" : "Continue"}
              </button>
              <button
                type="button"
                className="zap-btn zap-btn-peach"
                onClick={loadPlotIdeas}
                disabled={busy}
                title="Open plot ideas overlay"
              >
                Idea
              </button>
            </div>
          </div>
          {error && (
            <p className="mt-2 font-body text-sm font-bold text-zap-red">{error}</p>
          )}
          <p className="mt-2 font-body text-xs text-zap-muted">
            Tip: Idea opens Plot Ideas (3 choices). Custom text above always works without opening
            the overlay.
          </p>
        </div>

        <div className="mt-auto flex justify-center pt-2">
          <SoftProgressDots filledCount={softRoundIndex(draft)} />
        </div>
      </div>

      <FullScreenReader
        open={readerOpen}
        title={draft.title}
        text={draft.currentStoryText}
        onClose={() => setReaderOpen(false)}
      />

      <PlotIdeasOverlay
        open={plotOpen}
        loading={plotLoading}
        ideas={plotIdeas}
        usedMock={plotMock}
        error={plotError}
        onClose={() => setPlotOpen(false)}
        onRegenerate={loadPlotIdeas}
        onSelect={(idea) => continueWithDirection(idea)}
      />
    </main>
  );
}

export default function StoryWorkspacePage() {
  return (
    <RequireTeacher>
      <WorkspaceContent />
    </RequireTeacher>
  );
}
