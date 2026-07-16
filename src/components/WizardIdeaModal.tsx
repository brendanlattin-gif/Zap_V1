"use client";

import Image from "next/image";
import type { WizardIdeaCategory } from "@/lib/ai/prompts";

export type { WizardIdeaCategory };

const TITLES: Record<WizardIdeaCategory, string> = {
  character: "Character Ideas",
  setting: "Setting Ideas",
  story: "Story Ideas",
};

/**
 * Wizard AI suggestion modal — teacher-activated from Characters / Setting / Story.
 * Matches mockups: mascot + single suggestion + Copy Text / New Idea.
 */
export function WizardIdeaModal({
  open,
  category,
  loading,
  text,
  usedMock,
  error,
  onClose,
  onCopy,
  onNewIdea,
}: {
  open: boolean;
  category: WizardIdeaCategory;
  loading: boolean;
  text: string;
  usedMock: boolean;
  error: string | null;
  onClose: () => void;
  onCopy: () => void;
  onNewIdea: () => void;
}) {
  if (!open) return null;

  const title = TITLES[category];
  const canCopy = !loading && !error && text.trim().length > 0;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="zap-panel relative w-full max-w-2xl p-5 shadow-xl animate-pop sm:p-6">
        <button
          type="button"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg font-display text-2xl leading-none text-zap-ink transition hover:bg-zap-cream-deep"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
          <div className="flex shrink-0 justify-center sm:pt-2">
            <Image
              src="/brand/idea-mid.png"
              alt="Zap! book mascot with an idea"
              width={160}
              height={160}
              className="h-auto w-[120px] sm:w-[150px]"
              priority
            />
          </div>

          <div className="min-w-0 flex-1 pr-6">
            <h2 className="font-display text-3xl text-[#6b4a2e] sm:text-4xl">{title}</h2>
            <p className="mt-1 font-body text-base font-bold text-zap-ink">
              Here&apos;s an idea for you!
            </p>

            {usedMock && (
              <p className="mt-3 rounded-lg bg-zap-cream-deep px-3 py-2 font-body text-xs font-bold text-zap-muted">
                Using mock ideas (no OpenAI key yet).
              </p>
            )}

            {error && (
              <p className="mt-3 font-body text-sm font-bold text-zap-red">{error}</p>
            )}

            <div className="zap-panel-white mt-4 min-h-[140px] px-4 py-3 shadow-inner">
              {loading ? (
                <p className="py-8 text-center font-body text-lg text-zap-muted">
                  Thinking of ideas…
                </p>
              ) : (
                <p className="font-body text-base font-semibold leading-relaxed text-zap-ink whitespace-pre-wrap">
                  {text}
                </p>
              )}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-end gap-4">
              <button
                type="button"
                className="inline-flex items-center gap-2 font-body text-sm font-bold text-zap-ink transition hover:text-zap-muted disabled:opacity-40"
                onClick={onCopy}
                disabled={!canCopy}
              >
                Copy Text
                <CopyIcon />
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 font-body text-sm font-bold text-zap-ink transition hover:text-zap-muted disabled:opacity-40"
                onClick={onNewIdea}
                disabled={loading}
              >
                New Idea
                <RefreshIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <polyline points="21 3 21 9 15 9" />
    </svg>
  );
}
