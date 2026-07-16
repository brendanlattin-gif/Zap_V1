"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BookMascot, ZapLogo } from "@/components/Brand";
import { RequireTeacher } from "@/components/RequireTeacher";
import {
  WizardIdeaModal,
  type WizardIdeaCategory,
} from "@/components/WizardIdeaModal";
import { storyRepository } from "@/lib/data";

const CHARACTER_SLOTS = 4;

/**
 * Story Starters wizard — Characters, Setting, Story.
 * Idea buttons open AI suggestion modals (mock fallback when no API key).
 */
function WizardContent() {
  const router = useRouter();
  const [characters, setCharacters] = useState<string[]>(
    Array.from({ length: CHARACTER_SLOTS }, () => "")
  );
  const [setting, setSetting] = useState("");
  const [storyStarter, setStoryStarter] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usedMock, setUsedMock] = useState(false);

  const [ideaCategory, setIdeaCategory] = useState<WizardIdeaCategory | null>(
    null
  );
  const [ideaText, setIdeaText] = useState("");
  const [ideaLoading, setIdeaLoading] = useState(false);
  const [ideaError, setIdeaError] = useState<string | null>(null);
  const [ideaMock, setIdeaMock] = useState(false);

  function updateCharacter(index: number, value: string) {
    setCharacters((prev) => prev.map((c, i) => (i === index ? value : c)));
  }

  const hasAtLeastOneCharacter = characters.some((c) => c.trim().length > 0);
  const canGenerate =
    hasAtLeastOneCharacter && setting.trim().length > 0 && storyStarter.trim().length > 0;

  async function loadWizardIdea(category: WizardIdeaCategory) {
    setIdeaCategory(category);
    setIdeaLoading(true);
    setIdeaError(null);
    setIdeaText("");

    try {
      const response = await fetch("/api/ai/wizard-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          characters,
          setting,
          storyStarter,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not generate an idea.");
      }

      setIdeaText(String(data.text ?? ""));
      setIdeaMock(Boolean(data.usedMock));
    } catch (err) {
      setIdeaError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIdeaLoading(false);
    }
  }

  function closeIdeaModal() {
    setIdeaCategory(null);
    setIdeaText("");
    setIdeaError(null);
    setIdeaLoading(false);
  }

  async function handleCopyIdea() {
    const text = ideaText.trim();
    if (!text || !ideaCategory) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard may be unavailable; still apply to the field.
    }

    if (ideaCategory === "character") {
      setCharacters((prev) => {
        const next = [...prev];
        const emptyIndex = next.findIndex((c) => !c.trim());
        const target = emptyIndex >= 0 ? emptyIndex : 0;
        next[target] = text;
        return next;
      });
    } else if (ideaCategory === "setting") {
      setSetting(text);
    } else {
      setStoryStarter(text);
    }
  }

  async function handleGenerate() {
    if (!canGenerate || busy) return;
    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/opening", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characters,
          setting,
          storyStarter,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Could not generate opening scene.");
      }

      setUsedMock(Boolean(data.usedMock));

      // Opening scene success → create the first persistent draft, then go to workspace.
      const draft = await storyRepository.createDraft({
        characters,
        setting,
        storyStarter,
        openingScene: String(data.text),
      });

      router.push(`/stories/${draft.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-5 p-4 sm:p-6">
      <header className="zap-panel flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <BookMascot size="sm" />
        <h1 className="font-display text-2xl text-[#6b4a2e] sm:text-3xl">Story Starters</h1>
        <ZapLogo size="sm" href="/dashboard" />
      </header>

      <div className="grid flex-1 gap-4 md:grid-cols-3">
        {/* Characters */}
        <section className="zap-panel flex flex-col p-4 sm:p-5 animate-fade-up">
          <h2 className="font-display text-xl text-zap-ink">Characters</h2>
          <p className="font-body text-sm font-bold">Who is in it?</p>
          <p className="mb-3 font-body text-xs italic text-zap-muted">Add at least 1 character.</p>
          <div className="flex flex-1 flex-col gap-2">
            {characters.map((value, index) => (
              <input
                key={index}
                className="zap-input"
                value={value}
                onChange={(e) => updateCharacter(index, e.target.value)}
                placeholder={index === 0 ? "e.g. Officer Barnaby" : `Character ${index + 1}`}
              />
            ))}
          </div>
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              className="zap-btn zap-btn-peach"
              onClick={() => loadWizardIdea("character")}
              disabled={busy || ideaLoading}
              title="Get a character idea"
            >
              Idea
            </button>
          </div>
        </section>

        {/* Setting */}
        <section className="zap-panel flex flex-col p-4 sm:p-5 animate-fade-up [animation-delay:80ms]">
          <h2 className="font-display text-xl text-zap-ink">Setting</h2>
          <p className="font-body text-sm font-bold">Where is it?</p>
          <p className="mb-3 font-body text-xs italic text-zap-muted">Describe the place.</p>
          <textarea
            className="zap-input min-h-[160px] flex-1 resize-y"
            value={setting}
            onChange={(e) => setSetting(e.target.value)}
            placeholder="e.g. Sunnyville Zoo on a windy Tuesday"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              className="zap-btn zap-btn-peach"
              onClick={() => loadWizardIdea("setting")}
              disabled={busy || ideaLoading}
              title="Get a setting idea"
            >
              Idea
            </button>
          </div>
        </section>

        {/* Story (storyStarter) */}
        <section className="zap-panel flex flex-col p-4 sm:p-5 animate-fade-up [animation-delay:140ms]">
          <h2 className="font-display text-xl text-zap-ink">Story</h2>
          <p className="font-body text-sm font-bold">What’s it about?</p>
          <p className="mb-3 font-body text-xs italic text-zap-muted">
            What should this story be about?
          </p>
          <textarea
            className="zap-input min-h-[160px] flex-1 resize-y"
            value={storyStarter}
            onChange={(e) => setStoryStarter(e.target.value)}
            placeholder="e.g. A lost map appears and the class must help find the treasure"
          />
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              className="zap-btn zap-btn-peach"
              onClick={() => loadWizardIdea("story")}
              disabled={busy || ideaLoading}
              title="Get a story idea"
            >
              Idea
            </button>
          </div>
        </section>
      </div>

      <div className="flex flex-col items-end gap-2">
        {error && <p className="font-body text-sm font-bold text-zap-red">{error}</p>}
        {usedMock && (
          <p className="font-body text-xs text-zap-muted">
            Using mock AI (add OPENAI_API_KEY later for real generation).
          </p>
        )}
        <p className="font-body text-xs text-zap-muted">
          Leaving now discards wizard progress.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="font-body text-sm font-bold text-zap-muted underline"
            onClick={() => router.push("/dashboard")}
            disabled={busy}
          >
            Cancel
          </button>
          <button
            type="button"
            className="zap-btn zap-btn-primary"
            onClick={handleGenerate}
            disabled={!canGenerate || busy}
          >
            {busy ? "Generating…" : "Zap!"}
          </button>
        </div>
      </div>

      <WizardIdeaModal
        open={ideaCategory !== null}
        category={ideaCategory ?? "character"}
        loading={ideaLoading}
        text={ideaText}
        usedMock={ideaMock}
        error={ideaError}
        onClose={closeIdeaModal}
        onCopy={handleCopyIdea}
        onNewIdea={() => {
          if (ideaCategory) void loadWizardIdea(ideaCategory);
        }}
      />
    </main>
  );
}

export default function NewStoryPage() {
  return (
    <RequireTeacher>
      <WizardContent />
    </RequireTeacher>
  );
}
