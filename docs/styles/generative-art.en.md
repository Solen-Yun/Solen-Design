# Generative Art — Style Reference

> Everything is drawn by functions: noise, parameters and easing compose an interface that never repeats.

**Theme:** dark

Generative art composes with algorithms instead of hand-drawing: on a near-black ground (#0a0a0a), SVG or canvas draws circles, lines and curved grids from math functions; the palette derives from HSL rotations around a base violet (#7c3aed); all text is monospace; motion is driven by mathematical easing functions (not fixed cubic-beziers); cards are dark glass (neutral-900 at 80% with blur); interactive elements carry a 0 0 20px violet glow. The core principle is "parameters are reproducible" — the same seed must draw the same picture; random does not mean uncontrollable.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Near Black | `#0a0a0a` | `--color-near-black` | Page ground. The drawn lines and glows are the only light sources. |
| Base Violet | `#7c3aed` | `--color-base-violet` | The palette's base; HSL rotation derives the whole family from it. |
| Algorithm Blue | `#3b82f6` | `--color-algorithm-blue` | Rotation +30 degrees, for data and lines. |
| Algorithm Teal | `#14b8a6` | `--color-algorithm-teal` | Rotation +90 degrees, for the second series. |
| Algorithm Rose | `#f43f5e` | `--color-algorithm-rose` | Rotation -60 degrees, for anomalies and contrast. |
| Algorithm Amber | `#f59e0b` | `--color-algorithm-amber` | Rotation -120 degrees, for highlights. |

## Typography

### JetBrains Mono — monospace throughout. Parameters, coordinates and values must be monospace, because they are this interface's content.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 11, 13, 16, 22, 32, 44
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** 0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 44px | 1.15 | 0.02em | `--text-display` |
| heading | — | 700 | 32px | 1.2 | 0.02em | `--text-heading` |
| subheading | — | 700 | 22px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.6 | — | `--text-body` |
| label | — | 400 | 11px | 1.45 | 0.14em | `--text-label` |

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
| cards | 12px |
| buttons | 8px |
| inputs | 8px |
| dots | 999px |

- **Page max-width:** 1280px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Plotted Field

**Role:** the plotted field (core component)

A canvas or SVG drawn by math functions: circle families (radii in a sin series), curved grids (parametric equations), or noise fields (simplex noise to contours). Lines 1px wide, colors derived from HSL (each layer +30 degrees), opacity decreasing per layer. All parameters come from the seed; the same seed must reproduce the same picture.

### Glass Card

**Role:** glass panels

Neutral-900 80% fill, 12px radius, 1px white 10% stroke, 24px padding, 20px backdrop blur, outer glow 0 0 20px violet 40%. Title 22px/700 violet-white, body 13px white 75%. On hover the glow widens to 36px and the plotted field regenerates once (new seed).

### Parameter Input

**Role:** parameter inputs

Near-black fill, 8px radius, 1px white 15% stroke, padding 10px 14px, 13px monospace. The left holds an 11px uppercase parameter name (like SEED / FREQ); the right may carry a 4px violet slider. On focus the stroke turns violet with a 0 0 0 2px violet 25% ring.

### Easing Preview

**Role:** the easing visualizer

A small curve chart (120×80px) drawing the current easing function (a cubic-bezier or exponential decay), 2px violet line, 1px white 8% grid. Beside it, monospace small print names the function and parameters. The motion is actually driven by that curve — the preview is the truth.

### Glow Node

**Role:** glow nodes

An 8px solid circle (violet or a derived color) with a 0 0 20px same-hue 60% glow, placed at a label's left end or on plotted data points. On hover the glow widens to 36px and an 11px monospace value tooltip pops out.

## Do's and Don'ts

### Do

- Generate everything from functions and seeds
- Reproduce the same picture from the same seed
- Derive the palette from HSL rotation around base violet
- Set monospace type throughout
- Drive motion with mathematical easing functions
- Make cards dark glass with violet glow

### Don't

- Don't use irreproducible pure randomness
- Don't set body text in non-monospace faces
- Don't use light grounds
- Don't fake easing with fixed cubic-beziers
- Don't let the plot outweigh the text
- Don't use soft shadows

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Near Black | `#0a0a0a` | Page ground |
| 1 | Dark Glass | `rgba(23,23,23,0.80)` | Cards |
| 2 | Plotted Field | `canvas / SVG` | The plotted field |

## Elevation

- **Violet glow:** `0 0 20px rgba(124,58,237,0.40)`
- **Violet glow strong:** `0 0 36px rgba(124,58,237,0.60)`

## Imagery

Images are algorithm output: noise fields, parametric curves, dot matrices, grids, particle traces. Photos may be pixel-sampled and redrawn as geometric primitives. No raw photography, soft illustration or handmade ornament.

## Layout

Capped at 1280px with 24px container padding and 96px section gaps. Plots may overflow their containers. The parameter bar may pin to a side. The page stays black; every bright color comes from the drawn output and its glows.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#e5e5e5`
- background: `#0a0a0a`
- violet: `#7c3aed`
- blue: `#3b82f6`
- teal: `#14b8a6`
- rose: `#f43f5e`

EXAMPLE COMPONENT PROMPTS:

1. Build a generative-art panel: near-black #0a0a0a ground, a canvas drawing a curved grid with parametric equations (1px lines, colors derived from #7c3aed rotating +30 degrees per layer in HSL, opacity decreasing per layer), all parameters from a fixed seed. Above it a glass card: rgba(23,23,23,0.8) fill, 12px radius, 1px rgba(255,255,255,0.1) stroke, 20px backdrop blur, 24px padding, box-shadow 0 0 20px rgba(124,58,237,0.4). All text monospace, title 22px/700, body 13px. Parameter inputs use 11px uppercase labels; on focus the stroke turns #7c3aed with a 2px ring.
