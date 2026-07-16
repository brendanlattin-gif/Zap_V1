import { NextResponse } from "next/server";
import { generateContinuation } from "@/lib/ai/client";
import type { StorySetup } from "@/lib/types";

/**
 * POST /api/ai/continue
 * Body: { setup, currentStoryText, direction }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const direction = String(body.direction ?? "").trim();
    const currentStoryText = String(body.currentStoryText ?? "").trim();
    const setup = body.setup as StorySetup | undefined;

    if (!direction) {
      return NextResponse.json({ error: "Please enter a direction for the story." }, { status: 400 });
    }
    if (!setup || !currentStoryText) {
      return NextResponse.json({ error: "Missing story context." }, { status: 400 });
    }

    const result = await generateContinuation({
      setup: {
        characters: Array.isArray(setup.characters) ? setup.characters.map(String) : [],
        setting: String(setup.setting ?? ""),
        storyStarter: String(setup.storyStarter ?? ""),
      },
      currentStoryText,
      direction,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not continue the story." }, { status: 500 });
  }
}
