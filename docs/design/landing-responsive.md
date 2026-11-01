# Landing page responsive layout

> **Purpose:** Record how the Zap! landing page (`/`) adapts across screen widths so we don’t lose the reasoning when we revisit styling later. Written for a design-minded beginner learning Tailwind while building the app.

**Source of truth:** [`src/app/page.tsx`](../../src/app/page.tsx) (layout) and [`src/components/Brand.tsx`](../../src/components/Brand.tsx) (logo / mascot pixel sizes). If the code and this doc disagree, trust the code and update this file.

---

## Quick glossary

| Term | Plain meaning |
|------|----------------|
| **Viewport** | The visible browser window (not the whole monitor). |
| **Breakpoint** | A width (in pixels) where the layout changes. Example: “from 640px and up, use two columns.” |
| **Mobile-first** | Write the **small-screen** styles first, then add overrides for larger widths (`min-[640px]:…`, `sm:…`). |
| **Arbitrary value** | A custom Tailwind value in brackets, e.g. `min-[520px]:` or `max-w-[70%]`, when a built-in name isn’t enough. |
| **`flex-col` / `flex-row`** | Flexbox direction: stack children **vertically** vs place them **in a row**. |
| **`fr`** | “Fraction” of leftover space in a CSS grid. `1fr_1.2fr` = text column slightly wider than mascot column. |
| **`max-w-md`** | Max width ~28rem for an element. Caps how wide a paragraph can grow even inside a wider column. |
| **`vh`** | Viewport height unit. `70vh` ≈ 70% of the window’s height. |
| **`min(70vh, 900px)`** | Use whichever is **smaller**: 70% of viewport height, or 900px (a ceiling so ultratall screens don’t get a huge card). |

---

## File map

| File | Role |
|------|------|
| [`src/app/page.tsx`](../../src/app/page.tsx) | Landing page UI: white card, header, hero grid, CTA, button |
| [`src/components/Brand.tsx`](../../src/components/Brand.tsx) | `ZapLogo` sizes (`sm` 64 / `md` 96 / `lg` 120 / `xl` 210) and `BookMascot` (`lg` draws at 280px wide unless CSS `max-w-*` caps it) |

**Why Brand sizes matter:** Changing `className` max-width only helps up to the image’s intrinsic width from Brand. To go larger than that, you change Brand (or add a new size token).

---

## Breakpoint table (what the code does today)

Widths below are **viewport width**. Ranges are approximate; CSS uses `min-width`, so “from 640px up” means ≥ 640px.

| Viewport width | Logo (`ZapLogo`) | Mascot | Hero layout | H1 CTA text | Body `<p>` + button | White card min-height |
|----------------|------------------|--------|-------------|-------------|---------------------|------------------------|
| **&lt; 520px** | `lg` (120px) | `max-w-[70%]` of its column | One column (stacked) | **Write a story!** | Stacked (column) | No forced tall min-height (`min-h-0`) — card hugs content |
| **520px – 639px** | `xl` (210px) | up to `max-w-[280px]` | Still one column | **Write a story!** | **Side by side** (row) | Still `min-h-0` |
| **640px – 779px** | `xl` | up to 280px | **Two columns** `1fr_1.2fr` (text a bit wider) | **Write a story!** | Stacked again (column under the headline) | `min-h-[min(70vh,900px)]` — card fills more vertical space |
| **≥ 780px** | `xl` | up to 280px | Two columns `0.85fr_1.35fr` (text clearly wider) | **Let’s write a story!** (+ `sm:text-5xl` when `sm` also matches) | Stacked; paragraph may use full column width (`max-w-none`) | Same tall min-height |

### Also used: Tailwind `sm:` (~640px)

On this page, `sm:` appears for:

- Outer padding: `p-4 sm:p-8` on `<main>`; card `p-8 sm:p-12`
- Header spacing: `sm:mb-10`, nav `sm:gap-6 sm:text-lg`
- Long H1: `sm:text-5xl` (only when that H1 is visible, i.e. ≥ 780px)
- Body text: `sm:text-xl`

**Note:** Custom `min-[640px]:` and Tailwind `sm:` are both ~640px. They often kick in together; that’s fine, but don’t assume every `sm:` rule is unrelated to the 640 layout shift.

### ASCII sketches

**Narrow (&lt; 520)** — stacked, short title, button under copy:

```
┌─────────────────────────┐
│  [logo lg]     Login…   │
│   Story Gen             │
│      [mascot ~70%]      │
│   Write a story!        │
│   body copy…            │
│              [Sign Up!] │
└─────────────────────────┘
```

**Mid band (520–639)** — still stacked hero, but copy + button on one row:

```
┌─────────────────────────┐
│  [logo xl]     Login…   │
│      [mascot]           │
│   Write a story!        │
│   body copy…  [Sign Up!]│
└─────────────────────────┘
```

**Wide (≥ 640)** — two columns; button under copy again:

```
┌──────────────────────────────┐
│ [logo xl]          Login…    │
│  [mascot]  │  Write / Let’s… │
│            │  body copy…     │
│            │       [Sign Up!]│
└──────────────────────────────┘
```

---

## Layout patterns (novice annotations)

### 1. Dual logo show / hide

We render **two** `ZapLogo`s and show only one:

- `min-[520px]:hidden` → smaller `lg` logo on narrow screens  
- `hidden min-[520px]:block` → larger `xl` logo from 520px up  

**Why two components?** `ZapLogo` takes a single `size` prop (`"lg"` or `"xl"`). There is no `size="lg sm:xl"`. So we swap visibility with CSS instead.

**Why this exists:** Big logo on desktop; less crowding in the header on phones.

### 2. “Story Gen” under the **right** side of the logo

Wrapper: `inline-flex flex-col items-end`.

- `inline-flex` → box only as wide as the logo  
- `items-end` → label aligns to the right edge  

**Why this exists:** Matches the logo art better than left-aligned subtitle text.

### 3. Body copy + button flex cascade (mobile-first overrides)

On the wrapper around `<p>` + `<button>`:

1. Base: `flex-col` — stacked on the smallest screens  
2. `min-[520px]:flex-row` — side by side from 520px up  
3. `min-[640px]:flex-col` — stacked **again** once the two-column hero starts  

**Why the second `flex-col`?** Without it, the row from 520px would continue forever. At 640px the mascot sits beside the whole text block, so the button should sit under the paragraph again—not beside it in a cramped text column.

### 4. Grid column ratios

```txt
min-[640px]:grid-cols-[1fr_1.2fr]
min-[780px]:grid-cols-[0.85fr_1.35fr]
```

**Why this exists:** Give the text column more room on large screens so the long CTA (“Let’s write a story!”) can sit more comfortably on one line.

### 5. Paragraph `max-w-md` until 780px

```txt
max-w-md … min-[780px]:max-w-none
```

- Below 780: paragraph is capped (~medium width) so lines don’t get overly long in some mid layouts.  
- From 780 up: remove the cap so the wider text column can actually be used.

`min-w-0 flex-1` helps the paragraph shrink/grow correctly inside a flex row (especially in the 520–639 band).

### 6. Primary button

| Detail | In code | Why |
|--------|---------|-----|
| `whitespace-nowrap` | yes | Keeps “Sign Up!” on one line (no stacked words) |
| Padding | `px-5 py-2` | Tighter than the default primary button padding on this page only |
| Label | `Zap!` if signed in, else `Sign Up!` | Same click handler: dashboard vs signup |
| `min-[640px]:mt-4` | yes | Extra top gap when the button is back under the paragraph |

---

## Open / deferred (TODO — not implemented)

These were discussed while styling but are **not** in the current code. Do not treat them as live behavior:

- [ ] Optional `<br />` / widow control on the long CTA (“Let’s write…”)  
- [ ] Further polish of mid-width title wrapping between ~640 and ~780  
- [ ] Aligning more rules to a single shared breakpoint token (optional cleanup later)

---

## How to re-test

Resize the browser (or DevTools device width) and check:

| ~Width | Look for |
|--------|----------|
| **400** | Small logo (`lg`); mascot uses ~70% width; short H1; button under copy; card not forced to 70vh |
| **520** | Logo jumps to `xl`; mascot max 280px; **copy + button in a row** |
| **560** | Same mid-band behavior; button should stay beside copy if space allows |
| **640** | Two-column grid; button **under** copy again; card min-height ~70vh (capped at 900px) |
| **700** | Still short H1 (“Write a story!”) until 780 |
| **780** | Long H1 (“Let’s write a story!”); wider text column; paragraph `max-w-none` |
| **900** | Comfortable desktop: breathing room, long title, Sign Up / Zap! readable |

Also confirm: Login / Signup nav still usable; “Story Gen” stays under the right side of the logo.

---

## Related docs

- [mockups/README.md](mockups/README.md) — Figma PNG for the original landing composition  
- [ui-philosophy.md](../project-shaping/ui-philosophy.md) — broader UI intent  
- [naming-conventions.md](../engineering/naming-conventions.md) — `zap-*` tokens and fonts  
