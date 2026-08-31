/**
 * Short, card-friendly story titles for dashboard tiles (~4/3 cards).
 */

export const TITLE_MAX_LENGTH = 36;

/** Trim, strip quotes/trailing punctuation, soft-cap length with ellipsis. */
export function normalizeStoryTitle(raw: string): string {
  let title = raw
    .trim()
    .replace(/^["'“”]+|["'“”]+$/g, "")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/g, "")
    .trim();

  if (!title) return "";

  if (title.length > TITLE_MAX_LENGTH) {
    return `${title.slice(0, TITLE_MAX_LENGTH - 1).trimEnd()}…`;
  }

  return title;
}

/**
 * Character-based fallback when AI does not provide a title.
 * Uses the first character field (text before a comma), e.g. "Officer Barnaby"
 * or "The Lazy Grasshopper". Single-word names become "The {Name}".
 */
export function fallbackTitleFromCharacters(characters: string[]): string {
  const first = characters.map((c) => c.trim()).find(Boolean);
  if (!first) return "Untitled story";

  let name = first.split(",")[0].trim().replace(/^["'“”]+|["'“”]+$/g, "");
  if (!name) return "Untitled story";

  if (!/^(the|a|an)\s/i.test(name) && !/\s/.test(name)) {
    name = `The ${name}`;
  }

  return normalizeStoryTitle(name) || "Untitled story";
}

/** Prefer a normalized AI title; otherwise character fallback. */
export function resolveStoryTitle(
  aiTitle: string | null | undefined,
  characters: string[]
): string {
  const fromAi = aiTitle ? normalizeStoryTitle(aiTitle) : "";
  if (fromAi) return fromAi;
  return fallbackTitleFromCharacters(characters);
}
