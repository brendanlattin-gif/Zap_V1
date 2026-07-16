/**
 * Mock AI responses used when OPENAI_API_KEY is missing.
 * Clearly labeled so teachers/devs know this is not real AI output.
 */

import { formatCharacters } from "@/lib/ai/prompts";
import type { StorySetup } from "@/lib/types";

const MOCK_BANNER = "[Mock AI — add OPENAI_API_KEY to .env.local for real generation]";

export function mockOpeningScene(setup: StorySetup): string {
  const who = formatCharacters(setup.characters);
  const where = setup.setting.trim() || "a sunny schoolyard";
  const idea = setup.storyStarter.trim() || "something surprising is about to happen";

  return `${MOCK_BANNER}

On a bright morning in ${where}, ${who} gathered together.

"${idea.charAt(0).toUpperCase()}${idea.slice(1)}" someone whispered.

A soft breeze stirred the leaves. The air felt full of possibility. Everyone leaned in, waiting to see what would happen next.`;
}

export function mockContinueScene(direction: string): string {
  return `${MOCK_BANNER}

Then, exactly as the class hoped — ${direction.trim()}

Friends cheered. The adventure rolled forward, and a new surprise peeked around the corner.`;
}

export function mockPlotIdeas(): string[] {
  return [
    `${MOCK_BANNER.replace("[", "").replace("]", "")} — A helpful animal appears with a secret map.`,
    "The heroes find a mysterious glowing object.",
    "It starts to rain sparkles, and a new friend arrives.",
  ];
}
