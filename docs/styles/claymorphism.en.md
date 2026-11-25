# Claymorphism — Style Reference

> Like a pinch of soft candy: oversized radii, inner-plus-outer shadow pairs, and a press that squashes.

**Theme:** light

Claymorphism is neumorphism's cute sibling: shapes must be round to the point of spherical (buttons 24px, cards 32px, hero containers 48px), and every element carries two shadow layers at once — the outer layer builds volume, the inner layer adds highlight and rim. Color is all pastel (pink, cream, mint, lavender, lemon), low in saturation and high in lightness; hue, not luminance, separates the levels. The most distinctive part is interaction: pressing doesn't translate the element — it stretches it 5% wider and 10% shorter while sinking 8px, the way real clay gives under a thumb. Motion uses a spring curve with overshoot so the softness can be felt.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Clay Pink | `#f8b4d9` | `--color-clay-pink` | Primary actions and the primary color block. The system's baseline hue; every other color is tuned around it. |
| Cream | `#fef3c7` | `--color-cream` | Cards and section grounds. Lighter than pink, carrying content without stealing the scene. |
| Mint | `#a7f3d0` | `--color-mint` | Success and "new" semantics, on tags and badges. |
| Lavender | `#c4b5fd` | `--color-lavender` | Secondary emphasis and info blocks. Forms a same-lightness hue contrast with pink. |
| Lemon | `#fcd34d` | `--color-lemon` | Reminders and figure highlights. Lowest frequency, smallest area. |
| Sky | `#b6e9ff` | `--color-sky` | Links and clickable markers; the only cool-leaning pastel. |

## Typography

### Nunito — the only font on the site. A rounded sans (Nunito) is half of the clay feel; swap in a geometric face and it collapses.

- **Substitute:** Quicksand, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 700, 800
- **Sizes:** 13, 15, 18, 24, 34, 48
- **Line height:** 1.15 (display), 1.25 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 800 | 48px | 1.15 | -0.01em | `--text-display` |
| heading | — | 700 | 34px | 1.2 | — | `--text-heading` |
| subheading | — | 700 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 18px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 15px | 1.6 | — | `--text-body` |
| label | — | 700 | 13px | 1.4 | 0.06em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 32px |
| buttons | 24px |
| inputs | 16px |
| hero-panels | 48px |

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Clay Button

**Role:** primary action button

Pink vertical-gradient fill, white text, 24px radius, no border, 18px type at weight 700, padding 16px 32px. The shadow is a four-part compound: outer 8px 8px 16px pink 50% and -8px -8px 16px white 80%, inner inset 4px 4px 8px white 40% and inset -4px -4px 8px deep pink 20%. On hover all four parts widen by 2px and the button lifts 4px; on press it scales 1.05 horizontally and 0.9 vertically while sinking 8px, the shadows contracting to the 2px tier. Transition 300ms on the spring curve cubic-bezier(0.34, 1.56, 0.64, 1).

- **Sizes:** padding 16px 32px; label 18px
- **States:** hover: shadows widen, lift 4px; active: scaleX 1.05, scaleY 0.9, sink 8px

### Clay Card

**Role:** feature cards and content cards

Cream-to-amber diagonal gradient, 32px radius, no border, 32px padding. Shadow: 12px 12px 24px black 8% plus two inset layers (6px 6px 12px white 60%, -4px -4px 8px black 5%). Titles are 24px/700 in deep amber. On hover the shadows each widen 4px and the card lifts 4px, transitioning 300ms on the spring curve.

### Clay Input

**Role:** form inputs

Grey-to-light-grey vertical gradient, 16px radius, no border, padding 16px 24px, 15px type. The resting state is already pressed in: inset 4px 4px 8px black 10% and inset -4px -4px 8px white 90%. On focus the inset shadows deepen to 6px 12px and a 4px pink 30% ring spreads outward. Transition 300ms spring.

### Clay Badge

**Role:** tags and status badges

Fully rounded, pastel fill (one of mint, lavender or lemon), with a 2px inner highlight and a 2px inner rim, 13px/700 type, padding 6px 14px. No borders, no outer shadow — the inner shadows keep the clay feel.

## Do's and Don'ts

### Do

- Start radius at 16px; cards 32px, containers 48px
- Give every element both an outer and an inner shadow
- Stay pastel throughout; hue separates the levels
- Stretch wide and squash short on press
- Use spring curves with overshoot for motion
- Keep at least 24px between elements

### Don't

- Don't use sharp corners or small radii
- Don't use single-layer shadows
- Don't use dark backgrounds
- Don't use saturated or pure fills
- Don't squeeze elements under 16px apart
- Don't use linear easing; softness needs bounce

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream Page | `#fef3c7` | Page base |
| 1 | Clay Card | `#ffffff` | Cards (gradient into a pastel) |

## Elevation

- **Clay raised:** `8px 8px 16px rgba(255,182,193,0.50), -8px -8px 16px rgba(255,255,255,0.80), inset 4px 4px 8px rgba(255,255,255,0.40), inset -4px -4px 8px rgba(219,112,147,0.20)`
- **Clay card:** `12px 12px 24px rgba(0,0,0,0.08), inset 6px 6px 12px rgba(255,255,255,0.60), inset -4px -4px 8px rgba(0,0,0,0.05)`
- **Clay pressed:** `2px 2px 4px rgba(255,182,193,0.30), -2px -2px 4px rgba(255,255,255,0.90), inset 4px 4px 8px rgba(219,112,147,0.25)`

## Imagery

Soft 3D-rendered objects, rounded illustrations, pastel gradient backgrounds. Interface elements may become "physical objects" — buttons like candy, cards like building blocks. No sharp photography, no dark backgrounds, no geometric line art.

## Layout

Capped at 1120px, container padding 24px, section gap 96px, card gap 24px. Elements keep at least 24px apart because the four-part shadows encroach on each other. Cards may rotate slightly (±2 degrees) for a hand-made feel, but never more than two per screen.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#7c3f58`
- background: `#fef3c7`
- card: `#ffffff`
- primary: `#f8b4d9`
- secondary: `#c4b5fd`
- accent: `#a7f3d0`

EXAMPLE COMPONENT PROMPTS:

1. Build a clay button: pink vertical gradient, white text, 24px radius, weight 700, padding 16px 32px. Four-part box-shadow: 8px 8px 16px rgba(255,182,193,0.5), -8px -8px 16px rgba(255,255,255,0.8), inset 4px 4px 8px rgba(255,255,255,0.4), inset -4px -4px 8px rgba(219,112,147,0.2). On hover all four widen by 2px and translateY(-4px); on active scaleX(1.05) scaleY(0.9) translateY(8px). Transition 300ms cubic-bezier(0.34,1.56,0.64,1).
2. Build a badge row: three fully-rounded pastel badges (mint, lavender, lemon), 13px/700 type, padding 6px 14px, each with inset 2px white highlight on top and inset 2px darker rim below — no borders, no outer shadow.
