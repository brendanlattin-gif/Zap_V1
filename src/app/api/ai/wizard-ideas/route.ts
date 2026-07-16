import { NextResponse } from "next/server";
import { generateWizardIdea } from "@/lib/ai/client";
import type { WizardIdeaCategory } from "@/lib/ai/prompts";

const CATEGORIES: WizardIdeaCategory[] = ["character", "setting", "story"];

/**
 * POST /api/ai/wizard-ideas
 * Body: { category, characters?, setting?, storyStarter? }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const category = body.category as WizardIdeaCategory | undefined;

    if (!category || !CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: "category must be character, setting, or story." },
        { status: 400 }
      );
    }

    const result = await generateWizardIdea({
      category,
      setup: {
        characters: Array.isArray(body.characters)
          ? body.characters.map(String)
          : [],
        setting: String(body.setting ?? ""),
        storyStarter: String(body.storyStarter ?? ""),
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not generate a wizard idea." },
      { status: 500 }
    );
  }
}
