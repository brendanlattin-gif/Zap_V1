# Prototype Slice 1 — First Code Build

> **Authority for the first code build.** Full V1 product truth remains in [Phase B/core-workflow.md](Phase%20B/core-workflow.md), [v1-scope.md](v1-scope.md), and related Phase A docs. This document states what is in and out of the initial prototype only.
>
> Related: [ui-philosophy.md](ui-philosophy.md) · [v1-scope.md](v1-scope.md) · [product-principles.md](product-principles.md)

---

## Product Goal

Clickable local MVP of the core Zap! teacher workflow:

```text
Landing (auth UI shells, stubbed login)
    ↓
Dashboard
    ↓
Story Starters wizard
    ↓
Generate opening scene
    ↓
Story workspace
    ↓
Custom choice or plot ideas overlay
    ↓
Auto-saved draft
    ↓
Resume from dashboard
```

This is not the full app. It is the first working slice of the product.

---

## Stack (documented now — implement in build phase)

| Layer | Choice |
|-------|--------|
| Framework | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Data | Supabase-oriented structure; mock or local storage acceptable in Slice 1 if full Supabase setup would slow the MVP |
| AI | OpenAI API, server-side only |

### Planned environment variables

Document in `.env.example` during build (no real secrets in the repo):

```text
OPENAI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Slice 1 may run with only `OPENAI_API_KEY` if using stub auth and local/mock storage. Add Supabase variables when connecting real persistence.

---

## Story Starters Wizard (Slice 1)

Three inputs only:

| Field | Purpose |
|-------|---------|
| **Characters** | Who is in the story |
| **Setting** | Where the story takes place |
| **Story** | Plot starter / story idea (simple label for classroom use) |

Optional helper copy for the Story field: *"What should this story be about?"*

### Glossary (avoid naming confusion)

| Term | Meaning |
|------|---------|
| **Story (setup field)** | The teacher's story idea entered before generation |
| **Story text / story beats (workspace)** | Generated narrative content built during the activity |

**Recommended internal/code naming:** `storyStarter` or `storyIdea` for the setup field; `storyText` or `storyBeats` for generated content.

---

## Story Workspace UX (Slice 1)

Aligned with available mockups — see [ui-philosophy.md](ui-philosophy.md).

* Main workspace shows story in a **compact, readable** format so teacher controls fit on screen.
* **Optional full-screen modal** for large, classroom-projected reading.
* Story remains the visual focus; teacher controls are secondary.
* **Custom Choice** and **Plot Ideas** follow the on-demand overlay pattern from [core-workflow.md](Phase%20B/core-workflow.md). Plot ideas appear in an overlay only — never inline with story text.

Slice 1 includes **Custom Choice** and **Plot Ideas** only. Discussion prompts, comprehension questions, and End Story are deferred (full V1).

---

## Save Behavior

* **Auto-save** after opening scene generation and after each successful story continuation.
* Teachers do not manually save progress in normal use.
* Include a **visible save-state indicator** (e.g. status text or control showing "Saving…" / "Saved").
* No manual Save button required in Slice 1.

---

## Authentication (Slice 1)

* Build **login, signup, and forgot-password page shells** matching long-term [core-workflow.md](Phase%20B/core-workflow.md).
* Functional auth is **stubbed** (e.g. "Enter as teacher") until real Supabase auth is added.
* Routes and structure should allow swapping in real Supabase auth later without rewriting the app.

---

## Data Model (Slice 1)

Keep it simple. A draft story record should include:

| Field | Notes |
|-------|-------|
| `id` | Unique identifier |
| `title` | Optional; auto-derived from story starter or first line is acceptable for Slice 1 |
| `characters` | Setup input |
| `setting` | Setup input |
| `storyStarter` | Setup input (the "Story" field) |
| `openingScene` | First generated narrative |
| `storyBeats` | Array or structured list of generated scenes |
| `currentStoryText` | Full or current display text (derive from beats if preferred) |
| `savedChoices` | Selected plot ideas / custom directions (if tracked) |
| `status` | `draft` in Slice 1 |
| `created_at` | Timestamp |
| `updated_at` | Timestamp |

---

## Architecture Expectations

Per [success-criteria.md](Phase%20A/success-criteria.md), keep layers separable:

* **UI layer** — pages, components, projected display
* **Story engine layer** — story state, beats, continuation logic
* **AI / prompt layer** — OpenAI calls, prompt templates
* **Data layer** — persistence (Supabase or swappable mock)

**Extension points (do not implement in Slice 1):** image generation, genre/tone templates, wizard AI suggestion modals, rotating field placeholders, creativity mode, real auth, discussion/comprehension tools.

---

## In Scope (Slice 1)

* Landing page
* Auth page shells + stubbed entry
* Minimal dashboard (Create New Story + resume saved drafts)
* Story Starters wizard (Characters, Setting, Story)
* Generate opening scene (OpenAI or clearly marked mock fallback)
* Story workspace with custom choice + plot ideas overlay
* Auto-save + save-state indicator
* Resume saved draft from dashboard

---

## Out of Scope (Slice 1)

* Genre/tone template selection page
* Wizard AI suggestion modals (character, setting, story starters)
* Rotating grey placeholder suggestions in wizard fields
* Creativity mode (safe/balanced/wild)
* Template selection as pre-filled wizard shortcuts
* Discussion prompts, comprehension questions
* End story / review / complete flow
* Completed story archive polish
* Real Supabase auth (beyond structure + stubs)
* Student accounts, voting, multiplayer, admin, payments, analytics
* AI-generated illustrations
* Mascot animation, heavy polish, full mobile optimization

---

## Future (documented — not Slice 1)

### Genre / tone "templates" (redefined)

Not pre-filled wizard fields. A future **genre/tone selection** step (e.g. Adventure, Mystery, Comedy) gives the AI instructions for the general tenor, tropes, and likely direction of the story — influencing later AI suggestions in modals and plot ideas.

May appear as a step before the wizard or on the dashboard. **Not in Slice 1; no placeholder page required.**

### Other future items

* Wizard AI suggestion modals
* Rotating field placeholder suggestions
* Creativity mode (safe/balanced/wild)
* Real Supabase authentication
* Full V1 facilitation tools (discussion prompts, comprehension questions, end story)
* AI-generated illustrations

---

## Design Asset Plan

Paths only — add files before or during build:

| Path | Purpose |
|------|---------|
| `docs/design/mockups/` | Figma exports for layout reference (landing, Story Starters, suggestion modals, story beginning, etc.) |
| `public/brand/` | Logo, mascot (site assets) |
| `public/assets/` | Other UI images if needed |

Mockups are visual guidance, not pixel-perfect specifications.

---

## Acceptance Criteria (for the build phase)

When running locally, the product owner can:

1. See the Zap! landing page
2. Enter as teacher (stub)
3. Reach the dashboard
4. Start a new story and complete Story Starters (Characters, Setting, Story)
5. Generate an opening scene
6. Use the story workspace (compact view + optional full-screen reader)
7. Use custom choice or plot ideas overlay and advance the story
8. Have the draft auto-saved with visible save confirmation
9. Return to the dashboard and resume the saved draft

---

## Open Decisions (minimal)

| Topic | Slice 1 default | Revisit when |
|-------|-----------------|--------------|
| `title` on drafts | Auto-derived from story starter or first scene line | Full V1 archive polish |
| Persistence | Supabase if practical; else mock with clean swap path | Connecting real Supabase |
| Mock OpenAI fallback | Clearly marked placeholder text when no API key | First local test without key |
