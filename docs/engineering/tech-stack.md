# Tech Stack

> **What this file is for:** Which tools Zap! uses and why, based on `package.json` and `.env.example`. For how they connect, see [architecture.md](architecture.md).
>
> Related: [prototype-slice-1.md](../project-shaping/prototype-slice-1.md) (original stack decisions)

---

## Runtime

| Tool | Version (approx.) | Used for | Why |
|------|-------------------|----------|-----|
| **Next.js** | 15.x | App framework, App Router pages, API routes | Modern React full-stack app with file-based routing |
| **React / React DOM** | 19.x | UI components | Standard for Next.js apps |
| **TypeScript** | 5.x | Typed JavaScript | Catch mistakes early; clearer shared types |
| **Tailwind CSS** | 4.x | Styling | Utility classes + custom `zap-*` tokens in `globals.css` |
| **Supabase JS + SSR** | `@supabase/supabase-js`, `@supabase/ssr` | Email/password auth, cookie sessions | Auth now; structure ready for later cloud data |
| **OpenAI SDK** | `openai` | Story / idea generation on the server | Classroom-friendly generation with mock fallback when no key |

---

## Dev tooling

| Tool | Used for |
|------|----------|
| ESLint + `eslint-config-next` | Lint React/Next code |
| `@types/*` | TypeScript types for Node and React |
| `@tailwindcss/postcss` | Tailwind v4 PostCSS pipeline |

---

## Environment variables

Defined in [`.env.example`](../../.env.example). Copy to `.env.local` (gitignored) for local secrets.

| Variable | Required? | Purpose |
|----------|-----------|---------|
| `OPENAI_API_KEY` | Optional for Slice 1 | Real AI; without it, mock text is used |
| `NEXT_PUBLIC_SUPABASE_URL` | Needed for auth | Supabase project URL (safe to expose in browser) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Needed for auth | Public anon key (safe to expose; RLS still matters later) |
| `SUPABASE_SERVICE_ROLE_KEY` | Not used in code yet | Server-only privileged key — never put in client code |

`NEXT_PUBLIC_*` means Next.js embeds the value in the browser bundle. Never prefix a secret that way.

---

## Scripts (`package.json`)

| Command | What it does |
|---------|----------------|
| `npm run dev` | Local development server |
| `npm run build` | Production build |
| `npm start` | Run production build |
| `npm run lint` | ESLint |

---

## Gaps / TBD

- No CI (GitHub Actions) in the repo yet
- No database ORM/client for story tables yet (drafts use localStorage)
- Service role key documented but unused
