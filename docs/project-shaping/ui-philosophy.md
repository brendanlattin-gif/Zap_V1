# UI Philosophy

> Projected-classroom visual intent for Zap!. Behavioral rules (overlays, teacher tools) are in [Phase B/core-workflow.md](Phase%20B/core-workflow.md). Slice 1 specifics are in [prototype-slice-1.md](prototype-slice-1.md).
>
> Related: [Phase A/problem-definition.md](Phase%20A/problem-definition.md)

---

## Core Intent

Zap! is designed for **projected whole-class use**. The teacher controls the app; students watch together. The UI must support a busy classroom: low cognitive load, clear next actions, and story as the center of attention.

---

## Story-First Hierarchy

* The story is always the primary focus.
* Teacher controls are visible but secondary — never competing with the narrative for attention.
* Auxiliary AI content (plot ideas, prompts, questions) lives in **on-demand overlays only**, never mixed into the main story display.

---

## Slice 1 Workspace Display

Aligned with available mockups:

* **Compact view** on the main workspace — readable story text with room for teacher controls on the same screen.
* **Optional full-screen modal** for large, classroom-projected reading when the teacher wants maximum text size for the class.

Both patterns serve the story-first principle: the class should always be able to read and follow the story comfortably.

---

## On-Demand Overlays

* Plot ideas, discussion prompts, and comprehension questions open in modals or overlays on the same page.
* Closing an overlay returns immediately to the story-first view.
* Facilitation content and story text remain **clearly distinguishable**.

---

## Visual Consistency

* Match mockup mood, layout, and hierarchy where mockups exist (`docs/design/mockups/`).
* For screens without mockups, use simple, consistent UI that follows the same visual language.
* Do not invent a major new design system mid-build.

---

## Room for Future (do not block in Slice 1)

The UI architecture should not prevent later additions:

* Genre/tone template selection
* AI-generated illustrations
* Mascot and brand animation
* Rotating placeholder suggestions in wizard fields
* Wizard AI suggestion modals

Keep components and layout flexible enough to add these without rewriting core screens.
