# Natural Organic — Style Reference

> Earth tones, paper and fabric textures, irregular shapes — like something made by hand.

**Theme:** light

The natural organic style serves health, organic food, environmental and handmade brands. It rejects all cool colors and precise geometry: the ground is warm cream (#faf6f1), text uses deep bark brown (#5c4033) instead of black, shapes use 32px-plus radii and even blob curves, and edges are never perfectly parallel. The four supporting colors all come from nature — sage green, terracotta, linen and lake teal — all under 40% saturation. Texture is carried by a very faint paper grain or fabric noise, never a visible pattern. Motion is calm; hover only deepens the ground one step, never translating.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Bark | `#5c4033` | `--color-bark` | Body, headings and strokes. Replaces black to keep the page warm. |
| Warm Cream | `#faf6f1` | `--color-cream` | Page canvas. The default ground of every block, close to unbleached paper. |
| Linen | `#e9e0d4` | `--color-linen` | Cards and secondary blocks. One step deeper than cream; layers come from texture, not contrast. |
| Sage | `#8b9d77` | `--color-sage` | The botanical, "natural" primary accent, for tags and success states. |
| Terracotta | `#d4a373` | `--color-terracotta` | Warm accent with a handmade feel, for prices, badges and small fills. |
| Lake Teal | `#75a191` | `--color-lake` | The only allowed cool color, used purely as contrast, never more than 10% of a screen. |

## Typography

### Fraunces — all headings. A serif with a hint of handwriting is where the style's personality comes from.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 500
- **Sizes:** 24, 32, 40, 56
- **Line height:** 1.15 (display), 1.25 (headings), 1.7 (body)
- **Letter spacing:** -0.01em on display, 0.14em on uppercase labels

### Inter — body, notes and forms. Stays neutral so it never competes with the serif headings.

- **Substitute:** -apple-system, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500
- **Sizes:** 13, 15, 17
- **Line height:** 1.4 (display), 1.4 (headings), 1.7 (body)
- **Letter spacing:** 0 on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Fraunces | 400 | 56px | 1.15 | -0.01em | `--text-display` |
| heading | Fraunces | 400 | 40px | 1.2 | — | `--text-heading` |
| subheading | Fraunces | 500 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | Inter | 400 | 17px | 1.7 | — | `--text-body-lg` |
| body | Inter | 400 | 15px | 1.7 | — | `--text-body` |
| label | Inter | 500 | 13px | 1.4 | 0.14em | `--text-label` |

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
| cards | 32px |
| buttons | 999px |
| inputs | 20px |
| images | 32px |

- **Page max-width:** 1180px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Handmade Button

**Role:** primary action button

Deep bark fill, warm cream text, 999px full radius, no border, 15px/500 type, padding 14px 28px, 0.02em tracking. On hover the fill only lightens to 90% bark — no translation, no shadow; on press the fill turns sage. Transition 300ms ease-out.

- **States:** hover: lighter fill only; active: sage fill

### Paper Card

**Role:** product cards and story cards

Linen ground, 32px radius, no border, 32px padding, shadow 0 8px 24px bark 8% (optional). Images above use 32px radii instead of square corners with a 4:5 ratio; titles are 24px/500 serif, body 15px bark 70%. On hover the ground deepens to sage 12% — nothing else moves.

### Rounded Input

**Role:** forms and subscription inputs

Warm cream ground, 1px bark 20% border, 20px radius, padding 14px 18px, 15px type. On focus the border turns sage and a 3px sage 20% outer ring appears, with no size change.

### Blob Badge

**Role:** tags and "organic" badges

An irregular blob shape (border-radius like 60% 40% 55% 45% / 45% 55% 45% 55%), filled with sage or terracotta at 15%, text 13px/500 bark. No border, no shadow.

## Do's and Don'ts

### Do

- Use earth tones with saturation kept under 40%
- Radii start at 20px, cards at 32px, and blob shapes are welcome
- Use deep bark instead of pure black
- Add a very faint paper grain or fabric noise
- Use a handwriting-tinged serif for headings
- Hover only deepens the ground, never translates

### Don't

- Don't use pure black #000000
- Don't use cool colors as the main palette
- Don't use sharp corners or perfect circles
- Don't use neon or high-saturation colors
- Don't use tech-style dark dashboards
- Don't let the texture become a visible pattern

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm Cream | `#faf6f1` | Page canvas |
| 1 | Linen | `#e9e0d4` | Cards and secondary blocks |

## Elevation

- **None:** `none`
- **Soft:** `0 8px 24px rgba(92,64,51,0.08)`

## Imagery

Real-world photography under natural light: plants, ceramics, fabric, ingredients — warm, low saturation, light grain allowed. Compositions may leave large empty areas. No cold light, high contrast, tech products or geometric illustration.

## Layout

Capped at 1180px, container padding 24px to 48px. Section gap 112px; whitespace need not be symmetrical — left and right may differ. Two-column layouts use 5:7 instead of 1:1 to avoid over-regularity. Images may be blob- or arch-cropped.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#5c4033`
- background: `#faf6f1`
- card: `#e9e0d4`
- accent: `#8b9d77`
- warm: `#d4a373`
- border: `rgba(92,64,51,0.20)`

EXAMPLE COMPONENT PROMPTS:

1. Build a natural organic card: linen ground #e9e0d4, 32px radius, no border, 32px padding. A 4:5 image on top with the same 32px radius; below it a 24px serif title (bark #5c4033) and 15px body (bark 70%), with a sage tag at the bottom (13px, blob shape, 15% ground). On hover the ground deepens to sage 12% — no translation, no shadow.
