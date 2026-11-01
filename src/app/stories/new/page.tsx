"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BookMascot, ZapLogo } from "@/components/Brand";
import { RequireTeacher } from "@/components/RequireTeacher";
import {
  WizardIdeaModal,
  type WizardIdeaCategory,
} from "@/components/WizardIdeaModal";
import { storyRepository } from "@/lib/data";

const CHARACTER_SLOTS = 3;

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

  const characterFieldsRef = useRef<HTMLDivElement>(null);
  const [fieldStackHeight, setFieldStackHeight] = useState<number | null>(null);

  useEffect(() => {
    const el = characterFieldsRef.current;
    if (!el) return;

    const syncHeight = () => {
      const next = Math.round(el.getBoundingClientRect().height);
      if (next > 0) setFieldStackHeight(next);
    };

    syncHeight();
    const observer = new ResizeObserver(syncHeight);
    observer.observe(el);
    window.addEventListener("resize", syncHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncHeight);
    };
  }, []);

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
        title: typeof data.title === "string" ? data.title : undefined,
      });

      router.push(`/stories/${draft.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    /*
      Vertical scroll lives here. Horizontal 360px floor + x-scroll live in
      TeacherAppShell so the footer locks with the page (not the viewport).
    */
    <main className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col overflow-x-hidden overflow-y-auto px-4 pb-0 pt-2 sm:px-6 sm:pt-3">
      <header className="zap-panel relative z-10 flex shrink-0 items-end gap-4 px-4 py-4 shadow-[0_4px_12px_rgba(0,0,0,0.1)] sm:px-6 sm:py-5 md:gap-6">
        {/*
          Title + mascot switch at md (~768) with the body columns (md:grid-cols-3).
          Below md: stacked columns → short title, no mascot, extra left padding.
        */}
        <div className="flex min-w-0 flex-1 items-end gap-1">
          <BookMascot
            size="md"
            className="hidden h-auto w-auto shrink-0 md:block md:max-w-[7.25rem] lg:max-w-[7.5rem]"
          />
          <h1 className="min-w-0 whitespace-nowrap pl-1.5 font-display text-3xl font-extrabold leading-none text-zap-ink min-[400px]:text-4xl md:pl-0 md:text-4xl lg:text-5xl">
            <span className="md:hidden">Starters</span>
            <span className="hidden md:inline">Story Starters</span>
          </h1>
        </div>
        {/*
          Fixed 7.5rem below md (size at ~360 floor). Avoid min(40vw,…) —
          vw tracks the viewport, so the logo kept shrinking after side-scroll.
        */}
        <div className="flex w-[7.5rem] shrink-0 translate-y-1 self-center md:w-[9rem] lg:w-[11rem]">
          <div className="w-full [&_a]:block [&_img]:h-auto [&_img]:w-full">
            <ZapLogo
              size="2xl"
              href="/dashboard"
              ariaLabel="Back to dashboard"
            />
          </div>
        </div>
      </header>

      {/*
        min-h-min below md: white grows with stacked Steps 2–3 instead of
        clipping to the viewport (min-h-0 + overflow left content on page bg).
        md:min-h-0 restores fill-height for the column layout + Zap! mt-auto.
      */}
      <div className="relative z-0 mx-2 -mt-1 flex min-h-min flex-1 flex-col bg-white px-5 pt-6 pb-[5.15rem] shadow-[0_16px_40px_rgba(0,0,0,0.28),0_4px_12px_rgba(0,0,0,0.12)] sm:mx-2.5 sm:px-6 sm:pt-7 sm:pb-[5.4rem] md:min-h-0 md:px-4">
        {/*
          Shelf gaps: CSS can’t set per-row gap-y, so heading→image→subhead
          stay on md:gap-y-1; subhead→inputs / inputs→Idea use clamp margins.
          Zap! uses mt-auto to sit near the bottom when there’s spare height;
          that auto margin collapses on short viewports so Zap! isn’t footer-glued.
          Extra pb keeps breathing room above the overlay footer; short screens scroll.
        */}
        <div className="grid shrink-0 content-start gap-6 md:grid-cols-3 md:grid-rows-[auto_auto_auto_auto] md:gap-x-3 md:gap-y-1">
          {/* Characters */}
          <section className="flex flex-col animate-fade-up md:row-span-4 md:grid md:grid-rows-subgrid">
            <h2 className="mb-0 text-center font-display text-[2.05rem] font-extrabold leading-tight text-zap-ink">
              {/* Below 400px: "1:"; 400px–md: "Step 1:"; md+: none (columns). */}
              <span className="text-zap-red min-[400px]:hidden" aria-hidden="true">
                1:{" "}
              </span>
              <span className="hidden text-zap-red min-[400px]:inline md:hidden" aria-hidden="true">
                Step 1:{" "}
              </span>
              Characters
            </h2>
            <div className="-mt-1 flex justify-center px-6 pb-0 pt-0 sm:px-10 md:px-0">
              <Image
                src="/assets/characters.png"
                alt=""
                width={800}
                height={800}
                sizes="(max-width: 768px) 22rem, 25vw"
                className="h-auto w-full max-w-[22rem] object-contain md:max-w-none md:w-[75%]"
              />
            </div>
            <p className="whitespace-nowrap text-center font-body text-[1.2rem] font-bold leading-tight text-zap-ink">
              Who is in it?
            </p>
            <div className="mt-[clamp(0.55rem,1.5vh,0.95rem)] flex flex-col bg-zap-cream p-2 md:p-3">
              <div ref={characterFieldsRef} className="flex flex-col gap-1.5 md:gap-2">
                {characters.map((value, index) => (
                  <input
                    key={index}
                    className="zap-input max-md:py-2"
                    value={value}
                    onChange={(e) => updateCharacter(index, e.target.value)}
                    placeholder={
                      index === 0
                        ? "e.g. Officer Barnaby"
                        : `Character ${index + 1}`
                    }
                  />
                ))}
              </div>
              <div className="mt-[clamp(0.25rem,0.9vh,0.55rem)] flex justify-start">
                <button
                  type="button"
                  className="zap-btn bg-white px-4 py-2 text-xl text-zap-ink"
                  onClick={() => loadWizardIdea("character")}
                  disabled={busy || ideaLoading}
                  title="Get a character idea"
                >
                  Idea
                </button>
              </div>
            </div>
          </section>

          {/* Setting */}
          <section className="flex flex-col animate-fade-up [animation-delay:80ms] md:row-span-4 md:grid md:grid-rows-subgrid">
            <h2 className="mb-0 text-center font-display text-[2.05rem] font-extrabold leading-tight text-zap-ink">
              <span className="text-zap-red min-[400px]:hidden" aria-hidden="true">
                2:{" "}
              </span>
              <span className="hidden text-zap-red min-[400px]:inline md:hidden" aria-hidden="true">
                Step 2:{" "}
              </span>
              Setting
            </h2>
            <div className="-mt-1 flex justify-center px-6 pb-0 pt-0 sm:px-10 md:px-0">
              <Image
                src="/assets/setting.png"
                alt=""
                width={800}
                height={800}
                sizes="(max-width: 768px) 22rem, 25vw"
                className="h-auto w-full max-w-[22rem] object-contain md:max-w-none md:w-[75%]"
              />
            </div>
            <p className="whitespace-nowrap text-center font-body text-[1.2rem] font-bold leading-tight text-zap-ink">
              Where is it?
            </p>
            <div className="mt-[clamp(0.55rem,1.5vh,0.95rem)] flex flex-col bg-zap-cream p-2 md:p-3">
              <textarea
                className="zap-input box-border resize-none overflow-y-auto max-md:py-2"
                style={
                  fieldStackHeight != null
                    ? {
                        height: fieldStackHeight,
                        minHeight: fieldStackHeight,
                        maxHeight: fieldStackHeight,
                      }
                    : undefined
                }
                value={setting}
                onChange={(e) => setSetting(e.target.value)}
                placeholder="e.g. Sunnyville Zoo on a windy Tuesday"
              />
              <div className="mt-[clamp(0.25rem,0.9vh,0.55rem)] flex justify-start">
                <button
                  type="button"
                  className="zap-btn bg-white px-4 py-2 text-xl text-zap-ink"
                  onClick={() => loadWizardIdea("setting")}
                  disabled={busy || ideaLoading}
                  title="Get a setting idea"
                >
                  Idea
                </button>
              </div>
            </div>
          </section>

          {/* Story (storyStarter) */}
          <section className="flex flex-col animate-fade-up [animation-delay:140ms] md:row-span-4 md:grid md:grid-rows-subgrid">
            <h2 className="mb-0 text-center font-display text-[2.05rem] font-extrabold leading-tight text-zap-ink">
              <span className="text-zap-red min-[400px]:hidden" aria-hidden="true">
                3:{" "}
              </span>
              <span className="hidden text-zap-red min-[400px]:inline md:hidden" aria-hidden="true">
                Step 3:{" "}
              </span>
              Story
            </h2>
            <div className="-mt-1 flex justify-center px-6 pb-0 pt-0 sm:px-10 md:px-0">
              <Image
                src="/assets/plot-story.png"
                alt=""
                width={800}
                height={800}
                sizes="(max-width: 768px) 22rem, 25vw"
                className="h-auto w-full max-w-[22rem] object-contain md:max-w-none md:w-[75%]"
              />
            </div>
            <p className="whitespace-nowrap text-center font-body text-[1.2rem] font-bold leading-tight text-zap-ink">
              What’s it about?
            </p>
            <div className="mt-[clamp(0.55rem,1.5vh,0.95rem)] flex flex-col bg-zap-cream p-2 md:p-3">
              <textarea
                className="zap-input box-border resize-none overflow-y-auto max-md:py-2"
                style={
                  fieldStackHeight != null
                    ? {
                        height: fieldStackHeight,
                        minHeight: fieldStackHeight,
                        maxHeight: fieldStackHeight,
                      }
                    : undefined
                }
                value={storyStarter}
                onChange={(e) => setStoryStarter(e.target.value)}
                placeholder="e.g. A lost map appears and the class must help find the treasure"
              />
              <div className="mt-[clamp(0.25rem,0.9vh,0.55rem)] flex justify-start">
                <button
                  type="button"
                  className="zap-btn bg-white px-4 py-2 text-xl text-zap-ink"
                  onClick={() => loadWizardIdea("story")}
                  disabled={busy || ideaLoading}
                  title="Get a story idea"
                >
                  Idea
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-auto flex shrink-0 flex-col items-end gap-2 pt-4">
          {error && (
            <p className="w-full text-right font-body text-sm font-bold text-zap-red">
              {error}
            </p>
          )}
          {usedMock && (
            <p className="w-full text-right font-body text-xs text-zap-muted">
              Using mock AI (add OPENAI_API_KEY later for real generation).
            </p>
          )}
          <button
            type="button"
            className={
              canGenerate || busy
                ? "zap-btn zap-btn-primary min-w-[5.4rem] justify-center py-[0.5rem] pl-[1.1rem] pr-[0.95rem] text-[1.5rem] shadow-[0_4px_10px_rgba(0,0,0,0.18)] disabled:opacity-100"
                : "zap-btn zap-btn-primary min-w-[5.4rem] justify-center bg-zap-cream-deep py-[0.5rem] pl-[1.1rem] pr-[0.95rem] text-[1.5rem] text-zap-muted shadow-[0_4px_10px_rgba(0,0,0,0.12)] disabled:opacity-100"
            }
            onClick={handleGenerate}
            disabled={!canGenerate || busy}
          >
            {busy ? (
              "Generating…"
            ) : (
              <span className="inline-block w-[4.25ch] -translate-x-px text-center tracking-tight">
                {canGenerate ? "Zap!" : "Zap?"}
              </span>
            )}
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
