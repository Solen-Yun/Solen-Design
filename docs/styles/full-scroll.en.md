# Full-Scroll Layout — Style Reference

> One scene per screen; one scroll, one cut: the page is a storyboard.

**Theme:** dark

Full-scroll layout turns every section into a standalone 100vh scene, forced into place with scroll-snap (scroll-snap-type: y mandatory) plus scroll-behavior: smooth. Success lives in the details: content must never overflow a single screen, a scroll cue is mandatory, animations stay light, and scroll lock time must stay short. The most overlooked rule: reveal delays must stagger — when every element enters at once, depth vanishes and the page reads as slides instead of scenes.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Curtain Black | `#000000` | `--color-curtain-black` | Default scene background. No texture, no gradient — each screen's content stands on its own. |
| Stage White | `#ffffff` | `--color-stage-white` | Inverted scene background. Alternating black and white scenes is this layout's favorite rhythm tool. |
| Indigo | `#6366f1` | `--color-indigo` | Primary actions and progress indicators, consistent across all scenes. |
| Magenta | `#ec4899` | `--color-magenta` | Accent of emotional-turn scenes, used to break the black-white rhythm. |
| Teal | `#14b8a6` | `--color-teal` | Data and feature scenes — the "rational" side. |
| Amber | `#f59e0b` | `--color-amber` | Hints and calls to action; the rarest. |

## Typography

### Inter — the only typeface. Scene titles run 44 to 64px with tight tracking; small labels are 12px uppercase.

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 700
- **Sizes:** 12, 14, 18, 28, 44, 64
- **Line height:** 1.05 (display), 1.15 (headings), 1.55 (body)
- **Letter spacing:** -0.03em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 64px | 1.05 | -0.03em | `--text-display` |
| heading-lg | — | 700 | 44px | 1.1 | -0.025em | `--text-heading-lg` |
| heading | — | 600 | 28px | 1.2 | — | `--text-heading` |
| body-lg | — | 400 | 18px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.55 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.12em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 20px |
| buttons | 999px |
| inputs | 12px |

- **Page max-width:** 1120px
- **Section gap:** 0px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Snap Section

**Role:** full-screen scene container

100vh tall (100dvh on mobile to avoid address-bar jumps), scroll-snap-align: start, vertically centered content, max-width 1120px, 48px padding. Content must fit a single screen — no inner scrolling. Neighboring scenes alternate backgrounds (black / white / image) for a cut-to-cut feel.

- **Sizes:** 100vh per scene

### Staggered Reveal

**Role:** entrance of elements within a scene

When a scene enters the viewport, its elements float up and fade in at 80ms intervals (translateY 24px → 0, opacity 0 → 1, 600ms ease-out). The first element delays 0, the second 80ms, the third 160ms, capped at 320ms. Simultaneous entrances kill depth — this is a hard ban.

### Scroll Cue

**Role:** the scroll hint (mandatory)

Fixed bottom center, 32px from the bottom: a 24px-tall thin arrow or 1px vertical line, with 12px uppercase 0.12em hint text below it, pulsing in and out over 2 seconds. On the last scene it switches to "back to top".

### Scene Progress

**Role:** scene progress indicator

Fixed mid-right: n vertical 8px dots, 12px apart. The current scene's dot stretches into a 24px short bar filled with indigo; the others are white at 30%. Clicking a dot jumps to that scene — smooth, but never with a long lock.

### Scene CTA

**Role:** the action button inside a scene

Indigo fill, white text, 999px full-round, 16px/500, 14px 32px padding, shadow 0 8px 20px indigo 30%. On hover it brightens and lifts 2px; on press it scales 0.98. At most one per scene.

## Do's and Don'ts

### Do

- Snap with scroll-snap-type: y mandatory
- Fit every scene on one screen
- Always provide the scroll cue
- Stagger entrances at 80ms
- Use 100dvh on mobile
- Alternate scene backgrounds for a cut-to-cut feel

### Don't

- Don't let content overflow a screen
- Don't omit the scroll cue
- Don't use overly complex animations
- Don't lock scrolling for long
- Don't ignore the mobile experience
- Don't give every element the same delay

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Curtain Black | `#000000` | Dark scenes |
| 1 | Stage White | `#ffffff` | Light scenes |
| 2 | Scene Image | `full-bleed photo` | Image scenes |

## Elevation

- **Card:** `0 16px 40px rgba(0,0,0,0.30)`
- **Button:** `0 8px 20px rgba(99,102,241,0.30)`

## Imagery

Each image scene uses one full-bleed photo or render that can carry white or black text (with its own light/dark zones). A 20% vignette is allowed. No decorative illustration or icon walls.

## Layout

1120px cap; every section is 100vh with scroll-snap-align: start, and the container sets scroll-snap-type: y mandatory. Content is vertically centered, single column, lines no longer than 40 characters. No gaps or dividers between scenes — the snap itself is the cut.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope, based on the pages, tasks and real content in the user's request; flag missing business information instead of inventing data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features that weren't requested.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop while preserving hierarchy and avoiding accidental horizontal overflow.
- Handle keyboard focus and reduced motion for the interactions you touch; add disabled, loading, empty and error states where they apply.
- When finished, run the project's existing checks and report only the tests and visual inspections you actually ran, listing what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#000000`
- accent: `#6366f1`
- magenta: `#ec4899`
- teal: `#14b8a6`
- muted: `#a1a1aa`

EXAMPLE COMPONENT PROMPTS:

1. Build a full-scroll page: container with scroll-snap-type: y mandatory and scroll-behavior: smooth. Every section is 100dvh tall with scroll-snap-align: start, vertically centered content, max-width 1120px and 48px padding. Neighboring scenes alternate black and white. When a scene enters the viewport, its elements reveal in sequence at 80ms intervals: translateY(24px) → 0, opacity 0 → 1, 600ms ease-out. Pin a 24px scroll-cue arrow with 12px uppercase text at the bottom, fading in and out over 2 seconds.

## Quick Start

```css

:root {
  /* Colors */
  --color-curtain-black: #000000;
  --color-stage-white: #ffffff;
  --color-indigo: #6366f1;
  --color-magenta: #ec4899;
  --color-teal: #14b8a6;
  --color-amber: #f59e0b;

  /* Typography — Font Families */
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

  /* Typography — Scale */
  --text-display: 64px;
  --leading-display: 1.05;
  --tracking-display: -0.03em;
  --text-heading-lg: 44px;
  --leading-heading-lg: 1.1;
  --tracking-heading-lg: -0.025em;
  --text-heading: 28px;
  --leading-heading: 1.2;
  --text-body-lg: 18px;
  --leading-body-lg: 1.55;
  --text-body: 14px;
  --leading-body: 1.55;
  --text-label: 12px;
  --leading-label: 1.4;
  --tracking-label: 0.12em;

  /* Typography — Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* Spacing */
  --spacing-unit: 8px;
  --spacing-8: 8px;
  --spacing-16: 16px;
  --spacing-24: 24px;
  --spacing-32: 32px;
  --spacing-48: 48px;
  --spacing-64: 64px;
  --spacing-96: 96px;

  /* Layout */
  --page-max-width: 1120px;
  --section-gap: 0px;
  --card-padding: 32px;
  --element-gap: 24px;
  --density: airy;

  /* Border Radius */
  --radius-cards: 20px;
  --radius-buttons: 999px;
  --radius-inputs: 12px;

  /* Surfaces */
  --surface-curtain-black: #000000;
  --surface-stage-white: #ffffff;
  --surface-scene-image: full-bleed photo;
}

```
