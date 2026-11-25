# Bauhaus — Style Reference

> Form follows function: circle, square, triangle and the three primaries — everything else is deleted.

**Theme:** light

Bauhaus is a functionalist discipline, not a decoration. Its rules are minimal to the point of severity: only basic geometry (circle, square, triangle), only the three primaries plus black and white, no shadows, no gradients, no decorative illustration. Hierarchy is built from scale and the area of color blocks; type dominates the layout and everything aligns left. What separates it from geometric-bold is restraint — Bauhaus forbids rotation and overlap for the sake of dynamism; every element must hold a functional position.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | Text, strokes and the deepest blocks. Functionalism demands absolute contrast. |
| White | `#ffffff` | `--color-white` | Canvas and inverted text. No greyscale steps. |
| Red | `#ff0000` | `--color-red` | Alerts and primary emphasis. Never more than 20% of the screen. |
| Yellow | `#ffcc00` | `--color-yellow` | Highlights and block grounds, carrying dark text. |
| Blue | `#0000ff` | `--color-blue` | Links and information blocks; the coolest of the three primaries. |

## Typography

### Futura — the only font on the site, a geometric sans in weights 400 and 700 only. Headings align left with tight tracking; labels go uppercase with wide tracking.

- **Substitute:** 'Jost', 'Century Gothic', 'Helvetica Neue', sans-serif
- **Weights:** 400, 700
- **Sizes:** 12, 14, 18, 28, 48, 72
- **Line height:** 1 (display), 1.1 (headings), 1.55 (body)
- **Letter spacing:** -0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 72px | 1 | -0.02em | `--text-display` |
| heading-lg | — | 700 | 48px | 1.05 | -0.02em | `--text-heading-lg` |
| heading | — | 700 | 28px | 1.1 | — | `--text-heading` |
| body-lg | — | 400 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.55 | — | `--text-body` |
| label | — | 700 | 12px | 1.4 | 0.14em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| shapes | 999px |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 24px

## Components

### Function Button

**Role:** action button

Solid black fill, white text, zero radius, no shadow, no border. 14px/700, uppercase, 0.14em tracking, padding 14px 28px. On hover the fill swaps to red and keeps the white text; on press the button steps into a 1px-border state (no translate animation). Transition 120ms.

- **Sizes:** padding 14px 28px; label 14px
- **States:** hover: red fill; active: 1px border, black fill

### Primary Block

**Role:** color-block sections and information cards

A solid fill of one primary (red, yellow or blue), zero radius, no border, no shadow, 32px padding. Text inside picks black or white by contrast, at 18px minimum. One block takes one color only — mixing two inside a single block is forbidden.

### Geometric Frame

**Role:** frames for images and content

The container has zero radius and a 1px black stroke (or none); imagery inside may be cropped to a circle or a half-circle. A solid circle or triangle of 96px to 160px may sit in a corner of a section as a compositional element, but never over text.

### Type Stack

**Role:** heading and body typographic group

Everything aligns left: a 48–72px heading with a 12px uppercase 0.14em label set above it, 16px between the two. Body copy is single-column, no wider than 70 characters per line. Centered and right-aligned text are forbidden.

## Do's and Don'ts

### Do

- Use only circle, square and triangle
- Use only the three primaries plus black and white
- Align everything left
- Zero radius, zero shadows, zero gradients
- Build hierarchy from type size and block area
- Set labels at 12px uppercase 0.14em

### Don't

- Don't rotate or overlap elements
- Don't use gradients or shadows
- Don't mix two radius systems
- Don't introduce colors beyond the primaries
- Don't use decorative illustration
- Don't center the layout

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | Canvas |
| 1 | Primary Block | `#ffcc00` | Color-block sections |
| 2 | Black Block | `#000000` | Dark sections and footer |

## Elevation

- **None:** `none`

## Imagery

Geometric compositions and black-and-white photography. Photos may be cropped to circles or half-circles and set into color blocks. No color photography, no decorative illustration, no shapes beyond basic geometry.

## Layout

Capped at 1200px, 12 columns, 24px gutters. Section gap 96px; color blocks may span 4 to 6 columns. All content snaps to the left edge of its column; headings may span 8. Overlap and rotation are forbidden.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#000000`
- background: `#ffffff`
- red: `#ff0000`
- yellow: `#ffcc00`
- blue: `#0000ff`
- border: `#000000`

EXAMPLE COMPONENT PROMPTS:

1. Build a Bauhaus section: white canvas, a solid yellow block spanning 6 columns on the left (zero radius, no shadow, 32px padding) with 28px/700 black text aligned left and a 12px uppercase 0.14em label above it. The right 6 columns hold black-and-white photography cropped to a circle. Align everything to a 12-column grid with 24px gutters and 96px between sections.
2. Build a function button: solid black fill, white 14px/700 uppercase text at 0.14em tracking, padding 14px 28px, zero radius, no shadow. On hover the fill swaps to #ff0000 with no transition beyond 120ms; on active the button gains a 1px black border while keeping the black fill.
