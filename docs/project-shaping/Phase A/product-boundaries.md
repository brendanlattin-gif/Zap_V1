# Phase A §3 — Define Product Boundaries

> Related: [problem-definition.md](problem-definition.md) · [success-criteria.md](success-criteria.md) · [../v1-scope.md](../v1-scope.md)

Zap! is a teacher-controlled, AI-assisted classroom storytelling activity for ESL/EFL teachers working with beginner students ages 6–8, designed for projected whole-class use.

---

## 1. What The Product Is

**Zap!** is a teacher-led interactive choose-your-own-adventure storytelling activity powered by AI.

The product is designed for projected classroom use where teachers facilitate a story and students influence what happens next.

The core experience is:

> "What happens next?"

The story emerges through interaction between the AI, teacher, and students.

### Core Product Loop

1. AI presents the current story situation.
2. When the teacher requests them, AI provides plot ideas, discussion prompts, or comprehension questions through on-demand overlays.
3. Students discuss ideas.
4. Teacher selects a plot idea or enters a custom direction.
5. AI continues the story.
6. Repeat until the story concludes.

The default projected view remains **story-first**. Auxiliary AI content appears only when the teacher activates it.

---

## 2. What The Product Is Not

Zap! is not:

* a one-click AI story generator
* a writing assistant
* a lesson planning tool
* a curriculum platform
* a grading system
* a classroom management system
* a school administration platform
* a general teacher utility toolbox

---

## 3. Non-Negotiable Product Rules

### Rule 1 — Interaction Is Required

A story must progress through decisions.

Removing decisions removes the product.

A start-to-finish story generator is outside the product boundary.

### Rule 2 — Teacher Authority Is Required

Students may influence the story.

The teacher always retains final control.

### Rule 3 — AI Is A Creative Guide

The AI should:

* suggest possibilities
* increase creativity
* rescue dead ends
* help students express ideas
* help teachers facilitate discussion
* maintain classroom momentum

The AI is a co-author and guide, not merely a text generator.

V1 rescue controls that support these rules are defined in [../product-principles.md](../product-principles.md).

---

## 4. Strongly Encouraged Outcomes

The product should encourage:

* participation
* discussion
* creativity
* collaboration
* shared ownership

These are desired outcomes, not hard requirements.

Teachers can still run successful sessions with varying levels of participation.

---

## 5. Explicit V1 Exclusions

Out of scope for V1:

* student devices
* AI-generated illustrations

These may be valuable future enhancements but are not required to validate the core storytelling experience.

The detailed V1 feature inclusion and exclusion list is in [../v1-scope.md](../v1-scope.md).

---

## 6. Future Ideas Out Of Scope For V1

Potential future exploration:

* student voting
* team-based participation
* debate activities
* additional discussion-driven classroom experiences

These should not be built until the core storytelling workflow is validated.

---

## 7. What Constitutes Scope Creep

For V1, a feature is scope creep if it does not directly improve one of:

* story quality
* story interaction
* student influence
* teacher facilitation
* classroom discussion
* workflow clarity
* ease of use

**In bounds for V1:** on-demand comprehension questions that support live teacher-led discussion — provided they remain optional facilitation aids, not grading, curriculum tracking, or vocabulary analytics.

**Out of bounds:** auto-scored quizzes, student answer collection, standards mapping, or any feature that reframes Zap as a lesson-planning or assessment platform.

---

## 8. V1 Simplicity Rule

Missing a useful feature is less dangerous than adding a feature that makes the workflow harder to understand.

When in doubt:

* choose the simpler workflow
* reduce clicks
* reduce decisions
* reduce configuration
* preserve clarity

A first-time teacher should always know:

* What is happening now?
* What do I do next?
