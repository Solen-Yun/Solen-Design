# Frutiger Aero — Style Reference

> Sky-blue glass, water drops and blades of grass: an era that believed technology would make the world clearer.

**Theme:** light

Frutiger Aero is the system aesthetic of 2004 to 2012: the default skins of that generation's desktops, early phone systems and game consoles. Its recipe is fixed — a sky-blue gradient ground (#87CEEB into #5FB3CC), panels of translucent white glass with a 1px bright edge and top highlight, large soft radii (16 to 24px), dotted with water drops, bubbles, grass blades and halos. Pressing must feel elastic: active scales to 0.95, like a jelly pressed once — this "jelly press" is its clearest break from the flat design that followed.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Sky | `#87ceeb` | `--color-sky` | The gradient's start and main background. The style's mood is decided here. |
| Deep Sky | `#5fb3cc` | `--color-deep-sky` | The gradient's end and button fill. Two steps below sky blue, to hold the picture down. |
| Glass White | `rgba(255,255,255,0.55)` | `--color-glass` | Panel fill. Must pair with a 1px bright edge and top highlight, or it turns muddy. |
| Pale Mist | `#e0f2fe` | `--color-pale-mist` | Card inner layers and secondary panels, one more layer on the same glass. |
| Grass | `#34d399` | `--color-grass` | Nature semantics and success, also the grass ornaments' color. |
| Bright Blue | `#7dd3fc` | `--color-bright-blue` | Highlights, links and halos, making elements seem to emit light. |

## Typography

### Segoe UI — the only typeface, weights on the light side (300 to 600). The humanist sans is the style's source of "clarity".

- **Substitute:** Frutiger, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 300, 400, 600
- **Sizes:** 12, 14, 16, 20, 28, 40
- **Line height:** 1.2 (display), 1.3 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 40px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 28px | 1.3 | — | `--text-heading` |
| subheading | — | 400 | 20px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 300 | 12px | 1.4 | 0.04em | `--text-label` |

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

- **Page max-width:** 1120px
- **Section gap:** 80px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Jelly Button

**Role:** the primary action button

Deep-sky fill, white text, 16px radius, 1px white 60% stroke, shadow 0 4px 12px deep blue 30% plus inset 0 1px 0 white 80%. 15px/600, padding 10px 24px. On hover the fill brightens 6% and the shadow widens to 16px; on press it scales to 0.95 and the fill darkens — the jelly press. Transition 200ms ease-out. The focus ring uses white 2px with a 2px offset, offset colored sky blue to stay visible on blue.

- **Sizes:** padding 10px 24px; label 15px
- **States:** hover: brighter, wider shadow; active: scale 0.95, darker fill

### Aero Panel

**Role:** cards and window panels

55% white-glass fill, 24px radius, 1px white 60% stroke, 24px padding, shadow 0 8px 24px deep blue 22% plus inset 0 1px 0 white 90%. A pale-mist inner card may sit inside. On hover the fill rises to 65% and the shadow widens to 32px.

### Gloss Input

**Role:** search and form inputs

White 70% fill, 16px radius, 1px white 70% stroke, inner shadow inset 0 2px 4px deep blue 15% for a slight dent, padding 10px 16px, 14px text. On focus the stroke turns bright blue with a 2px bright-blue 40% outer ring.

### Gloss Nav

**Role:** the top navigation

64px tall, white 45% glass, 16px blur, bottom 1px white 40% stroke, no shadow. Wordmark 16px/600, links 14px spaced 24px, with a 2px bright-blue underline appearing beneath on hover. A jelly button sits at the right.

### Bubble Ornament

**Role:** water-drop and bubble ornaments

Circles 24px to 96px, radial gradient from top-left white 90% to bright blue 20%, with inset 0 -3px 6px deep blue 25% and inset 0 3px 6px white 90%, forming transparent bubbles. Placed diagonally at panel corners, may half-show the background. At most five per screen.

## Do's and Don'ts

### Do

- Flood the whole page with the sky gradient
- Pair glass with a bright edge and top highlight
- Round corners 16 to 24px
- Press with the 0.95 jelly squash
- Take focus-ring offsets from the ground color so they stay visible
- Dot nature feeling with bubbles and grass

### Don't

- Don't use dark or black backgrounds
- Don't use sharp angles or hard-edge geometry
- Don't use neon or harsh colors
- Don't use monospace faces
- Don't use matte surfaces without the glass treatment
- Don't settle for a 0.98 light press — the jelly must show

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Sky Gradient | `linear-gradient(#a8dcf0, #87ceeb, #5fb3cc)` | Page ground |
| 1 | Glass | `rgba(255,255,255,0.55)` | Panels and cards |
| 2 | Pale Mist | `#e0f2fe` | Inner cards |

## Elevation

- **Glass panel:** `0 8px 24px rgba(60,130,170,0.22), inset 0 1px 0 rgba(255,255,255,0.90)`
- **Glass hover:** `0 12px 32px rgba(60,130,170,0.28), inset 0 1px 0 rgba(255,255,255,0.95)`
- **Button:** `0 4px 12px rgba(60,130,170,0.30), inset 0 1px 0 rgba(255,255,255,0.80)`

## Imagery

HD photos or renders of sky, water, grass, glass and droplets. May layer at 40% to 60% opacity over the gradient. No dark photos, noise textures or flat illustration.

## Layout

Capped at 1120px with 24px container padding and 80px section gaps. The whole page sits on the sky gradient with panels floating above; panels may overlap 8px for window layering. Icons and buttons all carry gloss — no purely flat region.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a4a5e`
- background: `#87ceeb`
- glass: `rgba(255,255,255,0.55)`
- accent: `#34d399`
- highlight: `#7dd3fc`
- border: `rgba(255,255,255,0.60)`

EXAMPLE COMPONENT PROMPTS:

1. Build a Frutiger Aero glass panel: background rgba(255,255,255,0.55), 24px radius, 1px rgba(255,255,255,0.6) stroke, 24px padding, box-shadow 0 8px 24px rgba(60,130,170,0.22), inset 0 1px 0 rgba(255,255,255,0.9), backdrop-filter blur(12px). The page ground is linear-gradient(#a8dcf0, #87ceeb, #5fb3cc). Buttons scale(0.95) on active for the jelly press.
