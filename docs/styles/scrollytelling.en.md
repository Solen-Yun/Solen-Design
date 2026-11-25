# Scrollytelling — Style Reference

> The scroll gesture is the timeline: the canvas pins, the text walks past it, each step flips a state.

**Theme:** dark

Scrollytelling is the grammar of long-form data journalism: a sticky canvas pins in the viewport, text steps scroll past it, and each step triggers one discrete state change (counting numbers, morphing shapes, lighting layers). Its key difference from scroll-scrubbing is discrete over continuous — use IntersectionObserver to detect each step entering the viewport and switch state; never read offsetTop or getBoundingClientRect in scroll events for continuous computation, which stutters. The canvas only changes transform and opacity, never top, width or height. Values must exist as static DOM text — screen readers and SEO can't read counters.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Base | `#0e1116` | `--color-deep-base` | Page ground. The immersive base of long-form data journalism. |
| Warm White | `#f7f5f0` | `--color-warm-white` | Body text and canvas annotations. Warmer than pure white, gentle over long reads. |
| Signal Blue | `#2f6fed` | `--color-signal-blue` | The only marker of current focus: the active step, highlighted data points, progress. |
| Vermilion | `#e8503a` | `--color-vermilion` | Reserved for contrast and warning, not regular emphasis. |
| Mid Ink | `#1c2530` | `--color-mid-ink` | Cards and canvas backing, one step lighter than the deep base. |

## Typography

### Inter — the only typeface. Step titles 24 to 36px at 600, body 17px at line height 1.6.

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 12, 14, 17, 24, 36, 48
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.14em on uppercase labels

### JetBrains Mono — step numbers, axis ticks and value labels. Monospace keeps data comparable.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 13
- **Line height:** 1.4 (display), 1.4 (headings), 1.5 (body)
- **Letter spacing:** 0.04em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Inter | 700 | 48px | 1.1 | -0.02em | `--text-display` |
| heading | Inter | 700 | 36px | 1.15 | — | `--text-heading` |
| subheading | Inter | 600 | 24px | 1.25 | — | `--text-subheading` |
| body-lg | Inter | 400 | 17px | 1.6 | — | `--text-body-lg` |
| body | Inter | 400 | 14px | 1.6 | — | `--text-body` |
| label | JetBrains Mono | 400 | 11px | 1.4 | 0.14em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** airy

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
| cards | 8px |
| buttons | 6px |
| dots | 999px |

- **Page max-width:** 1200px
- **Section gap:** 128px
- **Card padding:** 24px
- **Element gap:** 24px

## Components

### Sticky Canvas

**Role:** the pinned canvas (core component)

The outer wrapper runs 300vh tall; the inner layer is sticky top-0, 100vh, holding a canvas or SVG. Each step fires via IntersectionObserver, switching the canvas to that step's discrete state (never continuous scrubbing). State changes only touch transform and opacity — never top, width or height. Under prefers-reduced-motion, jump straight to each step's final state.

- **Sizes:** outer 300vh; sticky 100vh

### Step Block

**Role:** the narrative step block

A 2px signal-blue line on the left, padding 0 0 0 24px, rows at least 96px tall. Above: an 11px monospace uppercase step number (Step 02); title 24 to 36px/600; body 17px warm white 70%, max-width 28rem. The current step's line and number rise to 100% opacity; the rest fall to 30%.

### Progress Rail

**Role:** the progress rail

Fixed at the viewport's right center, 2px wide, 40vh tall, with a warm-white 15% track. The completed portion fills signal blue, its height stepping with the current step index. Beside it, monospace "02 / 07".

### Figure Label

**Role:** figure captions and value annotations

Captions run 11px monospace uppercase, warm white 50%, 12px below the figure. Key values must also exist as static DOM text (never rendered only by a counter), 13px monospace, signal blue.

### Next Button

**Role:** the chapter advance button

Signal-blue fill, white text, 6px radius, 14px/600, padding 10px 20px; on hover the fill deepens to #2560d4; on press it scales 0.98. Focus ring 2px signal blue 50% with the offset in the deep base color, or it vanishes on the dark ground.

## Do's and Don'ts

### Do

- Fire discrete states with IntersectionObserver
- Change only transform and opacity on the canvas
- Give each step exactly one new piece of information
- Keep key values as static DOM text
- Limit emphasis to two accents
- Jump to final states under reduced motion

### Don't

- Don't scrub continuously via offsetTop in scroll handlers
- Don't cram several new facts into one step
- Don't mutate the canvas's layout properties
- Don't let a counter be the only source of a value
- Don't let the canvas crowd out text on mobile
- Don't exceed two accent colors

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Base | `#0e1116` | Page ground |
| 1 | Mid Ink | `#1c2530` | Cards and canvas backing |

## Elevation

- **None:** `none — the canvas carries the depth`
- **Card:** `0 8px 24px rgba(0,0,0,0.35)`

## Imagery

Charts are the imagery: lines, areas, scatters, maps and flows, all drawn on the canvas and switching state per step. A baseline hint and sparse annotations are allowed. No decorative photography or illustration — every image must carry data.

## Layout

Capped at 1200px. Desktop splits left-right: the pinned canvas holds 45% on one side, scrolling text the other 55% (either order), the text column capped at 28rem. Mobile stacks canvas above text with the canvas at 50vh — it never crowds the text.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#f7f5f0`
- background: `#0e1116`
- accent: `#2f6fed`
- alert: `#e8503a`
- card: `#1c2530`
- muted: `#8b94a3`

EXAMPLE COMPONENT PROMPTS:

1. Build a scrollytelling page: deep ground #0e1116, warm-white text #f7f5f0. On the left, a sticky top-0 100vh canvas (outer wrapper 300vh); on the right, scrolling step blocks (a 2px #2f6fed left line, 11px monospace uppercase step numbers, 24px/600 titles, 17px body). Detect each step entering the viewport with IntersectionObserver and switch the canvas to that step's discrete state, touching only transform and opacity. The current step's line and number sit at 100% opacity, the rest at 30%. Key values must exist as static DOM text. Under reduced motion, jump straight to final states.
