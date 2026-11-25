# Maximalism — Style Reference

> More is more: clashing colors, double borders, layered shadows, pattern over pattern.

**Theme:** dark

Maximalism is a direct revolt against minimalism: on a deep-violet ground (#1a0a2e) it floods the page with high-saturation clashing colors (rose #d4145a, gold #ffbe0b, blue #3a86ff, violet #8338ec, mint #06d6a0), borders use border-double or heavy dashed strokes, shadows are multi-layer offset solids (4px gold plus 8px blue), backgrounds stack diagonal gradients, headings run 6xl and above in uppercase with wide tracking, and elements may rotate and skew. It bans grey neutrals as primary colors — grey in maximalism equals absence. The only restraint is "every layer must stay visible and never smear into another".

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Rose | `#d4145a` | `--color-rose` | First clash: main blocks and the loudest headings. |
| Deep Violet Base | `#1a0a2e` | `--color-deep-violet` | Page ground. Deep enough for all five clashing colors to leap at once. |
| Gold | `#ffbe0b` | `--color-gold` | First shadow layer and highlights, the brightest of the clashing set. |
| Blue | `#3a86ff` | `--color-blue` | Second shadow layer and the cool-side blocks. |
| Violet | `#8338ec` | `--color-violet` | The gradient's middle stop and third clash. |
| Mint | `#06d6a0` | `--color-mint` | Fourth clash and success state. |

## Typography

### Inter — bold sans; headings 6xl and up, uppercase, 0.24em tracking. The gap between big and small is itself ornament.

- **Substitute:** 'Arial Black', Helvetica, sans-serif
- **Weights:** 700, 900
- **Sizes:** 14, 20, 28, 40, 60, 88
- **Line height:** 0.95 (display), 1.05 (headings), 1.5 (body)
- **Letter spacing:** -0.02em on display, 0.24em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 88px | 0.95 | -0.02em | `--text-display` |
| heading | — | 900 | 60px | 1 | -0.02em | `--text-heading` |
| subheading | — | 700 | 40px | 1.1 | — | `--text-subheading` |
| body-lg | — | 700 | 28px | 1.35 | — | `--text-body-lg` |
| body | — | 700 | 20px | 1.5 | — | `--text-body` |
| label | — | 900 | 14px | 1.4 | 0.24em | `--text-label` |

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
| stickers | 999px |

- **Page max-width:** 1280px
- **Section gap:** 64px
- **Card padding:** 28px
- **Element gap:** 16px

## Components

### Layered Panel

**Role:** the layered panel (core component)

Clashing-color fill, zero radius, a 4px double gold-and-blue border (border-double or two inset box-shadows), 28px padding, outer shadow 4px gold plus 8px blue. The whole panel rotates -1deg. Inside, a diagonal gradient (rose→violet→blue at 25%) and a pattern layer (dots or diagonals at 10%). On hover the shadow grows a third layer (12px violet).

- **States:** hover: third shadow layer

### Stacked Button

**Role:** action buttons

Rose fill, gold text, zero radius, 3px dashed gold stroke, 20px/900 uppercase, 0.24em tracking, padding 14px 32px, outer shadow 4px gold plus 8px blue. On hover the fill hard-cuts to violet and the shadow widens to 12px; on press it translates 8px 8px with the shadow contracting to 4px. Transition 120ms linear.

- **Sizes:** padding 14px 32px; label 20px
- **States:** hover: violet fill, shadow 12px; active: translate 8px

### Pattern Overlay

**Role:** the pattern layer

repeating-linear-gradient (45-degree diagonals, 8px apart) or radial-gradient (6px dots) laid over a section, colored with one of the clashing hues at 8% to 12% opacity. The pattern layer never carries content; its job is to keep the plane from being flat.

### Sticker Badge

**Role:** the sticker badge

A 48 to 72px fully round or star shape, filled with a clashing color, 2px gold stroke, rotated -8 to 8 degrees, pressed against a card edge and overflowing it by 12px. Inside, two lines of 11px uppercase text (like "NEW / 2026"). Three to five per screen.

### Mixed Type Block

**Role:** the mixed type block

One block deliberately mixing sizes and orientations: an 88px headline, a 28px subhead, a 14px label, each with its own rotation (-3, 0, +2 degrees) and its own color bar. The text isn't typeset — it's pasted onto a wall.

## Do's and Don'ts

### Do

- Use all five saturated clashing colors
- Double or heavy dashed borders
- Multi-layer offset solid shadows
- Pattern over pattern
- Headings 6xl and above, uppercase
- Allow rotate and skew

### Don't

- Don't use grey neutrals as primary colors
- Don't let layers smear into each other
- Don't go minimal with whitespace
- Don't use a single shadow layer
- Don't use rounded corners
- Don't rely on one accent color

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Violet | `#1a0a2e` | Page ground |
| 1 | Gradient | `linear-gradient rose→violet→blue` | Gradient sections |
| 2 | Rose Solid | `#d4145a` | Clashing blocks |

## Elevation

- **Double stack:** `4px 4px 0 #ffbe0b, 8px 8px 0 #3a86ff`
- **Triple stack:** `4px 4px 0 #ffbe0b, 8px 8px 0 #3a86ff, 12px 12px 0 #8338ec`
- **Pressed:** `none`

## Imagery

High-saturation collage: patterns, illustration, photography and stickers all mixed and required to overlap. Photos may be pressed into a high-saturation duotone and layered with pattern. No grayscale photography, minimal composition or whitespace-driven imagery.

## Layout

Capped at 1280px with 24px container padding and 64px section gaps. Heavy overlap, rotation and overflow are allowed. The chaos needs rhythm: large clashing blocks alternate with small stickers so the eye always has somewhere to land.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#ffbe0b`
- background: `#1a0a2e`
- rose: `#d4145a`
- blue: `#3a86ff`
- violet: `#8338ec`
- mint: `#06d6a0`

EXAMPLE COMPONENT PROMPTS:

1. Build a maximalist panel: deep-violet #1a0a2e ground, a rose #d4145a filled block, zero radius, border: 4px double #ffbe0b, box-shadow 4px 4px 0 #ffbe0b, 8px 8px 0 #3a86ff, transform rotate(-1deg), 28px padding. Inside, a diagonal gradient linear-gradient(135deg, rgba(212,20,90,0.25), rgba(131,56,236,0.25), rgba(58,134,255,0.25)) plus a 45-degree diagonal pattern (rgba(6,214,160,0.10)). Title 88px/900 uppercase, -0.02em tracking; label 14px uppercase 0.24em in gold. Button rose fill, gold text, 3px dashed #ffbe0b stroke, double shadow, the fill hard-cutting to #8338ec on hover with the shadow widening to 12px.
