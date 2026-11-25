# Ghibli Style — Style Reference

> Hand-painted skies and meadows, a green so warm it turns sweet, everything half a beat slower.

**Theme:** light

The Ghibli style comes from animation background art: skies gradient from pale blue into cream, clouds are a few blurred white blobs, the ground is a textured sage green. Its core is not the palette but the "hand-made trace" — radii are always large, edges carry a 2px semi-transparent stroke, and cards with buttons tilt slightly (0.8 degrees) on hover, as if someone picked them up to look. All colors run low-saturation and warm; the darkest text is a warm brown (#5a4a3a) instead of black. Motion is slow, 500 to 700ms, ease-in-out, allowing "organic" moves like scaling and rotation instead of mechanical vertical slides.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Sage | `#7cb9a8` | `--color-sage` | Primary actions and nature semantics. The meadow's green; the system's primary color. |
| Cream | `#f4e4bc` | `--color-cream` | Cards and the horizon. Gives the frame the warmth of "lit by sunset". |
| Warm Brown | `#5a4a3a` | `--color-warm-brown` | All text and headings. Replaces black to protect the frame's warmth. |
| Coral | `#e8a87c` | `--color-coral` | Sunset and warm accents, on badges, prices and highlights. |
| Sky Teal | `#85cdca` | `--color-sky-teal` | Sky and water; the upper half of the gradient. |
| Rose Grey | `#c38d94` | `--color-rose-grey` | Emotional accents and character tones; only in small areas. |

## Typography

### Quicksand — the only font on the site. A rounded sans with a loose 1.75 line height, so text reads like narration inside the frame.

- **Substitute:** 'Hiragino Maru Gothic ProN', 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 13, 15, 18, 24, 32, 48
- **Line height:** 1.15 (display), 1.3 (headings), 1.75 (body)
- **Letter spacing:** -0.01em on display, 0.08em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 48px | 1.15 | -0.01em | `--text-display` |
| heading | — | 600 | 32px | 1.25 | — | `--text-heading` |
| subheading | — | 500 | 24px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.75 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.75 | — | `--text-body` |
| label | — | 500 | 13px | 1.5 | 0.08em | `--text-label` |

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
| buttons | 999px |
| inputs | 16px |
| icons | 999px |

- **Page max-width:** 1120px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Journey Button

**Role:** primary action button

A sky-teal-to-sage vertical gradient, white text, 999px full radius, 2px stroke (primary at 25% opacity). 18px type, weight 500, padding 16px 32px, shadow 0 8px 20px green 30%. On hover it lifts 4px, scales 1.01, rotates 0.8 degrees and the shadow spreads to 30px; on press it scales 0.98 with the angle back to zero. Transition 500ms ease-in-out.

- **Sizes:** padding 16px 32px; label 18px
- **States:** hover: lift 4px, scale 1.01, rotate 0.8deg; active: scale 0.98, rotate 0

### Story Card

**Role:** content cards and scene cards

A cream-to-light-amber diagonal gradient (90% opacity), 24px radius, 1px stroke (#d4c49a 45%), 32px padding, 10px blur. The icon block is a 64px circle with a sky-teal-to-sage gradient and an inner shadow. On hover the card lifts 6px, counter-rotates 0.8 degrees, scales 1.01 and the shadow turns green 18%, while the icon scales 1.05 and rotates 6 degrees. Transition 700ms ease-in-out.

### Story Input

**Role:** forms and writing inputs

Cream 60% fill, 2px stroke (#d4c49a 40%), 16px radius, padding 16px 20px, 15px type, warm-brown text. On focus the stroke turns sage and the fill rises to 80%, over 300ms.

### Cloud Layer

**Role:** hero clouds and background decoration

Three to five white ellipses (2:1 aspect) at 40% to 60% opacity, blurred 4px, set across the top third of the sky gradient, staggered and never overlapping. Either still, or drifting horizontally extremely slowly (60 seconds or more per loop).

## Do's and Don'ts

### Do

- Replace black text with warm brown
- Keep radii large: fully-rounded buttons, 24px cards
- Allow 0.8-degree rotation and 1.01 scaling on hover
- Time motion at 500 to 700ms, ease-in-out
- Build the scene with the sky gradient and cloud layer
- Set body line height at 1.75 so it reads like narration

### Don't

- Don't use pure black or saturated color
- Don't use sharp corners
- Don't use fast transitions or linear easing
- Don't let clouds merge into one blob
- Don't add tech-flavored elements to the frame
- Don't rely on shadows as the primary layering tool

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Sky to Cream | `linear-gradient(#87ceeb, #b4e4f5, #f4e4bc)` | The hero sky |
| 1 | Cream Card | `#f4e4bc` | Cards and panels |

## Elevation

- **Card:** `0 8px 30px rgba(90,74,58,0.06)`
- **Card hover:** `0 16px 40px rgba(124,185,168,0.18)`
- **Button:** `0 8px 20px rgba(124,185,168,0.30)`

## Imagery

Hand-painted illustration and animation background art: skies, meadows, cottages, clouds. Paper or watercolor texture may overlay at 5% to 10%. No sharp photography, no 3D renders, no saturated color blocks.

## Layout

Capped at 1120px with 24px container padding and 112px section gaps. The hero is a full-bleed sky gradient with the title centered and high, leaving plenty of sky below. Content runs as two or three card columns; cards may stagger 8px in height for a hand-made feel.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#5a4a3a`
- background: `#f4e4bc`
- card: `rgba(244,228,188,0.9)`
- primary: `#7cb9a8`
- sky: `#85cdca`
- accent: `#e8a87c`

EXAMPLE COMPONENT PROMPTS:

1. Build a Ghibli-style card: a cream-to-light-amber 135-degree gradient (90% opacity), 24px radius, 1px rgba(212,196,154,0.45) stroke, 32px padding, backdrop-blur 10px, shadow 0 8px 30px rgba(90,74,58,0.06). Top-left a 64px circular icon block (sky-teal-to-sage gradient). On hover translateY(-6px) rotate(-0.8deg) scale(1.01) with the shadow turning rgba(124,185,168,0.18), over 700ms ease-in-out.
2. Build a journey button: a sky-teal-to-sage vertical gradient, white 18px/500 text, 999px radius, 2px rgba(124,185,168,0.25) stroke, padding 16px 32px, shadow 0 8px 20px rgba(124,185,168,0.30). On hover lift 4px, scale 1.01 and rotate 0.8deg over 500ms ease-in-out; on press scale 0.98 with the angle at zero.
