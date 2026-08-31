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

Write the OPENING scene of a classroom story, and a short story TITLE for a dashboard card.

Characters: ${formatCharacters(setup.characters)}
Setting: ${setup.setting.trim() || "a magical classroom"}
Story idea: ${setup.storyStarter.trim() || "an unexpected adventure begins"}

Title rules:
- Classroom-friendly for ESL ages 6–8
- Very short (about 3–6 short words, under ~36 characters) so it fits on one narrow card line
- Prefer a memorable name using a character or key image (e.g. "The Lazy Grasshopper", "Barnaby's Map")
- Not a full sentence or plot summary

Scene rules:
- Start in a vivid, welcoming way
- End at a moment that invites the class to wonder what happens next — but do not list options

Reply as JSON only, with this shape:
{"title":"...","text":"..."}
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

export type WizardIdeaCategory = "character" | "setting" | "story";

export function wizardIdeaPrompt(
  category: WizardIdeaCategory,
  setup: Partial<StorySetup>
): string {
  const characters = Array.isArray(setup.characters)
    ? setup.characters.map((c) => c.trim()).filter(Boolean)
    : [];
  const setting = String(setup.setting ?? "").trim();
  const storyStarter = String(setup.storyStarter ?? "").trim();

  const contextLines = [
    characters.length ? `Existing characters: ${characters.join(", ")}` : null,
    setting ? `Setting so far: ${setting}` : null,
    storyStarter ? `Story idea so far: ${storyStarter}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const contextBlock = contextLines
    ? `\nContext from the wizard (use for coherence; do not repeat existing characters):\n${contextLines}\n`
    : "\n";

  if (category === "character") {
    return `
You help an ESL teacher of ages 6–8 brainstorm a story character.
${contextBlock}
Suggest ONE new character name or short description suitable for a classroom story.
Keep it playful, simple vocabulary, and one short phrase (e.g. "Officer Barnaby" or "a shy fox who loves maps").
Do not number the answer. Reply with only the character suggestion text.
`.trim();
  }

  if (category === "setting") {
    return `
You help an ESL teacher of ages 6–8 brainstorm a story setting.
${contextBlock}
Suggest ONE place/setting description suitable for a classroom story.
Keep it vivid but simple, one short phrase or sentence (e.g. "Sunnyville Zoo on a windy Tuesday").
Do not number the answer. Reply with only the setting suggestion text.
`.trim();
  }

  return `
You help an ESL teacher of ages 6–8 brainstorm a story idea (plot starter).
${contextBlock}
Suggest ONE short story premise suitable for a classroom story.
Keep it playful and clear, one short sentence (e.g. "A lost map appears and the class must help find the treasure").
Do not number the answer. Reply with only the story suggestion text.
`.trim();
}
