# Kawaii Minimal — Style Reference

> Round, pastel, vast whitespace, a hint of bounce: cute but not loud.

**Theme:** light

Kawaii minimal stitches the softness of Japanese kawaii culture to minimalism's restraint: warm-white ground, pastel accents, fully rounded or 24px large radii, soft shadows, rounded sans, generous whitespace. It allows bounce — hover scales to 1.05 and press shrinks to 0.95, the only exaggeration permitted. Dark backgrounds are banned, glow and neon are banned, saturated fluorescent colors are banned, thick black borders are banned, dense information is banned. Cuteness here comes from proportion and warmth, not piled-on decoration.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Pink | `#f9a8d4` | `--color-pink` | Primary: primary buttons, selection and icon grounds. The style's cuteness rests on it. |
| Warm White | `#fff7ed` | `--color-warm-white` | Page ground. An orange-tinged warm white with more body heat than pure white. |
| Lavender | `#a78bfa` | `--color-lavender` | The second color, for secondary actions and category marks. |
| Sky | `#67e8f9` | `--color-sky` | Information and "new" marks, the only cool-leaning pastel. |
| Butter | `#fde68a` | `--color-butter` | Highlights and celebration, smallest area. |
| Deep Pink | `#f47abd` | `--color-deep-pink` | Pink deepened one step, for text and icons needing more contrast. |

## Typography

### Nunito — the only typeface. Rounded sans, weights capped at 700, line height 1.7 keeps it breathing.

- **Substitute:** 'Segoe UI', 'PingFang SC', system-ui, sans-serif
- **Weights:** 400, 500, 700
- **Sizes:** 13, 15, 17, 20, 26, 34
- **Line height:** 1.25 (display), 1.35 (headings), 1.7 (body)
- **Letter spacing:** 0 on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 34px | 1.25 | — | `--text-display` |
| heading | — | 700 | 26px | 1.35 | — | `--text-heading` |
| subheading | — | 500 | 20px | 1.45 | — | `--text-subheading` |
| body-lg | — | 400 | 17px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.7 | — | `--text-body` |
| label | — | 500 | 13px | 1.5 | 0.04em | `--text-label` |

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
| cards | 24px |
| panels | 32px |
| buttons | 999px |
| inputs | 999px |

- **Page max-width:** 960px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Bouncy Button

**Role:** action buttons

Pink fill, white text, fully rounded 999px, no stroke, 17px/700, padding 14px 28px, shadow 0 4px 12px pink 18%. On hover it scales to 1.05 with the shadow widening to 24px; on press it shrinks to 0.95. Transition 200ms cubic-bezier(0.34, 1.56, 0.64, 1) — this spring-back curve is the style's signature.

- **Sizes:** padding 14px 28px; label 17px
- **States:** hover: scale 1.05; active: scale 0.95

### Soft Card

**Role:** content cards

White ground, 24px radius, a 1px pink-200 (#fbcfe8) stroke or none, 32px padding, shadow 0 4px 12px pink 18%. The top-left may hold a 40px pastel icon ground (999px radius). On hover it lifts 4px and the shadow widens to 24px.

### Pill Input

**Role:** inputs

White ground, fully rounded 999px, 1px pink-200 stroke, padding 12px 20px, 15px text. Placeholder in pink-400 (#f9a8d4) at 60%. On focus the stroke turns pink-400 with a 3px pink 20% outer ring.

### Pastel Chip

**Role:** category and status labels

Fully rounded 999px, pastel 15% ground (pink, lavender, sky or butter), no stroke, 13px/500, padding 6px 14px; text uses deep pink or deep grey, never white.

### Gentle Avatar

**Role:** avatars and icon containers

Fully rounded, 32 to 64px, pastel ground with a 1px white 60% stroke, holding a 16 to 24px white or deep-pink icon. On hover it rotates 6 degrees and scales 1.08.

## Do's and Don'ts

### Do

- Ground in warm white, never dark
- Round everything fully or to 24px
- Accent in pastels, two per screen maximum
- Bounce with hover 1.05 and active 0.95
- Keep shadows soft and pink
- Let whitespace claim over half the page

### Don't

- Don't use dark or black backgrounds
- Don't use glow or neon
- Don't use saturated fluorescent colors
- Don't use thick black borders
- Don't overcrowd with information
- Don't use sharp right angles

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm White | `#fff7ed` | Page ground |
| 1 | White | `#ffffff` | Cards |
| 2 | Pink Wash | `rgba(249,168,212,0.14)` | Accent sections |

## Elevation

- **Soft:** `0 4px 12px rgba(249,168,212,0.18)`
- **Soft hover:** `0 8px 24px rgba(249,168,212,0.28)`

## Imagery

Round illustration: animals, food, plants, thick rounded lines, flat pastel fills. Real photography is allowed but must be soft, warm and high-whitespace. No cold geometry, dark photography or dense realistic icon walls.

## Layout

Capped at 960px with 24px container padding and 128px section gaps. One column or two-card rows, at least 24px between elements. Whitespace targets over half the page, because "emptiness" is part of what makes this style cute.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#57534e`
- background: `#fff7ed`
- card: `#ffffff`
- pink: `#f9a8d4`
- lavender: `#a78bfa`
- sky: `#67e8f9`

EXAMPLE COMPONENT PROMPTS:

1. Build a kawaii-minimal card: white ground, 24px radius, 1px #fbcfe8 stroke, 32px padding, shadow 0 4px 12px rgba(249,168,212,0.18). The top-left holds a 40px pastel icon circle (bg rgba(249,168,212,0.15), 999px radius). Title 26px/700 #57534e, body 15px/400 at line height 1.7. On hover translateY(-4px) with the shadow widening to 0 8px 24px rgba(249,168,212,0.28). The primary button is pink #f9a8d4, 999px radius, white text, hover scale(1.05), active scale(0.95), transition 200ms cubic-bezier(0.34,1.56,0.64,1). Page ground #fff7ed.
