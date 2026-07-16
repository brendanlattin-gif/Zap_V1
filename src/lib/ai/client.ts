/**
 * Server-side OpenAI helper for Slice 1.
 * Called only from API routes — never from client components with the API key.
 */

import OpenAI from "openai";
import { mockContinueScene, mockOpeningScene, mockPlotIdeas } from "@/lib/ai/mock";
import {
  continueScenePrompt,
  openingScenePrompt,
  plotIdeasPrompt,
} from "@/lib/ai/prompts";
import type { StorySetup } from "@/lib/types";

function getClient(): OpenAI | null {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) return null;
  return new OpenAI({ apiKey: key });
}

async function chatText(system: string, user: string): Promise<string | null> {
  const client = getClient();
  if (!client) return null;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.8,
  });

  return response.choices[0]?.message?.content?.trim() || null;
}

const SYSTEM =
  "You are Zap!, a friendly classroom storytelling co-author for ESL teachers of ages 6–8.";

export async function generateOpeningScene(setup: StorySetup): Promise<{
  text: string;
  usedMock: boolean;
}> {
  try {
    const text = await chatText(SYSTEM, openingScenePrompt(setup));
    if (text) return { text, usedMock: false };
  } catch (error) {
    console.error("OpenAI opening scene failed; using mock.", error);
  }
  return { text: mockOpeningScene(setup), usedMock: true };
}

export async function generateContinuation(args: {
  setup: StorySetup;
  currentStoryText: string;
  direction: string;
}): Promise<{ text: string; usedMock: boolean }> {
  try {
    const text = await chatText(SYSTEM, continueScenePrompt(args));
    if (text) return { text, usedMock: false };
  } catch (error) {
    console.error("OpenAI continuation failed; using mock.", error);
  }
  return { text: mockContinueScene(args.direction), usedMock: true };
}

export async function generatePlotIdeas(args: {
  setup: StorySetup;
  currentStoryText: string;
}): Promise<{ ideas: string[]; usedMock: boolean }> {
  try {
    const raw = await chatText(
      `${SYSTEM} Always reply with valid JSON only.`,
      plotIdeasPrompt(args)
    );
    if (raw) {
      const parsed = JSON.parse(stripCodeFence(raw)) as { ideas?: unknown };
      if (Array.isArray(parsed.ideas) && parsed.ideas.length >= 3) {
        const ideas = parsed.ideas.slice(0, 3).map(String);
        return { ideas, usedMock: false };
      }
    }
  } catch (error) {
    console.error("OpenAI plot ideas failed; using mock.", error);
  }
  return { ideas: mockPlotIdeas(), usedMock: true };
}

function stripCodeFence(text: string): string {
  return text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
}
