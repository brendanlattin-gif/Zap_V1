# Folder Structure

> **What this file is for:** Where code and docs live, and what belongs in each place. Use this when deciding where to put a new file.
>
> Related: [naming-conventions.md](naming-conventions.md) · [architecture.md](architecture.md)

---

## Repository overview

```text
zap-v1/
├── docs/                 Product, design, engineering, and plans
├── public/               Static images (brand + backgrounds)
├── src/                  Application source
├── middleware.ts         Next.js edge middleware (auth session refresh)
├── .env.example          Env var names (no secrets)
├── package.json
└── …
```

---

## `src/`

```text
src/
├── app/                  Next.js App Router (pages + API + global CSS)
│   ├── api/ai/           AI POST handlers (opening, continue, plot-ideas, wizard-ideas)
│   ├── dashboard/
│   ├── login/ signup/ forgot-password/ reset-password/
│   ├── stories/new/      Wizard
│   ├── stories/[id]/     Workspace
│   ├── layout.tsx
│   ├── page.tsx          Landing
│   └── globals.css       Zap! design tokens and component classes
├── components/           Reusable UI (not route-owned pages)
│   └── providers/        React context providers (e.g. AuthProvider)
└── lib/                  Non-UI logic
    ├── ai/               Prompts, OpenAI client helpers, mocks
    ├── data/             Story repository (interface + localStorage impl)
    ├── story/            Pure story text helpers (engine)
    ├── supabase/         Browser / server / middleware clients
    └── types.ts          Shared TypeScript types
```

### What goes where

| Kind of change | Prefer |
|----------------|--------|
| New screen | `src/app/<route>/page.tsx` |
| Shared UI (modal, button shell, brand) | `src/components/` |
| Auth / session React state | `src/components/providers/` |
| Server-only AI call | API route under `src/app/api/` + helper in `src/lib/ai/` |
| Persist drafts | `src/lib/data/` (keep UI talking to `storyRepository`) |
| New shared type | `src/lib/types.ts` (or next to a lib module if AI-only, e.g. category in prompts) |

---

## `public/`

```text
public/
├── assets/               Backgrounds (e.g. bendaydots.png)
└── brand/                Mascot + logo PNGs (tiny / mid / big variants)
```

Reference in code as `/brand/...` or `/assets/...` (Next.js serves `public/` at the site root).

---

## `docs/`

```text
docs/
├── README.md             Documentation index (start here)
├── project-shaping/      Product intent, scope, workflow (authoritative for “what to build”)
├── design/mockups/       Figma PNG exports + mockup README
├── engineering/          How the codebase works (this folder)
└── plans/                Feature implementation plans (build history)
```

Do **not** move product truth out of `project-shaping/`. Engineering docs describe the code; product docs describe the product.

---

## Root files worth knowing

| File | Role |
|------|------|
| `middleware.ts` | Runs on requests; refreshes Supabase session cookies |
| `.env.example` | Documents required env names |
| `.env.local` | Your real secrets (gitignored — never commit) |
| `next.config.ts` | Next.js config |
| `tsconfig.json` | TypeScript paths (`@/` → `src/`) |

---

## Gaps / TBD

- No `tests/` directory yet
- No `supabase/migrations/` (or similar) yet — see [database.md](database.md)
