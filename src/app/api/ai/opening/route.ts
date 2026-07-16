import { NextResponse } from "next/server";
import { generateOpeningScene } from "@/lib/ai/client";
import type { StorySetup } from "@/lib/types";

/**
 * POST /api/ai/opening
 * Body: { characters: string[], setting: string, storyStarter: string }
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<StorySetup>;
    const setup: StorySetup = {
      characters: Array.isArray(body.characters) ? body.characters.map(String) : [],
      setting: String(body.setting ?? ""),
      storyStarter: String(body.storyStarter ?? ""),
    };

    if (!setup.characters.some((c) => c.trim()) && !setup.setting.trim() && !setup.storyStarter.trim()) {
      return NextResponse.json(
        { error: "Please fill in Characters, Setting, or Story before generating." },
        { status: 400 }
      );
    }

    const result = await generateOpeningScene(setup);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not generate opening scene." }, { status: 500 });
  }
}
