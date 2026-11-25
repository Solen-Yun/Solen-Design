# Dark Academia — Style Reference

> Deep brown leather, forest-green spines, antique gold embossing: a library open only at night.

**Theme:** dark

Dark academia draws from classic campuses and old books: deep brown, forest green and antique gold build the key, cream serves as the paper, and serif type carries all text with letter spacing opened to 0.15em like gilding. Its rhythm is extremely slow — transitions run 700 to 1000ms ease-in-out, because this language's reference is candlelight and page turns, not screens. Cards use an inner shadow to create the soft depression of paper (inset 0 0 35px antique gold 5%), widening the halo to 60px on hover. Neon is banned, modern tech-feel is banned, flashy animation is banned, cold grey-blue is banned.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Brown | `#3d2b1f` | `--color-deep-brown` | Header, primary buttons and the deepest blocks. The color of a leather cover. |
| Forest | `#2d4a3e` | `--color-forest` | Secondary blocks and contrast surfaces. The cloth of an old book spine. |
| Antique Gold | `#8b7355` | `--color-antique-gold` | Strokes, embossing and secondary accents. All metal feel comes from it. |
| Cream | `#f5f0e1` | `--color-cream` | Paper and card grounds. A slightly yellowed old-paper tone. |
| Umber | `#5c4033` | `--color-umber` | Hover deepening and pressed effects, darker than deep brown. |
| Moss | `#647f53` | `--color-moss` | Success and "reading" states, from the mildew green of old page edges. |

## Typography

### EB Garamond — the only font on the site. Body line height 1.8 with slightly open tracking; headings take 0.15em of gilded spacing.

- **Substitute:** Garamond, Georgia, 'Songti SC', serif
- **Weights:** 400, 500, 600
- **Sizes:** 14, 16, 19, 24, 32, 44
- **Line height:** 1.15 (display), 1.3 (headings), 1.8 (body)
- **Letter spacing:** 0.02em on display, 0.15em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 44px | 1.15 | 0.02em | `--text-display` |
| heading | — | 600 | 32px | 1.25 | 0.02em | `--text-heading` |
| subheading | — | 400 | 24px | 1.35 | 0.02em | `--text-subheading` |
| body-lg | — | 400 | 19px | 1.8 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.8 | — | `--text-body` |
| label | — | 500 | 14px | 1.5 | 0.15em | `--text-label` |

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
| cards | 2px |
| buttons | 2px |
| inputs | 2px |

- **Page max-width:** 1080px
- **Section gap:** 128px
- **Card padding:** 40px
- **Element gap:** 24px

## Components

### Leather Button

**Role:** primary action button

Deep-brown fill, cream 85% text, 1px antique-gold 45% stroke, 2px radius, 14px serif, 0.15em tracking, padding 16px 40px, shadow 0 4px 10px brown 20%. On hover the fill turns umber, the text rises to 100%, the stroke to 80% and the shadow widens to 18px; on press it darkens one more tier. Transition 700ms ease-in-out.

- **Sizes:** padding 16px 40px; label 14px
- **States:** hover: umber fill, deeper shadow; active: darker still

### Paper Card

**Role:** content cards and book-page blocks

Cream fill, 2px radius, 1px antique-gold 25% stroke, 40px padding, inner shadow 0 0 35px antique gold 5% making the paper halo. On hover the stroke rises to 55%, the inner shadow widens to 60px and deepens to 14%, and a 20% warm-yellow radial light appears in the top-right (radial-gradient from the corner). Transition 1000ms ease-in-out.

### Gilt Rule

**Role:** the gilded divider

A 1px antique-gold 40% line, inset 24px at both ends, optionally holding an 8px diamond at the center. For dividers between sections — more book-like than whitespace.

### Study Input

**Role:** forms and search inputs

Cream 90% fill, 2px radius, 1px antique-gold 30% stroke, padding 14px 18px, 16px serif. Placeholders in umber 50%. On focus the stroke turns antique gold 80% with a 0 0 0 2px gold 15% outer ring.

### Wax Seal

**Role:** seal-style marks and badges

A 48px circular seal filled deep brown or forest, holding a 24px serif single letter, edged with a 2px antique-gold 40% stroke, with a short 0 8px 16px brown 30% shadow. For section marks and "finished reading" states.

## Do's and Don'ts

### Do

- Lead with deep brown, forest green and antique gold
- Let serif type carry all text
- Keep transitions at 700 to 1000ms ease-in-out
- Give cards a paper halo via inner shadow
- Open letter spacing to 0.15em like gilding
- Use cream as the paper

### Don't

- Don't use vivid neon palettes
- Don't use modern tech-feel design
- Don't use flashy animation
- Don't use cold grey-blue tones
- Don't use exaggerated curves beyond the small radius
- Don't transition faster than 700ms

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Brown | `#3d2b1f` | Page ground |
| 1 | Forest | `#2d4a3e` | Secondary blocks |
| 2 | Cream | `#f5f0e1` | Cards and paper |

## Elevation

- **Paper inset:** `inset 0 0 35px rgba(139,115,85,0.05), 0 4px 14px rgba(61,43,31,0.05)`
- **Paper hover:** `inset 0 0 60px rgba(139,115,85,0.14), 0 8px 24px rgba(61,43,31,0.10)`
- **Button:** `0 4px 10px rgba(61,43,31,0.20)`

## Imagery

Classical still-life and architecture photography: old books, candlesticks, arched windows, stone cloisters. Must be warm-toned, low-saturation, with clear shadow zones. Photos may be graded into sepia monochrome. No modern cities, tech products or saturated images.

## Layout

Capped at 1080px with 24px container padding and 128px section gaps. Two layouts are allowed — an asymmetric two-column at the golden ratio (1:1.618) or centered symmetry — but only one per page. The whole page sits on deep brown with paper cards floating above.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#f5f0e1`
- background: `#3d2b1f`
- card: `#f5f0e1`
- accent: `#8b7355`
- forest: `#2d4a3e`
- umber: `#5c4033`

EXAMPLE COMPONENT PROMPTS:

1. Build a dark-academia card: cream #f5f0e1 fill, 2px radius, 1px rgba(139,115,85,0.25) stroke, 40px padding, box-shadow inset 0 0 35px rgba(139,115,85,0.05), 0 4px 14px rgba(61,43,31,0.05). Title 32px serif, 0.02em tracking, #3d2b1f; body 16px serif at 1.8 line height. On hover the stroke rises to rgba(139,115,85,0.55) and the inner shadow widens to 60px, transition 1000ms ease-in-out. Page ground #3d2b1f.
2. Build a leather button: deep-brown fill, cream 85% 14px serif text at 0.15em tracking, 2px radius, 1px rgba(139,115,85,0.45) stroke, padding 16px 40px, shadow 0 4px 10px rgba(61,43,31,0.20). On hover the fill turns #5c4033, the text reaches full cream and the shadow widens to 18px over 700ms ease-in-out.
