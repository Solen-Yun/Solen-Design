# Neo-Brutalist Soft — Style Reference

> The skeleton is still hard shadows and zero radius, but the edges turn grey, the shadows turn grey, and the colors turn pastel.

**Theme:** light

Neo-brutalist soft keeps the brutalist skeleton: zero radius, hard offset shadows, press offset equal to the shadow with the shadow zeroing out. But it turns down the three harshest parameters by one step — borders drop from 4px pure black to 2px gray-800, shadows drop from solid black to 20% black, and the palette swaps neon for pastel (pink-400 rather than #ff006e). The result is a brutalism that fits inside enterprise products: still physical, no longer shouting. The ground also retreats from pure white to light grey.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Grey | `#1a1a1a` | `--color-deep-grey` | Text, borders and the shadow baseline. One step softer than pure black; easier on long reads. |
| Light Ground | `#f5f5f5` | `--color-light-ground` | Page canvas. Not pure white, so white cards have something to rest on. |
| Card White | `#ffffff` | `--color-card-white` | Card fill, appearing only on the light grey ground. |
| Soft Pink | `#f472b6` | `--color-soft-pink` | Primary accent and selection. A softened pink-400; never a large button fill. |
| Lime | `#a3e635` | `--color-lime` | Hover highlights and success, on small labels. |
| Sky | `#38bdf8` | `--color-sky` | Links and info marks, in cold counterpoint to the soft pink. |
| Amber | `#fbbf24` | `--color-amber` | Reminders and highlight grounds; the least frequent. |

## Typography

### Inter — the only font on the site, weights 500 to 800. Headings are 800 but never uppercase — that is the dividing line from hardcore brutalism.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 500, 700, 800
- **Sizes:** 13, 15, 18, 24, 32, 44
- **Line height:** 1.1 (display), 1.2 (headings), 1.55 (body)
- **Letter spacing:** -0.02em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 800 | 44px | 1.1 | -0.02em | `--text-display` |
| heading | — | 800 | 32px | 1.2 | — | `--text-heading` |
| subheading | — | 700 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 500 | 18px | 1.5 | — | `--text-body-lg` |
| body | — | 500 | 15px | 1.55 | — | `--text-body` |
| label | — | 700 | 13px | 1.4 | 0.04em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| badges | 0 |

- **Page max-width:** 1120px
- **Section gap:** 80px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Soft Block Button

**Role:** primary action button

White fill, deep-grey text, 2px gray-800 stroke, zero radius, 4px grey hard shadow (black 20%); 15px/700, padding 12px 24px. On hover the fill swaps to soft pink, the text turns white and the shadow widens to 6px — no lift, no excess movement; on press it translates 4px 4px while the shadow zeroes out. Transition 150ms ease-out.

- **Sizes:** padding 12px 24px; label 15px
- **States:** hover: pink fill, shadow 6px; active: translate 4px, shadow none

### Soft Brutal Card

**Role:** content cards and feature cards

White ground, 2px gray-800 stroke, zero radius, 24px padding, 4px grey hard shadow. Titles 24px/700 deep grey, body 15px/500 grey 60%. On hover it lifts 2px, the shadow widens to 6px and the stroke turns soft pink. Transition 150ms.

### Quiet Input

**Role:** form inputs

White ground, 2px gray-800 stroke, zero radius, padding 10px 14px, 15px type. On focus the stroke turns sky blue with a 4px grey hard shadow, without changing the box size.

### Pastel Tag

**Role:** labels and states

Pastel fills (soft pink, lime, sky or amber, at 15% opacity as the ground), zero radius, 2px gray-800 stroke, 13px/700, padding 2px 8px. Text stays deep grey, never white.

## Do's and Don'ts

### Do

- Use 2px gray-800 borders, not pure black
- Shadow with 20% black, not solid
- Keep pastel accents to two per screen
- Preserve zero radius and hard offset shadows
- Ground on light grey, not pure white
- Keep transitions at 150ms, brief

### Don't

- Don't use rounded corners
- Don't use pure-black borders
- Don't use saturated solid colors
- Don't use a pure black background
- Don't use gradients
- Don't use blurred shadows

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Light Ground | `#f5f5f5` | Page canvas |
| 1 | Card White | `#ffffff` | Cards and panels |

## Elevation

- **Soft hard shadow:** `4px 4px 0 rgba(0,0,0,0.20)`
- **Hover:** `6px 6px 0 rgba(0,0,0,0.24)`
- **Pressed:** `none`

## Imagery

Geometric shapes and thick-stroked icons. Photos may be graded into pastel duotones and given a 2px stroke. No softly-graded photography or decorative illustration.

## Layout

Capped at 1120px with 24px container padding and 80px section gaps. Elements may drift 4px for a hand-made feel, but never rotate. Cards stagger vertically by 8px while staying otherwise tidy.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#f5f5f5`
- card: `#ffffff`
- pink: `#f472b6`
- sky: `#38bdf8`
- border: `#262626`

EXAMPLE COMPONENT PROMPTS:

1. Build a soft-brutalist button: white fill, #1a1a1a text, 2px solid #262626 border, border-radius 0, 700 weight 15px, padding 12px 24px, box-shadow 4px 4px 0 rgba(0,0,0,0.2). On hover the background becomes #f472b6, the text white, and the shadow widens to 6px 6px 0 rgba(0,0,0,0.24). On active translate(4px,4px) with no shadow. Transition 150ms ease-out. Page ground #f5f5f5.
2. Build a pastel tag: a 15%-opacity pastel ground (soft pink, lime, sky or amber), zero radius, 2px #262626 border, 13px/700 deep-grey text, padding 2px 8px.
