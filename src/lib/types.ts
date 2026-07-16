/**
 * Shared types for Zap! Prototype Slice 1.
 *
 * Naming (from prototype-slice-1.md):
 * - storyStarter = the teacher's "Story" idea before generation
 * - storyBeats / currentStoryText = generated narrative in the workspace
 */

/** One generated scene (opening or a later continuation). */
export type StoryBeat = {
  id: string;
  text: string;
  /** What the teacher chose or typed to produce this beat (null for opening). */
  direction: string | null;
  createdAt: string;
};

/** Setup fields collected in the Story Starters wizard. */
export type StorySetup = {
  /** Character names/descriptions (from multiple inputs or one list). */
  characters: string[];
  setting: string;
  /** Teacher's plot idea — the wizard "Story" field. */
  storyStarter: string;
};

/**
 * A draft story saved after the opening scene is generated.
 * Status stays "draft" in Slice 1 (no End Story / complete flow yet).
 */
export type StoryDraft = {
  id: string;
  title: string;
  characters: string[];
  setting: string;
  storyStarter: string;
  openingScene: string;
  storyBeats: StoryBeat[];
  /** Full story text shown in the workspace (derived from beats). */
  currentStoryText: string;
  /** Directions the teacher used (custom or plot-idea selections). */
  savedChoices: string[];
  status: "draft";
  created_at: string;
  updated_at: string;
};

/** UI save-state for the visible "Saving…" / "Saved" indicator. */
export type SaveState = "idle" | "saving" | "saved" | "error";

/** Stub auth user — will be replaced by a real Supabase user later. */
export type StubUser = {
  id: string;
  displayName: string;
  email: string;
};
