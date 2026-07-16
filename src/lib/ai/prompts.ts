/**
 * Prompt templates for Slice 1 AI calls.
 * Keep prompts here so we can tune tone later without touching routes.
 */

import type { StorySetup } from "@/lib/types";

const CLASSROOM_GUIDANCE = `
Write for ESL/EFL students ages 6–8.
Use short sentences, simple vocabulary, and a playful classroom tone.
Keep each response to about 2–4 short paragraphs.
Do not include choices, discussion questions, or "what happens next" options in the story text.
`.trim();

export function formatCharacters(characters: string[]): string {
  const cleaned = characters.map((c) => c.trim()).filter(Boolean);
  return cleaned.length ? cleaned.join(", ") : "a friendly group of classmates";
}

export function openingScenePrompt(setup: StorySetup): string {
  return `
${CLASSROOM_GUIDANCE}

Write the OPENING scene of a classroom story.

Characters: ${formatCharacters(setup.characters)}
Setting: ${setup.setting.trim() || "a magical classroom"}
Story idea: ${setup.storyStarter.trim() || "an unexpected adventure begins"}

Start the story in a vivid, welcoming way. End at a moment that invites the class to wonder what happens next — but do not list options.
`.trim();
}

export function continueScenePrompt(args: {
  setup: StorySetup;
  currentStoryText: string;
  direction: string;
}): string {
  return `
${CLASSROOM_GUIDANCE}

Continue this classroom story based on the teacher's direction.

Characters: ${formatCharacters(args.setup.characters)}
Setting: ${args.setup.setting}
Original story idea: ${args.setup.storyStarter}

Story so far:
${args.currentStoryText}

Teacher's direction for what happens next:
${args.direction}

Write ONLY the next scene (do not repeat the whole story). Keep continuity with characters and setting.
`.trim();
}

export function plotIdeasPrompt(args: {
  setup: StorySetup;
  currentStoryText: string;
}): string {
  return `
You help an ESL teacher of ages 6–8 facilitate a class story.

Characters: ${formatCharacters(args.setup.characters)}
Setting: ${args.setup.setting}
Story idea: ${args.setup.storyStarter}

Story so far:
${args.currentStoryText}

Suggest exactly 3 short, distinct directions for what could happen next.
Each idea should be one clear sentence a teacher can read aloud.
Reply as JSON only, with this shape:
{"ideas":["...","...","..."]}
`.trim();
}
