# Tropical Paradise — Style Reference

> Palm fronds, mango yellow, coral: a resort poster.

**Theme:** light

Tropical paradise comes from resort visuals: a warm yellow ground (#fffde7), teal primary (#00897b), coral (#ff6f61) and mango yellow (#ffc107) as accents, leaf green (#4caf50) for plants. Radii grow to 16–24px or fully round, conveying soft holiday ease; shadows carry color (teal 20%) rather than grey; headings use round large type with tightened tracking; hover shifts through bright color changes. Palm fronds and petals are the main figures, allowed to obscure the composition at scale.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Teal | `#00897b` | `--color-teal` | Primary: main buttons, text and the semantics of seawater. |
| Warm Yellow | `#fffde7` | `--color-warm-yellow` | Page ground. Sand under sunlight. |
| Coral | `#ff6f61` | `--color-coral` | First accent: the primary CTA and flowers. |
| Mango | `#ffc107` | `--color-mango` | Second accent and highlights, like pulp and sun. |
| Leaf | `#4caf50` | `--color-leaf` | Palm fronds and plant semantics. |
| Olive | `#a09314` | `--color-olive` | Text pressed onto yellow, and the shadowed side of sand. |

## Typography

### Nunito — rounded sans, headings at 800 with tracking tightened to -0.02em. The letterforms must not come to a point; a holiday has no edges.

- **Substitute:** 'Trebuchet MS', 'PingFang SC', system-ui, sans-serif
- **Weights:** 400, 700, 800
- **Sizes:** 13, 16, 20, 28, 38, 52
- **Line height:** 1.2 (display), 1.3 (headings), 1.65 (body)
- **Letter spacing:** -0.02em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 800 | 52px | 1.2 | -0.02em | `--text-display` |
| heading | — | 800 | 38px | 1.25 | -0.02em | `--text-heading` |
| subheading | — | 700 | 28px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 20px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.65 | — | `--text-body` |
| label | — | 700 | 13px | 1.45 | 0.06em | `--text-label` |

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
| cards | 24px |
| buttons | 999px |
| inputs | 16px |
| images | 24px |

- **Page max-width:** 1160px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Island Button

**Role:** action buttons

Coral fill, white text, fully rounded 999px, no stroke, 16px/700, padding 14px 32px, colored shadow 0 4px 20px teal 20%. On hover the fill turns mango yellow, text turns olive and the shadow widens to 32px; on press it scales 0.97. Transition 180ms ease-out.

- **Sizes:** padding 14px 32px; label 16px
- **States:** hover: mango fill, wider shadow; active: scale 0.97

### Resort Card

**Role:** content and itinerary cards

White ground, 24px radius, no stroke, 28px padding, colored shadow 0 4px 20px teal 20%. Title 28px/700 teal, body 16px at line height 1.65. The image is a 24px-radius 4:3 fill of the card's width. On hover the shadow widens to 32px, the card lifts 4px and the image scales 1.03.

### Palm Frond

**Role:** the palm-frond ornament (signature)

A 160 to 400px palm frond (an SVG path drawing 8 to 12 pinnate leaflets), filled leaf green at 60% to 100%, allowed to angle in from a page corner and obscure part of the content. It identifies this style more than anything else — one or two per screen.

### Sun Circle

**Role:** the sun and light spots

A 120 to 240px circle with a radial gradient from mango yellow to coral at 70% opacity, plus three to five smaller spots (each 24 to 48px at 20% opacity). Placed in a section corner for atmosphere, static or with only a very slow brightness breath.

### Pill Field

**Role:** form inputs

White ground, fully rounded 999px, 1px teal 25% stroke, padding 12px 22px, 16px text. Placeholder teal 50%. On focus the stroke turns teal 80% with a 3px teal 15% outer ring.

## Do's and Don'ts

### Do

- Pair warm yellow with teal and coral
- Round corners 16 to 24px or fully round
- Tint shadows teal rather than grey
- Let palm fronds obscure the composition
- Set round large headings with tight tracking
- Shift through bright colors on hover

### Don't

- Don't use dark or cool-toned photography
- Don't use sharp right angles
- Don't use grey-black shadows
- Don't go below a 12px radius
- Don't use serif faces
- Don't exceed two palm fronds

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Warm Yellow | `#fffde7` | Page ground |
| 1 | White | `#ffffff` | Cards |
| 2 | Teal Wash | `rgba(0,137,123,0.10)` | Section grounds |

## Elevation

- **Teal soft:** `0 4px 20px rgba(0,137,123,0.20)`
- **Teal hover:** `0 10px 32px rgba(0,137,123,0.28)`

## Imagery

Resort photography: beaches, palms, fruit, pools, tropical plants. Must be bright, warm and saturated. Flat-lay overhead shots allowed. No dark photography, cool imagery or realistic portrait close-ups.

## Layout

Capped at 1160px with 24px container padding and 96px section gaps. Palm fronds and light spots may obscure the composition at scale. Radii uniformly favor the large end (16 to 24px or fully round), never below 12px.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#00897b`
- background: `#fffde7`
- coral: `#ff6f61`
- mango: `#ffc107`
- leaf: `#4caf50`
- olive: `#a09314`

EXAMPLE COMPONENT PROMPTS:

1. Build a tropical-paradise card: white ground, 24px radius, no border, 28px padding, box-shadow 0 4px 20px rgba(0,137,123,0.2). Title 28px/700 Nunito in #00897b with -0.02em tracking; body 16px at line height 1.65 in #2f3e3c. Image 4:3 with a 24px radius. A 240px palm frond angles in from the top-left (SVG path, fill #4caf50 at 80% opacity), allowed to cover part of the content. Primary button #ff6f61 fill, white text, fully rounded 999px, padding 14px 32px, colored shadow, the fill turning #ffc107 with olive text on hover. Page ground #fffde7; no radius below 12px anywhere.
