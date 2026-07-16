# Database & Persistence

> **What this file is for:** Honest picture of where user and story data live **today**. Do not treat this as a full production schema — no invented tables.
>
> Related: [architecture.md](architecture.md) · [tech-stack.md](tech-stack.md)

---

## Summary (current)

| Concern | Implementation | Status |
|---------|----------------|--------|
| Teacher accounts / login | **Supabase Auth** (email/password) | Implemented |
| Story drafts | **Browser `localStorage`** via `LocalStoryRepository` | Implemented |
| App database tables (stories, etc.) | — | **Not implemented** |
| SQL migrations in repo | — | **None** |
| Row Level Security (RLS) policies in repo | — | **None** |

---

## Auth (Supabase)

Teachers sign up and sign in with email/password. Session cookies are refreshed in Next middleware.

**Relevant code:**

- `src/lib/supabase/client.ts` — browser client
- `src/lib/supabase/middleware.ts` + root `middleware.ts` — session refresh
- `src/lib/supabase/server.ts` — server client ready, **unused so far**
- `src/components/providers/AuthProvider.tsx` — sign up / in / out, session state
- Signup stores `display_name` in user metadata

**Env (names only):** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (unused in code).

Auth users live in Supabase’s managed auth store (not a custom table defined in this repo).

---

## Story drafts (localStorage)

**Active repository:** `LocalStoryRepository` (`src/lib/data/local-story-repository.ts`)

- Storage key: `zap.storyDrafts.v1`
- Operations: list, get, create, update, delete drafts
- UI imports `storyRepository` from `src/lib/data`

**In-memory / type shape** (TypeScript, not a SQL table): `StoryDraft` in `src/lib/types.ts` — includes setup fields, beats, `currentStoryText`, `status: "draft"`, timestamps, etc.

**Implications:**

- Drafts stay on that browser/device
- Clearing site data loses drafts
- Signing into another machine does not sync stories yet

The repository **interface** is written so a future Supabase-backed implementation can replace local storage without rewriting pages.

---

## What is not in the repo

- No `supabase/migrations` (or equivalent) folder
- No Postgres table definitions for stories
- No RLS policy files
- No use of `SUPABASE_SERVICE_ROLE_KEY` for admin/data access

---

## Proposed later (not built — customize before implementing)

When cloud drafts are needed, a typical next step would be:

1. Design tables (e.g. stories owned by `auth.uid()`)
2. Add migrations + RLS so teachers only see their rows
3. Implement `SupabaseStoryRepository` behind the same `storyRepository` interface
4. Update this file to match what was actually shipped

Any schema written before that build should be labeled **Proposed** and treated as open to change.

---

## Gaps / TBD

- Cloud story persistence
- Server-side enforcement that only the owner can load a draft by id
- Whether unfinished wizard state should ever be persisted (today: no)
