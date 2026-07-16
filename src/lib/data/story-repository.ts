/**
 * Data layer — StoryRepository interface.
 *
 * Slice 1 uses localStorage (see local-story-repository.ts).
 * Later we can add a SupabaseStoryRepository that implements the same methods
 * without changing dashboard or workspace UI code.
 */

import type { StoryDraft, StorySetup } from "@/lib/types";

export type CreateDraftInput = StorySetup & {
  openingScene: string;
  title?: string;
};

export interface StoryRepository {
  listDrafts(): Promise<StoryDraft[]>;
  getDraft(id: string): Promise<StoryDraft | null>;
  createDraft(input: CreateDraftInput): Promise<StoryDraft>;
  updateDraft(draft: StoryDraft): Promise<StoryDraft>;
  deleteDraft(id: string): Promise<void>;
}
