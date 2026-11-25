# Parallax Editorial — Style Reference

> Long-form on warm paper, foreground and background moving at different speeds, a page-turn stretched into a journey.

**Theme:** light

Parallax editorial stitches editorial typesetting to physical depth: a warm-paper ground (#f5f0e6) with near-black ink text (#1a1712), a drop cap 3 to 4 lines tall in brick red, chapter numbers and quotes sharing that same brick red, everything else ink. Parallax uses transform only — never mutate top, margin or height in scroll events, which triggers reflow and stutter. Depth runs at most three layers; more turns to mud. Body text is never the parallax subject, line length stays under 75 characters; mobile must weaken or disable parallax or performance and comfort both suffer.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1a1712` | `--color-ink` | Body and titles. A warm near-black, like printing ink. |
| Warm Paper | `#f5f0e6` | `--color-warm-paper` | Page ground. A yellow-leaning paper — never pure or cold white. |
| Brick Red | `#b3401f` | `--color-brick-red` | The only accent: drop caps, chapter numbers, quotes and links. Never a large block. |
| Deep Umber | `#2e2a22` | `--color-deep-umber` | Dark sections and quote grounds, the warmed version of ink. |
| Sand | `#c9bba0` | `--color-sand` | Secondary sections and image backing, sectioning without breaking the paper feel. |

## Typography

### Source Serif — serif for body and titles alike. Line height 1.75, measure capped at 75 characters — the precondition for parallax not disturbing reading.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 14, 16, 19, 26, 34, 48
- **Line height:** 1.15 (display), 1.3 (headings), 1.75 (body)
- **Letter spacing:** -0.01em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Source Serif | 600 | 48px | 1.15 | -0.01em | `--text-display` |
| heading | Source Serif | 600 | 34px | 1.25 | — | `--text-heading` |
| subheading | Source Serif | 400 | 26px | 1.35 | — | `--text-subheading` |
| body-lg | Source Serif | 400 | 19px | 1.75 | — | `--text-body-lg` |
| body | Source Serif | 400 | 16px | 1.75 | — | `--text-body` |
| label | Source Serif | 600 | 14px | 1.5 | 0.14em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 8 | 8px | `--spacing-8` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 96 | 96px | `--spacing-96` |
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 4px |
| buttons | 4px |
| images | 2px |

- **Page max-width:** 960px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Drop Cap

**Role:** the drop cap (identity core)

The paragraph's first letter floats left, sized about 3.4× the body (line height spanning three to four lines), brick red, 8px to its right and below, same serif as the body. One per long-form section, only on the first paragraph.

### Parallax Layer

**Role:** the parallax layer

On scroll, move only with transform: translate3d(0, Ypx, 0), Y computed as scroll progress times rate (back 0.15, mid 0.30, fore 1.0). Never read or write layout properties in scroll handlers (offsetTop, getBoundingClientRect, top, margin, height). At most three rate layers per screen. Under prefers-reduced-motion all layers zero out.

- **Sizes:** rates 0.15 / 0.30 / 1.0

### Sticky Interlock

**Role:** the image-text lock (sticky overlap)

The image container is sticky top-24, 60vh tall; the body column scrolls normally and covers it paragraph by paragraph. Images never scale or fade — position alone creates the "page-turn" illusion. Mobile drops sticky, stacking image and text.

### Chapter Number

**Role:** the chapter number

Brick red, 14px/600, 0.14em tracking, uppercase, 16px above the title, formatted "第一章" or "01". May pair with a 24px brick-red tick on the left.

### Pull Quote

**Role:** the pull quote

A 3px brick-red line on the left, padding 24px 32px, quote 26px/400 serif italic, line height 1.5, ink colored, with a 14px attribution below. It scrolls with the body — never part of the parallax.

## Do's and Don'ts

### Do

- Parallax with transform only
- Keep three parallax rates per screen maximum
- Leave body text out of the parallax, measure under 75 characters
- Spend brick red on drop caps, chapter numbers, quotes and links
- Ground in warm paper, never pure white
- Zero everything under prefers-reduced-motion

### Don't

- Don't mutate top/margin/height in scroll
- Don't exceed three parallax layers
- Don't let parallax outweigh readability
- Don't keep strong parallax on mobile
- Don't multiply accents or flood brick red
- Don't skip the reduced-motion fallback

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm Paper | `#f5f0e6` | Page ground |
| 1 | Sand | `rgba(201,187,160,0.30)` | Secondary sections |
| 2 | Deep Umber | `#2e2a22` | Dark sections and quotes |

## Elevation

- **None:** `none — the paper has no thickness`
- **Image:** `0 12px 32px rgba(26,23,18,0.10)`

## Imagery

Editorial photography: people, places, objects, warm-toned, paper-feeling, lightly grained. Images appear at 4:5 or 3:2 with sticky interlock. No cold-light photography, pure-white background images or illustration.

## Layout

Capped at 960px with 24px container padding and 128px section gaps. Body runs single-column, measure under 75 characters; images may span 100% width but text never moves. Chapters separate with 64px whitespace plus a brick-red chapter number.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1712`
- background: `#f5f0e6`
- accent: `#b3401f`
- dark: `#2e2a22`
- sand: `#c9bba0`
- border: `rgba(26,23,18,0.15)`

EXAMPLE COMPONENT PROMPTS:

1. Build a parallax-editorial article page: warm-paper ground #f5f0e6, ink text #1a1712, 16px serif, line height 1.75, measure under 75 characters. The first paragraph's initial drops: float left, 3.4× size, color #b3401f, 8px to the right and below. The image container is sticky top-24 at 60vh; the body scrolls over it. Parallax uses transform: translate3d(0, Ypx, 0) only, rates 0.15/0.30/1.0, at most three layers per screen; never read or write layout properties in scroll events. Chapter numbers run 14px/600 #b3401f with 0.14em tracking.
