/**
 * Story engine — pure helpers for beats and display text.
 * Keeps story logic out of React components and AI prompt code.
 */

import type { StoryBeat, StoryDraft } from "@/lib/types";

function makeId(): string {
  return `beat_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/** Join all beat texts into the full story shown in the workspace. */
export function joinBeatsToText(beats: StoryBeat[]): string {
  return beats.map((b) => b.text.trim()).filter(Boolean).join("\n\n");
}

/**
 * Append a new continuation beat and return an updated draft object
 * (caller is responsible for saving via the repository).
 */
export function appendContinuation(
  draft: StoryDraft,
  nextSceneText: string,
  direction: string
): StoryDraft {
  const beat: StoryBeat = {
    id: makeId(),
    text: nextSceneText.trim(),
    direction: direction.trim(),
    createdAt: new Date().toISOString(),
  };
  const storyBeats = [...draft.storyBeats, beat];
  return {
    ...draft,
    storyBeats,
    currentStoryText: joinBeatsToText(storyBeats),
    savedChoices: [...draft.savedChoices, direction.trim()],
  };
}

/**
 * Soft round count for the 5-dot progress indicator.
 * Not enforced — teachers can go past 5; we just fill dots visually.
 */
export function softRoundIndex(draft: StoryDraft): number {
  // Round 1 = opening only; each continuation advances one step.
  return Math.max(0, draft.storyBeats.length - 1);
}
