# Neumorphism — Style Reference

> Elements share the color of their background; only two opposing shadows tell whether they rise or sink.

**Theme:** light

Neumorphism shapes the whole interface with a single fixed light: the source sits top-left, so every element carries a white top-left highlight and a cool grey bottom-right shadow. Elements themselves share the background color — change the depth and the material is lost. Raised states use an outer shadow pair, recessed states use an inset pair, and pressing flips raised into recessed. This system has no borders, no solid fills and no strong contrast; all hierarchy is carried by two blur values, and type sizes and weights must stay more conservative than usual or the content overpowers the material.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Base | `#e0e5ec` | `--color-base` | The common color of the page and every element. Raised and recessed both start from it; no element may switch background. |
| Shadow Grey | `#b8bcc2` | `--color-shadow-grey` | The bottom-right shadow color. The only color allowed to express recession; not for text or borders. |
| Highlight | `#ffffff` | `--color-highlight` | The top-left highlight color. Appears as blurred shadow, never directly as panel fill. |
| Blurple | `#6d5dfc` | `--color-blurple` | Primary action and selection. The only saturated color allowed on the base, confined to buttons and icons. |
| Coral | `#ff6b6b` | `--color-coral` | Warning and destructive actions. Its appearance signals irreversibility; never decorative. |
| Mint | `#4ecdc4` | `--color-mint` | Success and positive data changes. When coral is on screen, mint never exceeds its area. |

## Typography

### Inter — the only typeface on the site, with restrained weights. The material is already the protagonist; a showy font would look cheap.

- **Substitute:** Nunito, system-ui, -apple-system, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 16, 20, 28, 36
- **Line height:** 1.15 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 36px | 1.15 | -0.01em | `--text-display` |
| heading | — | 600 | 28px | 1.3 | — | `--text-heading` |
| subheading | — | 500 | 20px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.08em | `--text-label` |

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
| cards | 24px |
| buttons | 16px |
| inputs | 16px |
| pills | 999px |

- **Page max-width:** 1080px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 16px

## Components

### Raised Button

**Role:** primary action button

Filled with the background color #e0e5ec, no border, 16px radius. The raised state uses a dual shadow: 8px 8px 16px #b8bcc2 and -8px -8px 16px #ffffff. 14px type, weight 500, dark grey text. On hover both blurs halve to 4px, simulating a finger approaching the light; on press the pair flips to inset with zero translation. Transitions run 200ms ease-out.

- **States:** hover: blur 8px to 4px; active: inset pair; focus-visible: blurple outline, 3px offset

### Recessed Input

**Role:** inputs and search

Filled with the background color, inset dual shadow (8px 8px 16px #b8bcc2 and inset -8px -8px 16px #ffffff), 16px radius, padding 12px 16px. Placeholder in mid grey. On focus the recess is preserved and only the shadow hue shifts toward violet at 30% opacity; the element never moves.

- **States:** focus: recess preserved, blurple-tinted shadow

### Soft Card

**Role:** content cards and stat blocks

Raised dual shadow, 24px radius, 32px padding, no border and no color change. Keep at least 32px between cards or the two shadow sets pollute each other. On hover the shadow blur halves and the card lifts 2px, signaling clickability.

### Soft Toggle

**Role:** switches and segmented controls

The track is recessed (inset pair, 16px radius, 32px tall); the knob is raised (outer shadow pair, 24px diameter, same color as the track). When on, the knob fills blurple; when off it matches the base. The switch transitions over 200ms, moving only shadow and position — no scaling.

## Do's and Don'ts

### Do

- Keep every element the same color as its background; depth is carried by shadow alone
- Fix a single light source: top-left highlight, bottom-right shadow, site-wide
- Raised uses outer shadow pairs, recessed uses inset pairs; never mix
- Radius starts at 16px; cards use 24px
- On hover reduce the shadow blur, as if a hand blocks the light
- Never exceed weight 600; let the material be the protagonist

### Don't

- Don't use pure black shadows; they instantly turn muddy grey
- Don't build neumorphism on dark backgrounds; there is no usable light
- Don't add solid borders; the material stops being continuous
- Don't differentiate hierarchy by changing element backgrounds
- Don't use sharp outlined icons or high-contrast illustrations
- Don't place two shadowed elements closer than the shadow blur radius

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Base | `#e0e5ec` | The common ground of page and elements |
| 1 | Raised | `#e0e5ec` | Raised panels, distinguished by outer shadows rather than color |

## Elevation

- **Raised:** `8px 8px 16px #b8bcc2, -8px -8px 16px #ffffff`
- **Recessed:** `inset 8px 8px 16px #b8bcc2, inset -8px -8px 16px #ffffff`
- **Hover (light dimmed):** `4px 4px 8px #b8bcc2, -4px -4px 8px #ffffff`
- **Pressed:** `inset 4px 4px 8px #b8bcc2, inset -4px -4px 8px #ffffff`

## Imagery

No photography. The material is the content: use soft same-family graphics, very light line icons, or product renders that share the base color. Any strong contrast, dark background or pure white icon breaks the fixed-light assumption.

## Layout

Capped at 1080px, 12 columns, container padding 24px. Section gap 96px, card gap from 32px. The layout must keep generous whitespace — elements sit at least one shadow blur radius apart, otherwise shadows stack and turn dirty. Dark text appears only in the content layer; the interface layer uses mid grey.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- base: `#e0e5ec`
- shadow: `#b8bcc2`
- highlight: `#ffffff`
- text: `#3d4451`
- primary: `#6d5dfc`
- danger: `#ff6b6b`

EXAMPLE COMPONENT PROMPTS:

1. Build a neumorphic button: background #e0e5ec, no border, 16px radius, text 14px/500 dark grey. Raised state uses box-shadow: 8px 8px 16px #b8bcc2, -8px -8px 16px #ffffff. On hover both blurs halve to 4px; on press switch to inset 8px 8px 16px #b8bcc2 and inset -8px -8px 16px #ffffff. The page background is also #e0e5ec.
