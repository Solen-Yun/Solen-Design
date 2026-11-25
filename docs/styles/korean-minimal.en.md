# Korean Minimal — Style Reference

> Warm white, pastel, large radii: restrained but not cold, like a room with very good light.

**Theme:** light

Korean minimal draws on both K-beauty and Korean architecture: whitespace is generous (32 to 64px padding), the ground is warm white rather than pure white, body text is slate blue rather than black, and every accent is a low-saturation pastel (blush, sage, sand). Radii run large (24px), borders are extremely fine (10% opacity), and shadows are nearly invisible. It carries two easily-missed bans — never all caps, never wide tracking, because both read as assertive in this language.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Slate Blue | `#3d4a5c` | `--color-slate-blue` | Primary text and headings. Softer than black, never oppressive over long reads. |
| Warm White | `#faf9f7` | `--color-warm-white` | The canvas. A warm white with a rice tint, the style's foundation. |
| Blush | `#d4a5a5` | `--color-blush` | First accent, for tags, emotional semantics and detail strokes. |
| Sage | `#a8c5b8` | `--color-sage` | Second accent and success state, often as a 10% ground. |
| Sand | `#e8d4b8` | `--color-sand` | Warm section grounds and image backings, creating a temperature difference. |
| Olive | `#b9b08a` | `--color-olive` | The darkest pastel, for borders and secondary marks. |

## Typography

### Pretendard — the only typeface, weights 300 to 500. Never all caps, never wide tracking, line height 1.75 to keep breathing.

- **Substitute:** 'Apple SD Gothic Neo', 'PingFang SC', system-ui, sans-serif
- **Weights:** 300, 400, 500
- **Sizes:** 12, 14, 16, 20, 26, 34
- **Line height:** 1.3 (display), 1.4 (headings), 1.75 (body)
- **Letter spacing:** 0 on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 300 | 34px | 1.3 | — | `--text-display` |
| heading | — | 400 | 26px | 1.4 | — | `--text-heading` |
| subheading | — | 500 | 20px | 1.45 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.75 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.75 | — | `--text-body` |
| label | — | 500 | 12px | 1.5 | 0.02em | `--text-label` |

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
| buttons | 16px |
| inputs | 16px |
| images | 20px |
| pills | 999px |

- **Page max-width:** 1040px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Soft Button

**Role:** the primary action button

Slate-blue fill, warm-white text, 16px radius, no stroke, no shadow, 15px/400, padding 14px 32px. On hover the fill brightens 6%; on press it darkens one step and scales slightly to 0.99. Transition 400ms ease-out — slow but not dragging.

- **Sizes:** padding 14px 32px; label 15px
- **States:** hover: brighter fill; active: darker, scale 0.99

### Breathing Card

**Role:** content and work cards

White ground, 24px radius, 1px slate-blue 10% stroke, 32px padding, shadow 0 2px 8px slate blue 4%. Title 26px/400, body 14px/400 at line height 1.75 in slate blue 70%. On hover the shadow widens to 20px and the card lifts 2px.

### Gentle Input

**Role:** form inputs

White ground, 16px radius, 1px slate-blue 12% stroke, padding 12px 18px, 15px text. Placeholder slate blue 35%. On focus the stroke turns slate blue 40% with a 3px blush 15% outer ring — dimensions unchanged.

### Pastel Chip

**Role:** category and filter tags

Fully rounded 999px, pastel 12% ground (blush, sage or sand), no stroke, 13px/500, padding 6px 14px; text in slate blue, never colored. The selected state raises the ground to 22%.

### Photo Bed

**Role:** image containers

20px radius, backing in sand or blush 12%, zero padding, overflow hidden. The image itself takes no border, at 4:5 or 1:1. On hover the image scales 1.03 and the container's shadow deepens.

## Do's and Don'ts

### Do

- Ground in warm white, never pure white
- Set body text in slate blue
- Accent only with low-saturation pastels
- Round corners 16 to 24px
- Keep borders 1px at 10%
- Never go all caps, never widen tracking

### Don't

- Don't use high-saturation pure colors
- Don't use borders above 2px
- Don't use all caps or wide tracking
- Don't use dark or black backgrounds
- Don't over-decorate or pile on elements
- Don't use neon or fluorescent color

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm White | `#faf9f7` | The canvas |
| 1 | Soft White | `#ffffff` | Cards |
| 2 | Blush Bed | `rgba(212,165,165,0.12)` | Image backings and sections |

## Elevation

- **Card:** `0 2px 8px rgba(61,74,92,0.04)`
- **Card hover:** `0 6px 20px rgba(61,74,92,0.07)`

## Imagery

Still lifes and portraits in natural light, warm-toned and low saturation. Pastel backings allowed. No high-contrast photography, cold light or UI illustration.

## Layout

Capped at 1040px with 32 to 64px container padding and 128px section gaps. One column or an asymmetric two (5:7), with large whitespace on the right. At least 24px between elements and a measure under 34em.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#3d4a5c`
- background: `#faf9f7`
- card: `#ffffff`
- blush: `#d4a5a5`
- sage: `#a8c5b8`
- border: `rgba(61,74,92,0.10)`

EXAMPLE COMPONENT PROMPTS:

1. Build a Korean-minimal card: white ground, 24px radius, 1px rgba(61,74,92,0.1) stroke, 32px padding, shadow 0 2px 8px rgba(61,74,92,0.04). Title 26px/400 #3d4a5c; body 14px/400 at line height 1.75 in rgba(61,74,92,0.7). A small tag sits above the card (12% #d4a5a5 ground, 999px radius, 13px/500). On hover the shadow widens to 0 6px 20px rgba(61,74,92,0.07) and the card lifts 2px. Page ground #faf9f7.
