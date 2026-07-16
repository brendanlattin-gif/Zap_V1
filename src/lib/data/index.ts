/**
 * Data layer entry point.
 * UI should import from here so we can swap repositories later.
 */

export { storyRepository } from "@/lib/data/local-story-repository";
export type { CreateDraftInput, StoryRepository } from "@/lib/data/story-repository";
