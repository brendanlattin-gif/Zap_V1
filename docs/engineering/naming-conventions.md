# Naming Conventions

> **What this file is for:** How this repo already names things. Follow these patterns so new code matches existing code. Do not invent a parallel system.
>
> Related: [folder-structure.md](folder-structure.md) · [types.ts](../../src/lib/types.ts)

---

## Components

- **PascalCase** file and export: `WizardIdeaModal.tsx` → `export function WizardIdeaModal`
- One primary component per file when practical
- Providers live under `components/providers/` (e.g. `AuthProvider.tsx`)
- Brand helpers: `ZapLogo`, `BookMascot` in `Brand.tsx`

---

## Routes and pages

- App Router folders = URL paths: `src/app/stories/new/page.tsx` → `/stories/new`
- Dynamic segments: `[id]` → `/stories/[id]`
- API handlers: `src/app/api/ai/<action>/route.ts` → `/api/ai/<action>`
- AI actions use **kebab-case**: `plot-ideas`, `wizard-ideas`

---

## Story / product field names

From product glossary and `StorySetup` — keep UI labels friendly, code names precise:

| Teacher-facing label | Code field | Meaning |
|----------------------|------------|---------|
| Characters | `characters: string[]` | Who is in the story |
| Setting | `setting: string` | Where it takes place |
| Story | `storyStarter: string` | Plot idea before generation |
| (workspace) | `storyBeats`, `currentStoryText` | Generated narrative |
| (workspace) | `openingScene` | First generated scene |

Wizard idea categories (AI): `"character" | "setting" | "story"` (`WizardIdeaCategory`).

Draft timestamps in types use **snake_case**: `created_at`, `updated_at`. Most other fields use **camelCase**.

---

## CSS and design tokens

Defined in `src/app/globals.css`:

| Pattern | Examples |
|---------|----------|
| Panel / input / button classes | `zap-panel`, `zap-panel-white`, `zap-input`, `zap-btn`, `zap-btn-primary`, `zap-btn-peach` |
| Color utilities | `text-zap-ink`, `bg-zap-cream`, `text-zap-red`, `zap-peach`, `zap-sky` |
| Fonts | `font-display` (Fredoka), `font-body` (Nunito) |
| Animations | `animate-fade-up`, `animate-pop` |

Prefer these over one-off colors when matching the comic classroom look.

---

## TypeScript types

- Shared domain types: `src/lib/types.ts` — `StoryBeat`, `StorySetup`, `StoryDraft`, `AuthUser`, `SaveState`
- AI-only types may live next to prompts (e.g. `WizardIdeaCategory` in `prompts.ts`) and be re-exported from UI if needed

---

## Lib modules

| Area | Pattern |
|------|---------|
| Data | `*Repository` interface + `Local*Repository` implementation; export singleton from `lib/data/index.ts` as `storyRepository` |
| AI | `generateX` in `client.ts`, `xPrompt` in `prompts.ts`, `mockX` in `mock.ts` |
| Supabase | `client.ts` (browser), `server.ts` (server), `middleware.ts` (session helper) |

---

## Files and imports

- Path alias: `@/` → `src/` (e.g. `import { storyRepository } from "@/lib/data"`)
- Prefer named exports for components and helpers

---

## Gaps / TBD

- No formal ESLint naming rules beyond Next defaults
- No CONTRIBUTING.md that restates these — this file is the reference
