import { NextResponse } from "next/server";
import { generatePlotIdeas } from "@/lib/ai/client";
import type { StorySetup } from "@/lib/types";

/**
 * POST /api/ai/plot-ideas
 * Body: { setup, currentStoryText }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const currentStoryText = String(body.currentStoryText ?? "").trim();
    const setup = body.setup as StorySetup | undefined;

    if (!setup || !currentStoryText) {
      return NextResponse.json({ error: "Missing story context." }, { status: 400 });
    }

    const result = await generatePlotIdeas({
      setup: {
        characters: Array.isArray(setup.characters) ? setup.characters.map(String) : [],
        setting: String(setup.setting ?? ""),
        storyStarter: String(setup.storyStarter ?? ""),
      },
      currentStoryText,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not generate plot ideas." }, { status: 500 });
  }
}
