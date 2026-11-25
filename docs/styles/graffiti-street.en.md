# Graffiti Street — Style Reference

> A spray can on a brick wall: clashing colors, thick edges, letters tilted by hand.

**Theme:** dark

Graffiti street simulates spray paint on brick and asphalt: a deep-grey near-black ground (#1c1c1e), high-saturation clashing colors (rose #ff2d55, cyan #00e5ff, yellow #ffea00, violet #b620e0, orange #ff6d00), type at weight 900 uppercase with a random rotation of -3 to 3 degrees, spray diffusion faked with layered drop-shadows, buttons and tags with 4px thick borders plus hard offset shadows, and underlines in a contrasting color standing in for spray strokes. Its rule is "messy but readable" — every element tilts, yet the text stays clear.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Spray Rose | `#ff2d55` | `--color-spray-rose` | Primary: main buttons, main tags and the loudest words. |
| Asphalt | `#1c1c1e` | `--color-asphalt` | Page ground. Brick and asphalt at night. |
| Spray Cyan | `#00e5ff` | `--color-spray-cyan` | Second clash, forming the strongest contrast with rose. |
| Spray Yellow | `#ffea00` | `--color-spray-yellow` | Highlights and strokes, like fluorescent paint. |
| Spray Violet | `#b620e0` | `--color-spray-violet` | Third clash, used to break the frame's color unity. |
| Spray Orange | `#ff6d00` | `--color-spray-orange` | Fourth clash and warnings, medium frequency. |

## Typography

### Inter — weight 900 only, uppercase. Titles compress to line height 1.0 with a random rotation, as if sprayed on.

- **Substitute:** 'Arial Black', Impact, sans-serif
- **Weights:** 900
- **Sizes:** 14, 18, 24, 34, 46, 64
- **Line height:** 1 (display), 1.1 (headings), 1.5 (body)
- **Letter spacing:** -0.02em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 64px | 1 | -0.02em | `--text-display` |
| heading | — | 900 | 46px | 1.05 | -0.02em | `--text-heading` |
| subheading | — | 900 | 34px | 1.1 | — | `--text-subheading` |
| body-lg | — | 900 | 24px | 1.35 | — | `--text-body-lg` |
| body | — | 900 | 18px | 1.5 | — | `--text-body` |
| label | — | 900 | 14px | 1.4 | 0.04em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** compact

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
| cards | 0 |
| buttons | 0 |
| tags | 0 |

- **Page max-width:** 1200px
- **Section gap:** 64px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Spray Tag

**Role:** the spray tag (core component)

Transparent ground, 4px clashing-color stroke, zero radius, 14px/900 uppercase, 0.04em tracking, padding 6px 14px, with a random rotation of -3 to 3 degrees and a 6px 6px 0 hard shadow. The text uses two or three drop-shadow layers (same hue, 1px offset, zero blur) to fake the halo of overspray.

### Brick Wall

**Role:** the brick-wall ground

repeating-linear-gradient draws staggered bricks (brick 64×24px, mortar 4px, mortar darker), at 40% overall opacity. It must stagger (the second row starting 32px in), or it reads as floor tile rather than brick.

### Thick Button

**Role:** action buttons

Rose fill, black text, zero radius, 4px black stroke, 18px/900 uppercase, padding 12px 28px, hard shadow 6px 6px 0 cyan. On hover the fill hard-cuts to yellow and the shadow turns violet; on press it shifts 6px 6px with the shadow collapsing. Transition 80ms linear.

- **Sizes:** padding 12px 28px; label 18px
- **States:** hover: yellow fill, violet shadow; active: translate 6px

### Spray Underline

**Role:** the spray stroke underline

A 4px clashing-color line under the text (text-decoration or a pseudo-element), 4% wider than the text and tilted 1 to 2 degrees, in a color contrasting the text. It is this style's most-used emphasis device.

### Sticker Blob

**Role:** the paint blob

A 24 to 96px circle or irregular block, radial-gradient from solid to transparent, its edge not sharp (blur 6 to 12px), like spreading paint. Colored with one of the clashing hues at 40% to 70% opacity, placed behind text or in a corner. Three to six per screen.

## Do's and Don'ts

### Do

- Pair the deep-grey ground with four saturated clashes
- Set type at 900 uppercase with random rotation
- Fake spray halos with zero-blur drop-shadows
- Use 4px thick borders with hard offset shadows
- Stagger the brick texture
- Stay messy but readable

### Don't

- Don't use studio product shots or clean imagery
- Don't use rounded corners
- Don't give spray paint a realistic blurred glow
- Don't rotate past 3 degrees
- Don't let the texture become floor tile
- Don't sacrifice readability

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Asphalt | `#1c1c1e` | Page ground |
| 1 | Wall Panel | `#242427` | Panels |
| 2 | Brick Pattern | `repeating gradient` | The brick texture |

## Elevation

- **Hard offset:** `6px 6px 0 #ff2d55`
- **Hard offset alt:** `6px 6px 0 #00e5ff`
- **Pressed:** `none`

## Imagery

Street photography and graffiti work: brick walls, shutters, subway cars, hand-drawn tags. Must be high contrast with visible street traces. Photos may be pressed into a high-saturation duotone and layered with spray effects. No studio product shots, soft illustration or spotless images.

## Layout

Capped at 1200px with 16px container padding and 64px section gaps. Overlap, rotation and overflow are allowed. Zero radius throughout. The chaos needs rhythm: large tags alternate with small stickers, and text stays readable throughout.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ff2d55`
- background: `#1c1c1e`
- cyan: `#00e5ff`
- yellow: `#ffea00`
- violet: `#b620e0`
- orange: `#ff6d00`

EXAMPLE COMPONENT PROMPTS:

1. Build a graffiti-street layout: asphalt black #1c1c1e ground with a staggered brick texture (brick 64×24px, mortar 4px, 40% opacity, the second row starting 32px in). Title 64px/900 uppercase, -0.02em tracking, color #ff2d55, rotate(-2deg), with two same-hue drop-shadow layers (1px offset, zero blur) for the spray halo. Button rose #ff2d55 fill, black text, zero radius, 4px black stroke, hard shadow 6px 6px 0 #00e5ff, the fill hard-cutting to #ffea00 on hover with the shadow turning #b620e0. A 4px #00e5ff underline sits under the text, tilted 1.5 degrees. A few 24–96px paint blobs in the corners (radial-gradient fade, 8px blur, 60% opacity). Zero radius sitewide, rotation never past 3 degrees.
