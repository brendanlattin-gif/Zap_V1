# V1 Feature Scope

> Implementation checklist for Zap! V1. Conceptual product boundaries are defined in [Phase A/product-boundaries.md](Phase%20A/product-boundaries.md).
>
> Related: [Phase A/problem-definition.md](Phase%20A/problem-definition.md) · [Phase A/success-criteria.md](Phase%20A/success-criteria.md) · [prototype-slice-1.md](prototype-slice-1.md)

---

## V1 Included Features

Included:

* teacher login/auth, likely Supabase
* new story flow
* guided setup wizard (Characters, Setting, Story)
* genre/tone selection (future — AI tenor/tropes, not pre-filled wizard fields; post–Slice 1)
* optional theme/style (V1-later)
* creativity mode (safe/balanced/wild; V1-long-term, deferred past Slice 1)
* opening scene
* on-demand plot idea choices (3 choices when generated; modal/overlay, not always on screen)
* on-demand discussion prompts (modal/overlay, teacher-activated; in-session and whole-story overlay contexts)
* on-demand comprehension questions (modal/overlay, teacher facilitation; not grading or assessment; in-session and whole-story overlay contexts)
* regenerate in overlay for plot ideas, discussion prompts, and comprehension questions
* custom choice (always available on main story workspace)
* 3–5 rounds
* ending generation
* save story
* saved story archive
* projected-friendly UI

---

## Explicitly Excluded From V1

Not V1:

* AI-generated illustrations (see [product-boundaries.md](Phase%20A/product-boundaries.md) §5) — architecture should not block future image generation
* student devices, student accounts, and multiplayer (see product-boundaries §5)
* live voting
* teams
* points
* leaderboards
* gamification
* branching story tree
* continue/fork saved stories
* curriculum tracking
* vocabulary analytics
* grading or student scoring for comprehension questions
* classroom management
* school admin dashboard

---

## One-Sentence Product Definition

> Zap! is a projected, teacher-controlled AI storytelling activity for ESL teachers of ages 6–8, designed to create a fun, low-prep, 30–40 minute classroom experience while establishing a clean technical foundation for future features.

---

## Prototype Slice 1

The first code build is scoped in [prototype-slice-1.md](prototype-slice-1.md). Slice 1 is a subset of V1; features marked future or deferred there are still valid V1 targets unless explicitly excluded above.

---

## References

* First code build scope: [prototype-slice-1.md](prototype-slice-1.md)
* Success, failure, and validation criteria: [Phase A/success-criteria.md](Phase%20A/success-criteria.md)
* Product boundaries and scope creep rules: [Phase A/product-boundaries.md](Phase%20A/product-boundaries.md)
