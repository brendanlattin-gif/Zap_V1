/**
 * Local (browser) story persistence using localStorage.
 *
 * This keeps drafts on the teacher's machine for the Slice 1 prototype.
 * Swap this out for a Supabase implementation when cloud storage is ready.
 */

import type { CreateDraftInput, StoryRepository } from "@/lib/data/story-repository";
import type { StoryBeat, StoryDraft } from "@/lib/types";

const STORAGE_KEY = "zap.storyDrafts.v1";

function readAll(): StoryDraft[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoryDraft[];
  } catch {
    return [];
  }
}

function writeAll(drafts: StoryDraft[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts));
}

function makeId(): string {
  return `story_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/** Build a short title from the story starter (or a fallback). */
function deriveTitle(storyStarter: string, openingScene: string): string {
  const source = storyStarter.trim() || openingScene.trim();
  if (!source) return "Untitled story";
  const firstLine = source.split(/\n/)[0].trim();
  return firstLine.length > 48 ? `${firstLine.slice(0, 45)}…` : firstLine;
}

export class LocalStoryRepository implements StoryRepository {
  async listDrafts(): Promise<StoryDraft[]> {
    return readAll().sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  }

  async getDraft(id: string): Promise<StoryDraft | null> {
    return readAll().find((d) => d.id === id) ?? null;
  }

  async createDraft(input: CreateDraftInput): Promise<StoryDraft> {
    const now = new Date().toISOString();
    const openingBeat: StoryBeat = {
      id: makeId(),
      text: input.openingScene,
      direction: null,
      createdAt: now,
    };

    const draft: StoryDraft = {
      id: makeId(),
      title: input.title?.trim() || deriveTitle(input.storyStarter, input.openingScene),
      characters: input.characters.filter((c) => c.trim().length > 0),
      setting: input.setting.trim(),
      storyStarter: input.storyStarter.trim(),
      openingScene: input.openingScene,
      storyBeats: [openingBeat],
      currentStoryText: input.openingScene,
      savedChoices: [],
      status: "draft",
      created_at: now,
      updated_at: now,
    };

    const all = readAll();
    all.push(draft);
    writeAll(all);
    return draft;
  }

  async updateDraft(draft: StoryDraft): Promise<StoryDraft> {
    const updated: StoryDraft = {
      ...draft,
      updated_at: new Date().toISOString(),
    };
    const all = readAll();
    const index = all.findIndex((d) => d.id === draft.id);
    if (index === -1) {
      all.push(updated);
    } else {
      all[index] = updated;
    }
    writeAll(all);
    return updated;
  }

  async deleteDraft(id: string): Promise<void> {
    writeAll(readAll().filter((d) => d.id !== id));
  }
}

/** Singleton used by the UI in Slice 1. */
export const storyRepository: StoryRepository = new LocalStoryRepository();
