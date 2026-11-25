# Task Console — Style Reference

> Near-black ground, 1px white lines, one indigo-to-violet gradient: a work surface built like a precision instrument.

**Theme:** dark

The task-console style is a dark system common in recent product interfaces. Its layering is extremely thin: a near-black ground (#0a0a0b), panels lifted only 3% to 6%, borders uniformly 1px white 10%, almost no shadow. The only color is an indigo-to-violet gradient, appearing on primary buttons and the brand mark. The core interaction discipline is "opacity only" — hover changes no color, it lifts text from 70% to 100% and panels from 3% to 6%, over 150ms. This restraint lets a high-density product interface read quietly.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Near Black | `#0a0a0b` | `--color-near-black` | Page ground. Not pure black, so lifted panels still have contrast room. |
| Panel | `rgba(255,255,255,0.03)` | `--color-panel` | Cards and row containers, rising to 6% on hover. The only layering device sitewide. |
| Indigo | `#5e6ad2` | `--color-indigo` | Primary-button start, selection and links. The only brand color. |
| Violet | `#8b5cf6` | `--color-violet` | The gradient's end. Only ever paired with indigo, never alone. |
| Amber | `#f2c94c` | `--color-amber` | Priority and blocked states, only as 8px dots and short labels. |
| Green | `#27ae60` | `--color-green` | Done and online, for status dots. |
| Red | `#eb5757` | `--color-red` | Urgent and error, on status dots and destructive actions. |

## Typography

### Inter — the only typeface, with very small sizes (11 to 14px) and a uniform -0.01em tracking. Dense yet clear is this style's tone.

- **Substitute:** -apple-system, 'SF Pro Text', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 11, 12, 13, 14, 16, 20, 24
- **Line height:** 1.2 (display), 1.3 (headings), 1.5 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| heading | — | 600 | 24px | 1.25 | -0.01em | `--text-heading` |
| subheading | — | 600 | 20px | 1.3 | — | `--text-subheading` |
| body-lg | — | 500 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.5 | — | `--text-body` |
| body-sm | — | 400 | 12px | 1.45 | — | `--text-body-sm` |
| label | — | 500 | 11px | 1.4 | 0.02em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |

### Border Radius

| Element | Value |
|---|---|
| cards | 8px |
| buttons | 8px |
| inputs | 8px |
| pills | 999px |

- **Page max-width:** 1280px
- **Section gap:** 32px
- **Card padding:** 20px
- **Element gap:** 8px

## Components

### Gradient Button

**Role:** the primary action button

A horizontal indigo-to-violet gradient, white text, 8px radius, no stroke. Type at 14px, weight 500, padding 8px 16px. Hover changes no color — it only drops overall opacity to 90%; pressed falls to 80%. Transition 150ms, opacity only.

- **Sizes:** padding 8px 16px; label 14px
- **States:** hover: opacity 90%; active: opacity 80%

### Issue Card

**Role:** cards, list rows and board items

White 3% fill, 1px white 10% stroke, 8px radius, 20px padding, no shadow. Title 14px/500 pure white, description 12px white 50%, timestamp 11px white 40%. A 16px status ring (2px stroke, colored by state) sits at the left. On hover the fill rises to 6%, over 150ms.

- **States:** hover: fill 3%→6%

### Dark Input

**Role:** forms and search

White 3% fill, 1px white 10% stroke, 8px radius, padding 8px 12px, 13px text. Label 12px white 60%. On focus the stroke turns indigo 50% and the fill rises to 5%, with no outer ring. Transition 150ms.

- **States:** focus: border indigo 50%, fill 5%

### Command Bar

**Role:** the top command bar and flyout

White 4% fill, 1px white 10% stroke, 12px radius, 12px blur, 8px padding. A 16px search icon on the left, 13px white 50% placeholder, and a ⌘K hint (11px, white 30%) on the right. When expanded the container reaches 360px tall, option rows 36px, and hovered rows take a white 6% fill.

## Do's and Don'ts

### Do

- Ground in near-black, never pure black
- Layer only with white 3% and 6% fills
- Keep borders uniformly 1px white 10%
- Change opacity on hover, never color
- Reserve the single gradient for the primary button
- Hold type between 11 and 14px at a uniform -0.01em tracking

### Don't

- Don't use light backgrounds
- Don't use colored or large shadows
- Don't introduce a second typeface
- Don't use saturated color beyond the brand pair
- Don't layer with shadows
- Don't exceed 150ms of motion

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Near Black | `#0a0a0b` | Page ground |
| 1 | Panel 3% | `rgba(255,255,255,0.03)` | Cards and rows |
| 2 | Panel 6% | `rgba(255,255,255,0.06)` | Hover and overlays |

## Elevation

- **None:** `none — 1px borders only`
- **Flyout:** `0 12px 32px rgba(0,0,0,0.55)`

## Imagery

Almost no images. Avatars 16px, status dots and very small brand marks are allowed. No photography, illustration or background images — any image breaks the density of this system.

## Layout

Capped at 1280px with 16px container padding, 32px section gaps and 8px card gaps. A 240px left nav plus a right list, whose rows run 56px tall. The density approaches a desktop application; whitespace only appears between sections.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ffffff`
- background: `#0a0a0b`
- panel: `rgba(255,255,255,0.03)`
- accent: `#5e6ad2`
- muted: `#8a8a94`
- border: `rgba(255,255,255,0.10)`

EXAMPLE COMPONENT PROMPTS:

1. Build a task-console card: background rgba(255,255,255,0.03), 1px rgba(255,255,255,0.1) stroke, 8px radius, 20px padding, no shadow. Title 14px/500 pure white, description 12px rgba(255,255,255,0.5). On hover the background rises to rgba(255,255,255,0.06), transition 150ms. Page ground #0a0a0b, primary button as linear-gradient(to right, #5e6ad2, #8b5cf6).
