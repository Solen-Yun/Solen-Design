# Art Nouveau — Style Reference

> Not a single straight line: vines, long hair and flower stems all bend by the logic of plants growing.

**Theme:** light

Art nouveau comes from the end of the 19th century: every edge must be a curve, vines and flower stems are the primary decorative vocabulary, and Mucha-style poster composition weaves figures and plants into one frame. On the interface, the core discipline is "no right angles, no geometric shapes" — buttons fully rounded, cards curved, borders arced, dividers waved. Type must be serif or decorative; a modern sans on headings is banned. The rhythm is slow too: transitions run 500 to 700ms ease-in-out, like the pulse of plants; 150 to 200ms snap transitions and hard-edged shadows are excluded together.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Green | `#2d5016` | `--color-deep-green` | Primary: body, primary buttons and dark sections. The green of stems and leaves. |
| Ivory | `#f5f0e1` | `--color-ivory` | Page ground and paper. The yellowed tone of old posters. |
| Gold | `#c9a227` | `--color-gold` | Strokes and highlights, tracing the edges of curves. |
| Wisteria | `#8b6db5` | `--color-wisteria` | The second color, for flowers and emotional emphasis. |
| Leaf | `#4a7c3f` | `--color-leaf` | Mid green, for secondary sections and vine lines. |
| Bright Green | `#4bc542` | `--color-bright-green` | The smallest accent, only for new shoots and "new" marks. |

## Typography

### Playfair Display — headings in a high-contrast decorative serif; the body uses the same family at lighter weights, line height 1.8.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 16, 20, 26, 36, 48, 60
- **Line height:** 1.1 (display), 1.25 (headings), 1.8 (body)
- **Letter spacing:** 0.01em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Playfair Display | 700 | 60px | 1.1 | 0.01em | `--text-display` |
| heading-lg | Playfair Display | 700 | 48px | 1.15 | — | `--text-heading-lg` |
| heading | Playfair Display | 700 | 36px | 1.25 | — | `--text-heading` |
| subheading | Playfair Display | 400 | 26px | 1.35 | — | `--text-subheading` |
| body | Playfair Display | 400 | 16px | 1.8 | — | `--text-body` |
| label | Playfair Display | 400 | 14px | 1.5 | 0.12em | `--text-label` |

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
| inputs | 999px |
| frames | 48px |

- **Page max-width:** 1080px
- **Section gap:** 128px
- **Card padding:** 36px
- **Element gap:** 24px

## Components

### Vine Button

**Role:** action button

Deep-green fill, ivory text, 1px gold stroke, 999px full radius, 15px serif, 0.12em tracking, padding 16px 32px, shadow 0 4px 15px green 20%. On hover the fill turns gold, the text deep green, the shadow spreads to 25px and the arrow shifts right 4px; on press it scales to 0.98. Transition 500ms ease-in-out.

- **Sizes:** padding 16px 32px; label 15px
- **States:** hover: gold fill, arrow shifts; active: scale 0.98

### Vine Card

**Role:** content cards and poster blocks

Soft-ivory fill, 32px radius, 1px gold 35% stroke, 36px padding, shadow 0 4px 15px green 20%. A 1px leaf-green vine curve (a single SVG path with two or three leaves) runs along the top or left. On hover the stroke rises to 60%, the shadow spreads to 25px and the vine rotates clockwise 3 degrees. Transition 700ms ease-in-out.

### Wave Divider

**Role:** the wavy divider

A 1px gold wave (a single-cycle SVG sine, 8px amplitude, 120px period) spanning the content width, optionally holding a 16px wisteria flower at the center. It replaces straight dividers, paired with the vine ornament.

### Curved Frame

**Role:** arced frames and image containers

Image containers refuse rectangles: they take an arch (border-radius 999px at the top, 8px at the bottom) or an ellipse crop. The outer frame is a 1px gold stroke with a small scroll ornament at each corner. No shadow.

### Blossom Mark

**Role:** flower marks and badges

A five-petal flower (SVG path or stacked CSS circles), 32px to 64px, filled wisteria or gold, with a 6px dark dot at the center. Used for section marks and "featured" tags, at most three per screen.

## Do's and Don'ts

### Do

- Make every edge a curve
- Decorate with vines and flowers
- Set headings in a decorative serif
- Transition at 500 to 700ms ease-in-out
- Pair deep green with gold and ivory
- Divide with wavy lines

### Don't

- Don't use harsh right angles or geometric shapes
- Don't use neon or saturated modern color
- Don't strip out the ornament
- Don't set headings in a modern sans
- Don't use 150 or 200ms snap transitions
- Don't use hard-edged shadows

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Ivory | `#f5f0e1` | Page ground |
| 1 | Soft Ivory | `#faf7ef` | Cards |
| 2 | Deep Green | `#2d5016` | Dark sections |

## Elevation

- **Soft:** `0 4px 15px rgba(45,80,22,0.20)`
- **Soft hover:** `0 8px 25px rgba(201,162,39,0.40)`

## Imagery

Mucha-style poster illustration: flowing hair, flowers, vine borders, flat fills with fine lines. Photos may be graded into art-nouveau duotones and set in curved frames. No geometric illustration, modern photography or hard-edged graphics.

## Layout

Capped at 1080px with 24px container padding and 128px section gaps. Asymmetric compositions and curved boundaries are allowed (a section's bottom may arc). Elements drift slightly along the direction of plant growth, but body copy stays readable and left-aligned.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#2d5016`
- background: `#f5f0e1`
- card: `#faf7ef`
- gold: `#c9a227`
- wisteria: `#8b6db5`
- leaf: `#4a7c3f`

EXAMPLE COMPONENT PROMPTS:

1. Build an art-nouveau card: background #faf7ef, 32px radius, 1px rgba(201,162,39,0.35) stroke, 36px padding, shadow 0 4px 15px rgba(45,80,22,0.2). Along the left, a 1px #4a7c3f vine SVG curve with two leaves. Title 36px Playfair Display 700 in #2d5016; body 16px serif at 1.8 line height. Below the card, a 1px gold wave (8px amplitude) as the divider. On hover the stroke rises to rgba(201,162,39,0.6) and the vine rotates 3deg, transition 700ms ease-in-out. Page ground #f5f0e1.
2. Build a vine button: deep-green fill, ivory 15px serif text at 0.12em tracking, 999px radius, 1px gold stroke, padding 16px 32px, shadow 0 4px 15px rgba(45,80,22,0.2). On hover the fill turns gold, the text deep green and the shadow spreads to 25px over 500ms ease-in-out; on press scale 0.98.
