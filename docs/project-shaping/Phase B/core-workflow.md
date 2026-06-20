# Phase B — Core Workflow

> Phase B draft (in progress).
>
> Related: [Phase A/problem-definition.md](Phase%20A/problem-definition.md) · [Phase A/product-boundaries.md](Phase%20A/product-boundaries.md) · [v1-scope.md](../v1-scope.md)

---

## Overview

Zap! is a teacher-controlled, AI-assisted classroom storytelling activity designed for projected classroom use with ESL/EFL students ages 6–8.

The workflow prioritizes:

* story-first projected display
* classroom discussion
* low preparation
* minimal cognitive load
* rapid classroom pacing
* resilience when AI fails

The story is not the goal.

The story is the vehicle used to create participation, discussion, creativity, collaboration, and shared ownership.

---

## Principles

1. Teacher authority is always preserved.
2. AI acts as a creative guide, not the decision maker.
3. Classroom momentum is prioritized over perfection.
4. Stories emerge through interaction.
5. Students influence the story through discussion.
6. Drafts are recoverable.
7. Completed stories become classroom artifacts.
8. Every major action should be understandable by a first-time teacher.
9. No single error should permanently interrupt a classroom session.
10. Simplicity is preferred over flexibility whenever possible.

---

## User Journey

### Authentication

Users are not allowed directly into the application. All teachers must authenticate.

```text
Landing
├─ Login
├─ Signup
├─ Forgot Password
└─ Reset Password
```

Authentication is required because:

* AI usage has associated costs
* stories are stored
* teacher identity is required
* future integration with external systems may occur

### Dashboard

After login, teachers arrive at the Dashboard.

```text
Dashboard

+ New Story
+ Saved Stories
```

The dashboard intentionally remains minimal. It is not a management portal or an analytics dashboard. It exists only to direct teachers into the two primary workflows.

---

## Workflow 1 — Create New Story

### Template Selection

```text
Dashboard
    ↓
New Story
    ↓
Template Selection
```

The teacher chooses a template or a blank story. This provides a fast starting point while preserving flexibility.

### Setup Wizard

```text
Template Selection
    ↓
Setup Wizard
```

The wizard collects story setup information. Examples may include:

* characters
* setting
* theme (optional)
* style (optional)
* creativity mode
* other story inputs

The wizard is temporary. No story record exists yet.

#### Wizard Abandonment

If the teacher exits during the wizard:

```text
Progress Lost
```

No draft is created. No wizard state is saved.

### Opening Scene and Draft Creation

```text
Setup Wizard
    ↓
Generate Opening Scene
    ↓
Create Draft Story
```

This is the transition point between setup and activity. The opening scene becomes the beginning of the story.

Immediately after the opening scene is successfully generated, the first persistent record is created. This becomes the official draft story.

---

## Story Workspace

The Story Workspace is the heart of Zap!. This is where classroom discussion occurs.

The default view prioritizes **screen real estate for the story text**. Auxiliary AI content does not appear on the main screen unless the teacher explicitly requests it.

### Layout

```text
------------------------------------------------

Current Story Scene

------------------------------------------------

[ Custom Choice ]          [ End Story ]

[ Plot Ideas ]  [ Discussion Prompts ]  [ Comprehension Questions ]

------------------------------------------------
```

The story scene dominates the display. Teacher controls remain minimal on the main screen. On-demand tools are available through separate teacher-only buttons; each opens a modal or overlay on the same page without navigating away.

### Core Loop

```text
AI presents situation
        ↓
Students discuss
        ↓
Teacher decides direction
        ↓
(Optional) Teacher opens on-demand tools
        ↓
Teacher chooses or enters custom direction
        ↓
AI continues
        ↓
Repeat
```

This loop continues until the teacher decides to end the story.

The teacher may advance the story using **Custom Choice** alone, or open **Plot Ideas** when AI-suggested directions would help. On-demand tools never interrupt the default story view.

### Teacher Tools (On Demand)

Plot ideas, discussion prompts, and comprehension questions are **teacher-activated only**. They are **never** auto-displayed on any screen — including the live story workspace, the review/wrap-up screen, and the completed story archive read-only view.

Behavior:

* each feature has its own button on the story workspace, review screen, or archive view where applicable
* the teacher's action triggers the API call; content is not pre-generated, pre-shown, or mixed into the story display
* results appear in a **modal or screen overlay** on the same page — never inline with or woven into story text
* the overlay is dismissible; closing it returns immediately to the story-first view
* **Regenerate** (or equivalent) is available inside each overlay (plot ideas, discussion prompts, comprehension questions)

**Story vs facilitation content:** On every screen where story text appears, story text and generated prompts/questions remain **clearly distinguishable**. Facilitation content lives only inside its overlay.

These tools support facilitation. They do not permanently consume story screen space.

### Overlay Context (Mid-Session vs Whole-Story)

Discussion prompts and comprehension questions use the same button → overlay pattern everywhere, but the overlay should feel **slightly different by context** so the teacher understands what kind of facilitation they are getting. This is product/UX intent — distinct overlay modes or visual treatment, not pixel-level design.

| Context | Where | Overlay character |
|--------|--------|-------------------|
| **In-session** | Story workspace during an in-progress story | Focused on the **current scene / recent story**; lighter, in-the-moment facilitation |
| **Whole-story** | Review/wrap-up screen and completed story archive | **Distinct overlay treatment**; may address the **full story**, broader themes, recap, and reflection — but generated content is **not limited** to whole-story scope (it may still be scene-specific when appropriate) |

Plot ideas use the in-session overlay only (direction suggestions for what happens next).

### Discussion Prompts

Discussion prompts are **never** shown on the main screen — only inside an overlay after the teacher taps **Discussion Prompts**.

When activated, the API generates facilitation prompts inside the overlay. Prompts should remain concise and easy to read.

Availability:

* **In-session:** button on the story workspace
* **Review/wrap-up screen:** button available; teacher-triggered only (not auto-displayed)
* **Completed story archive:** button available for classroom re-read sessions; teacher-triggered only

Overlay context follows the table above: **in-session facilitation overlay** during live storytelling; **whole-story facilitation overlay** on review and archive screens.

Purpose:

* help inexperienced teachers
* encourage discussion
* reduce classroom silence
* support participation

**Regenerate:** While the overlay is open, the teacher may regenerate prompts without leaving the overlay.

The teacher may dismiss the overlay and continue facilitating live discussion without using generated prompts.

### Plot Idea Choices

Plot idea choices are **not** shown on the main story screen by default.

When the teacher taps **Plot Ideas**, a modal or overlay opens and the API generates three possible directions (Choice A, B, C). These represent possible next steps. Students discuss the options. The teacher decides.

When the teacher selects a choice from the overlay:

```text
Teacher Selects Choice (in overlay)
        ↓
Overlay Closes
        ↓
AI Generates Next Scene
        ↓
Auto Save
        ↓
Display New Scene
```

There is no confirmation screen, no preview screen, and no additional clicks beyond the teacher's selection. New plot ideas are **not** auto-displayed on the main screen after each continuation. The goal is to minimize classroom dead air while keeping the projected view story-first.

### Comprehension Questions

Comprehension questions are **optional, teacher-triggered** facilitation aids — not a grading or assessment system. They are **never** auto-displayed on any screen.

When the teacher taps **Comprehension Questions**, the API generates questions inside a separate overlay. The teacher shares these orally with the class for discussion. Questions never appear inline with story text.

Availability:

* **In-session:** button on the story workspace; teacher activates only when they choose to pause for comprehension discussion
* **Review/wrap-up screen:** button available after the story conclusion is generated; teacher-triggered only (not auto-displayed)
* **Completed story archive:** button on the read-only view for classroom re-read sessions; teacher-triggered only

Overlay context follows the table above: **in-session facilitation overlay** during live storytelling; **whole-story facilitation overlay** on review and archive screens (may include broader recap/reflection questions, but not limited to them).

**Regenerate:** While the overlay is open, the teacher may regenerate questions without leaving the overlay.

Comprehension questions do not auto-show, do not score students, and do not require student accounts.

### Custom Choice

**Custom Choice** is always available on the main story workspace. Teachers may advance the story without opening plot ideas. Selecting **Custom Choice** opens:

```text
Custom Direction

[ Large Text Area ]

[ Submit ]
[ Cancel ]
```

The teacher may enter any story direction. Example:

```text
The dragon becomes friendly and offers to help.
```

The AI then continues the story from that direction.

### Regenerate in Overlay

If generated content does not fit the moment, the teacher can request new content without leaving the overlay. This applies to all three on-demand tools.

**Plot Ideas:**

```text
Plot Ideas Overlay Open
        ↓
Regenerate
        ↓
New Choices (in overlay)
```

Only the choices change. The current scene remains unchanged.

**Discussion Prompts:**

```text
Discussion Prompts Overlay Open
        ↓
Regenerate
        ↓
New Prompts (in overlay)
```

**Comprehension Questions:**

```text
Comprehension Questions Overlay Open
        ↓
Regenerate
        ↓
New Questions (in overlay)
```

```text
History is immutable.
Future options are flexible.
```

---

## Story Lifecycle

### Auto Saving

The story automatically saves:

* after opening scene generation
* after every story round
* after every successful continuation

Teachers never manually save progress.

### Draft vs Completed States

Stories in progress remain drafts.

```text
Draft
    ↓
In Progress
    ↓
Completed
```

Drafts are recoverable.

### Story Length

The teacher may end a story at any time. There is no minimum length and no maximum length.

The system may recommend approximately 3–5 rounds, but does not enforce it. Teacher authority always wins.

### Ending and Completion

```text
Teacher Clicks End Story
        ↓
AI Generates Conclusion
        ↓
Review Screen (story text only)
        ↓
Teacher Clicks Complete
        ↓
Story Marked Complete
```

The teacher may optionally open **Discussion Prompts** or **Comprehension Questions** from the review screen at any time before completing — each opens its whole-story facilitation overlay on button press. These steps are teacher-initiated; they are not part of the default flow above.

### Review Screen

The review screen is **story-first**. The main view displays the full story text only — no discussion prompts, comprehension questions, or other facilitation content mixed into or below the story.

Layout:

```text
------------------------------------------------

Full Story Text

------------------------------------------------

[ Complete ]

[ Discussion Prompts ]  [ Comprehension Questions ]

------------------------------------------------
```

Both facilitation buttons are on-demand only. Tapping either opens a **whole-story facilitation overlay** (distinct from in-session overlays). Generated content appears only inside the overlay, never inline with the story.

Stories are not automatically completed. The teacher explicitly confirms completion.

---

## Workflow 2 — Saved Stories

```text
Dashboard
    ↓
Saved Stories
```

Saved Stories contains:

```text
Saved Stories

├─ Draft Stories
└─ Completed Stories
```

### Draft Stories

Draft stories may be resumed.

```text
Draft Stories
    ↓
Open Draft
```

The teacher sees:

```text
Resume Story

[ Continue ]
```

The story state is preserved. When the teacher opens **Plot Ideas**, they may regenerate choices inside the overlay if needed.

### Completed Stories

Completed stories are archives.

```text
Completed Stories
    ↓
Open Story
    ↓
Read Only View (story text only)
```

The read-only view displays **story text only** on the main screen. Facilitation content is never shown inline with or flowing together with the story.

Layout:

```text
------------------------------------------------

Full Story Text

------------------------------------------------

[ Discussion Prompts ]  [ Comprehension Questions ]

------------------------------------------------
```

Both buttons are on-demand only. Tapping either opens a **whole-story facilitation overlay** (distinct from in-session overlays). Generated content appears only inside the overlay.

Completed stories:

* cannot be continued
* cannot be forked
* cannot create alternate endings

They exist as classroom artifacts.

---

## Failure Handling

If generation fails:

```text
Generation Error
```

The teacher sees:

```text
Something went wrong.

[ Try Again ]

[ Open Plot Ideas ]

[ Enter Custom Choice ]
```

**Product rule:** No single AI failure should end the classroom activity. The teacher must always be able to rescue the lesson.
