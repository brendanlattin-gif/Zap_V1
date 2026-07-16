# Zap! documentation

> Start here when you need to find the right doc. This repo keeps **product** intent, **engineering** how-to, **design** mockups, and **feature plans** in separate folders on purpose.

---

## Which folder should I open?

| I want to… | Open |
|------------|------|
| Understand what Zap! is and what’s in Slice 1 | [project-shaping/](project-shaping/) |
| See screen mockups | [design/mockups/](design/mockups/) |
| Understand how the code is organized / how auth & AI work | [engineering/](engineering/) |
| Read a past feature build plan | [plans/](plans/) |

---

## Product docs (`project-shaping/`)

Authoritative for **what to build** and classroom product rules.

| Doc | Description |
|-----|-------------|
| [prototype-slice-1.md](project-shaping/prototype-slice-1.md) | What is in / out of the first code build |
| [v1-scope.md](project-shaping/v1-scope.md) | Broader V1 scope |
| [product-principles.md](project-shaping/product-principles.md) | Product principles |
| [ui-philosophy.md](project-shaping/ui-philosophy.md) | UI philosophy |
| [Phase A/problem-definition.md](project-shaping/Phase%20A/problem-definition.md) | Problem definition |
| [Phase A/product-boundaries.md](project-shaping/Phase%20A/product-boundaries.md) | Product boundaries |
| [Phase B/core-workflow.md](project-shaping/Phase%20B/core-workflow.md) | Core teacher workflow |

---

## Design (`design/`)

| Doc | Description |
|-----|-------------|
| [mockups/README.md](design/mockups/README.md) | Index of Figma PNG mockups (landing, wizard, suggestion modals, workspace) |

---

## Engineering (`engineering/`)

How the **codebase** works today. Prefer accuracy over aspirational schemas.

| Doc | Description |
|-----|-------------|
| [architecture.md](engineering/architecture.md) | Routes, auth, AI, data flow, client vs server |
| [tech-stack.md](engineering/tech-stack.md) | Frameworks, libraries, env vars |
| [folder-structure.md](engineering/folder-structure.md) | Where files live under `src/`, `public/`, `docs/` |
| [naming-conventions.md](engineering/naming-conventions.md) | Types, routes, `zap-*` CSS, story field names |
| [database.md](engineering/database.md) | Auth + localStorage drafts; no invented SQL schema |
| [github-workflow.md](engineering/github-workflow.md) | Git/GitHub habits (mostly proposed) |

---

## Plans (`plans/`)

Feature implementation plans (cleaned from Cursor plans). Historical; mark status on each file.

| Doc | Description |
|-----|-------------|
| [plans/README.md](plans/README.md) | Index of plans |
| [supabase-auth-ui.md](plans/supabase-auth-ui.md) | Supabase auth UI + email/password (Implemented) |
| [wizard-idea-modals.md](plans/wizard-idea-modals.md) | Wizard AI suggestion modals (Implemented) |

---

## Note for agents

- Product decisions → `docs/project-shaping/`
- Code placement and patterns → `docs/engineering/`
- Do not invent database tables; update [database.md](engineering/database.md) when persistence is actually built
