# Shoujo Manga — Style Reference

> Cherry pink, screentone, petal borders, ribbon titles: every panel is a heartbeat.

**Theme:** light

The shoujo-manga style ports Japanese girl-manga's visual language onto the interface: a cherry-pink key, screentone texture as background, petal and lace scallops as borders, ribbon banners as chapter titles, and gold multi-point stars as sparkle accents. Its density runs higher than other styles — ornament is not optional but identity; corners must carry a flower or a star. Radii are always large (fully-rounded buttons, 16px cards, 24px panels), and the ground stays pearl white. Dark backgrounds are banned, cold hard geometry is banned, bare undecorated cards are banned.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Sakura | `#ffb7c5` | `--color-sakura` | Primary: ribbons, borders and primary actions. The style's first language. |
| Pearl White | `#fff5f7` | `--color-pearl` | Page ground. A warm white with a touch of pink, closer to manga paper than pure white. |
| Lavender | `#c4b5fd` | `--color-lavender` | The second color, for dream and fantasy emphasis. |
| Starlight | `#fde68a` | `--color-starlight` | Sparkles and accents. Must carry a 4px soft glow, or it stops being a star. |
| Petal | `#fecdd3` | `--color-petal` | Large soft blocks and the screentone ground. |
| Peach Rose | `#f8a9d7` | `--color-peach-rose` | The most emotional color, for "heart-flutter" key buttons. |

## Typography

### Quicksand — headings and buttons. The rounded geometric sans carries softness; it is the style's base voice.

- **Substitute:** 'Comic Sans MS', 'Trebuchet MS', sans-serif
- **Weights:** 400, 600, 700
- **Sizes:** 13, 15, 18, 24, 32, 44
- **Line height:** 1.15 (display), 1.25 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.1em on uppercase labels

### Nunito — body and dialogue. Line height 1.75, reading like a manga's narration box.

- **Substitute:** 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 600
- **Sizes:** 13, 15, 17
- **Line height:** 1.4 (display), 1.4 (headings), 1.75 (body)
- **Letter spacing:** 0 on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Quicksand | 700 | 44px | 1.15 | 0.02em | `--text-display` |
| heading | Quicksand | 700 | 32px | 1.2 | — | `--text-heading` |
| subheading | Quicksand | 600 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | Nunito | 400 | 17px | 1.75 | — | `--text-body-lg` |
| body | Nunito | 400 | 15px | 1.75 | — | `--text-body` |
| label | Quicksand | 600 | 13px | 1.45 | 0.1em | `--text-label` |

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
| cards | 16px |
| panels | 24px |
| buttons | 999px |
| inputs | 999px |

- **Page max-width:** 1080px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 20px

## Components

### Ribbon Banner

**Role:** the ribbon title (the identity core)

Cherry-pink fill, no stroke, 40px tall body with 32px side padding, V-shaped ribbon tails clipped at both ends (16px each). Text is Quicksand 700, 18px, pearl white, 0.1em tracking. A 1px pink shadow line may run beneath the ribbon for thickness.

### Lace Card

**Role:** content cards (with lace scallops)

White ground, 16px radius, 1px cherry-pink 40% stroke, 32px padding, shadow 0 8px 24px pink 35%. The top or all four edges take an 8px-radius wave scallop made of radial-gradient (16px apart). A 14px cherry-pink flower icon sits at the top-left as a corner mark.

### Sparkle

**Role:** the multi-point star sparkle

Four-point stars (two crossed slender diamonds, or SVG), 8px to 20px, filled starlight gold with a 4px soft glow. Scattered at card corners and beside titles, 3 to 6 per screen, either still or breathing slowly on a 4-second dim-bright cycle.

### Pill Button

**Role:** action buttons

Peach-rose or cherry-pink fill, pearl-white text, 999px full radius, no stroke, 15px/700, padding 12px 28px, shadow 0 6px 16px pink 40%. On hover the fill brightens and scales to 1.03; on press it shrinks to 0.97. Transition 250ms ease-out.

### Screentone Bed

**Role:** the screentone background layer

A 4px-interval, 0.8px-radius petal-pink dot grid (radial-gradient) layered over section grounds at 25% to 35% overall opacity. It is the hint of manga printing — never stronger, or the text goes muddy.

## Do's and Don'ts

### Do

- Lead with cherry pink
- Put a flower or star at every corner
- Use ribbon banners for chapter titles
- Layer screentone at 25% to 35%
- Scale the radii: fully-rounded buttons, 16px cards
- Give sparkles their soft glow

### Don't

- Don't use dark or moody backgrounds
- Don't use cold hard geometry
- Don't ship bare undecorated cards
- Don't push screentone past 35%
- Don't use small radii
- Don't use realistic photography

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Pearl White | `#fff5f7` | Page ground |
| 1 | White | `#ffffff` | Cards |
| 2 | Screentone | `radial-gradient dot pattern` | The screentone layer |

## Elevation

- **Card:** `0 8px 24px rgba(255,183,197,0.35)`
- **Sparkle:** `0 0 4px rgba(253,230,138,0.90)`

## Imagery

Manga-style illustration: figure close-ups, petals, ribbons, sparkles and screentone shadows. Photos may be graded into screentone monochrome as flashback scenes. No realistic photography, cold geometry or moody imagery.

## Layout

Capped at 1080px with 24px container padding and 96px section gaps. Cards may tilt slightly (-2 to 2 degrees) and stack offset. The title area is usually a centered ribbon, with content spreading as two or three card columns. Ornament density runs above normal, but body line width never exceeds 34em.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#5a4a52`
- background: `#fff5f7`
- card: `#ffffff`
- sakura: `#ffb7c5`
- starlight: `#fde68a`
- lavender: `#c4b5fd`

EXAMPLE COMPONENT PROMPTS:

1. Build a shoujo-manga card: white ground, 16px radius, 1px rgba(255,183,197,0.4) stroke, 32px padding, shadow 0 8px 24px rgba(255,183,197,0.35). The top carries an 8px lace scallop from radial-gradient (16px apart). A 14px cherry-pink flower icon sits at the top-left; two 12px starlight-gold four-point stars (with 0 0 4px rgba(253,230,138,0.9) glow) at the bottom-right. Title Quicksand 700 24px, body Nunito 15px/1.75. The section ground may layer 4px-interval #fecdd3 screentone (30% opacity). Page ground #fff5f7.
2. Build a ribbon banner: cherry-pink fill, no stroke, 40px tall with 32px side padding, V-tails clipped at both ends (16px each), Quicksand 700 18px pearl-white text at 0.1em tracking, with a 1px pink shadow line beneath.
