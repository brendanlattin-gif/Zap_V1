# Story Starters wizard header

> **Purpose:** Breakpoints and layout rules for the `/stories/new` header after the header redo.  
> **Source of truth:** [`src/app/stories/new/page.tsx`](../../src/app/stories/new/page.tsx). If code and this doc disagree, trust the code and update this file.

---

## Layout (mobile-first)

| Viewport | Mascot | Title | Zap! logo |
|----------|--------|-------|-----------|
| **&lt; 768px (`md`)** — body columns **stacked** | **Hidden** | **Starters** — ink; `pl-1.5` without mascot | Always visible; scales (`min(40vw, 7.5rem)`); intrinsic size **`2xl`** (280px) |
| **768px – 1023px (`md`)** — columns side by side | Visible; caps `7.25rem` → `7.5rem` at `lg` | **Story Starters** — ink; **`text-4xl`** | Wider caps; `self-center` + `translate-y-1` |
| **≥ 1024px (`lg`)** | Same | **Story Starters** — ink; **`text-5xl`** | Caps `11rem` at `lg` |

Title / mascot visibility track the wizard body grid (`md:grid-cols-3`), not `sm`. Older **560px** / **640px** title switches are retired for this page.

---

## Hard rules

1. **Title never wraps** — `whitespace-nowrap` on the `h1`. Prefer shortening (“Starters”) or reducing type size over a two-line title.
2. **No invisible spacers** — don’t use `invisible` Zap!/mascot to fake-center the title.
3. **Title color** — `text-zap-ink` (same family as body column headings), not Zap red (avoids clashing with the red Zap! mark).

---

## Why the Zap! logo has uneven padding

The asset has more transparent space under the wordmark than above it. Equal vertical centering looks “high” in the bar. Extra `pt` (and less `pb`) on the logo wrapper is intentional optical centering.
