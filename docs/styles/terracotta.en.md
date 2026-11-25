# Terracotta — Style Reference

> Terracotta, sand, cream: a Mediterranean afternoon where everything dries slowly in the sun.

**Theme:** light

Terracotta warmth comes from Mediterranean handmade pottery and earthen walls: a cream ground (#faf5ef), terracotta primary (#b5654a), sand (#d4a373) and earth brown (#7a6350) as the earthy palette's layers, olive green (#8b9d77) for natural elements. Shadows are warm-tinted soft light (terracotta 10%), never grey-black; click feedback uses a pressed-in sink (active translateY, not scale), because pressed pottery dents rather than springs. All cool colors are banned — blue and purple do not exist in this language.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Terracotta | `#b5654a` | `--color-terracotta` | Primary: primary buttons, main accents and pottery semantics. |
| Cream | `#faf5ef` | `--color-cream` | Page ground. A warm white wall color. |
| Sand | `#d4a373` | `--color-sand` | The first layer color, for section grounds and ornament. |
| Earth Brown | `#7a6350` | `--color-earth-brown` | Body text and the second layer. Like fired clay. |
| Olive | `#8b9d77` | `--color-olive` | Plant and "natural" semantics, for tags and touches. |
| Fresh Green | `#8fb86a` | `--color-fresh-green` | The brightest, appearing only in "new sprout" and spring themes. |

## Typography

### Lora — serif, line height 1.75. Handcraft wants slight imprecision, so tracking opens only barely.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 14, 17, 21, 28, 36, 48
- **Line height:** 1.2 (display), 1.3 (headings), 1.75 (body)
- **Letter spacing:** 0.01em on display, 0.1em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 48px | 1.2 | 0.01em | `--text-display` |
| heading | — | 600 | 36px | 1.3 | — | `--text-heading` |
| subheading | — | 400 | 28px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 21px | 1.7 | — | `--text-body-lg` |
| body | — | 400 | 17px | 1.75 | — | `--text-body` |
| label | — | 600 | 14px | 1.55 | 0.1em | `--text-label` |

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
| pots | 999px 999px 40% 40% |

- **Page max-width:** 1080px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Clay Button

**Role:** action buttons

Terracotta fill, cream text, 8px radius, no stroke, 17px/600, padding 14px 32px, warm shadow 0 6px 20px terracotta 10%. On hover the fill deepens to #a1563f and the shadow widens to 32px; on press translateY(2px) with the shadow contracting to 6px — a pressed-in dent, not a scale. Transition 200ms ease-out.

- **Sizes:** padding 14px 32px; label 17px
- **States:** hover: deeper fill; active: translateY 2px

### Clay Card

**Role:** content cards

Cream or sand 18% fill, 12px radius, 1px earth-brown 12% stroke, 32px padding, warm shadow 0 6px 20px terracotta 10%. Title 36px/600 earth brown, body 17px earth brown 80%. On hover the shadow widens to 32px and the card lifts 2px.

### Pot Silhouette

**Role:** the pot-silhouette ornament

A four-value border-radius (999px 999px 40% 40%) shapes a pot's silhouette, filled sand or terracotta at 20% to 35%, 64 to 160px. Placed at card corners or between sections as a hint of "handmade vessel", 2 to 3 per screen.

### Earth Gradient

**Role:** the earth-tone gradient layer

A 135-degree sand-to-earth-brown gradient (20% to 40% opacity) layered on section backgrounds, simulating light falling across a wall. Never past 60% — it should be a breath, not a block.

### Clay Field

**Role:** form inputs

Cream fill, 8px radius, 1px earth-brown 25% stroke, padding 12px 16px, 17px serif. Placeholder earth brown 45%. On focus the stroke turns terracotta with a 2px terracotta 20% outer ring.

## Do's and Don'ts

### Do

- Pair cream with terracotta and earth tones
- Keep shadows warm, never grey-black
- Sink on press, never scale
- Use olive for natural elements
- Round corners 8 to 12px
- Hint handcraft with pot silhouettes

### Don't

- Don't use cool colors like blue or purple
- Don't use grey-black shadows
- Don't use springy scale feedback
- Don't use metallic highlights
- Don't push gradients past 60%
- Don't use cool-toned photography

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream | `#faf5ef` | Page ground |
| 1 | Sand Block | `rgba(212,163,115,0.18)` | Secondary sections |
| 2 | Terracotta Block | `#b5654a` | Accent blocks |

## Elevation

- **Warm soft:** `0 6px 20px rgba(181,101,74,0.10)`
- **Warm hover:** `0 12px 32px rgba(181,101,74,0.16)`
- **Pressed:** `0 2px 6px rgba(181,101,74,0.12)`

## Imagery

Handmade vessels and Mediterranean scenes: pots, earthen walls, olive trees, linen, food. Natural light, warm tones, visible material texture required. No cool-toned photography, blue or purple images, or metallic highlights.

## Layout

Capped at 1080px with 24px container padding and 112px section gaps. Slight asymmetry allowed (a 5:7 two-column). Whitespace runs loose; warm shadows lift elements from the ground — never borders.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#7a6350`
- background: `#faf5ef`
- terracotta: `#b5654a`
- sand: `#d4a373`
- brown: `#7a6350`
- olive: `#8b9d77`

EXAMPLE COMPONENT PROMPTS:

1. Build a terracotta card: cream #faf5ef fill, 12px radius, 1px rgba(122,99,80,0.12) stroke, 32px padding, box-shadow 0 6px 20px rgba(181,101,74,0.1). Title 36px/600 Lora in #7a6350; body 17px at line height 1.75 in rgba(122,99,80,0.8). The upper left holds a 96px pot silhouette (border-radius 999px 999px 40% 40%, fill rgba(212,163,115,0.3)). The primary button is #b5654a fill, cream text, 8px radius, padding 14px 32px, warm shadow, deepening to #a1563f on hover and translateY(2px) on active instead of scaling. Page ground #faf5ef; blue and purple banned sitewide.
