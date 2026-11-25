# Gothic — Style Reference

> Pointed arches, rose windows, manuscript borders: a cathedral before the lamps are lit.

**Theme:** dark

The gothic style comes from medieval church architecture and manuscript illumination: deep violet (#2d1b4e), blood red (#8b1a1a) and black form the ground, gold (#c9a227) draws the ornament lines, shapes are exclusively pointed arches, trefoils and rose windows, headings must be serif and decorative, and the page must carry manuscript vocabulary — borders and drop caps. The bans: no bright cheerful palettes, no rounded cuteness, no modern sans for headings, no over-simplification, no playful flickers or bounces — solemnity tolerates nothing light.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Deep Violet | `#2d1b4e` | `--color-deep-violet` | Page base and primary. The violet of a church at night; more layered than black. |
| Blood Red | `#8b1a1a` | `--color-blood-red` | Second primary: stained glass, seals and key emphasis. |
| Gold | `#c9a227` | `--color-gold` | Ornament lines, strokes and highlights. The color of every border. |
| Black | `#0a0a0a` | `--color-black` | The deepest sections and shadows. |
| Mid Violet | `#4a2d6e` | `--color-mid-violet` | Raised surfaces and cards, one tier brighter than the base. |
| Verdigris | `#4bc542` | `--color-verdigris` | A touch of green inside stained glass and the "living" semantic; smallest area. |

## Typography

### UnifrakturMaguntia — headings in blackletter or a high-contrast decorative serif; body in a readable serif. Blackletter is for headings only — body set in it cannot be read.

- **Substitute:** 'Cinzel', 'Playfair Display', Georgia, serif
- **Weights:** 400, 700
- **Sizes:** 18, 24, 32, 44, 60, 84
- **Line height:** 1.15 (display), 1.25 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.18em on uppercase labels

### EB Garamond — body and captions. A readable serif, line height 1.75, like a manuscript's text column.

- **Substitute:** Garamond, 'Songti SC', serif
- **Weights:** 400, 600
- **Sizes:** 15, 17, 20
- **Line height:** 1.5 (display), 1.5 (headings), 1.75 (body)
- **Letter spacing:** 0.01em on display, 0.18em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | UnifrakturMaguntia | 400 | 84px | 1.15 | 0.02em | `--text-display` |
| heading | UnifrakturMaguntia | 400 | 60px | 1.2 | — | `--text-heading` |
| subheading | UnifrakturMaguntia | 400 | 44px | 1.25 | — | `--text-subheading` |
| body-lg | EB Garamond | 400 | 20px | 1.7 | — | `--text-body-lg` |
| body | EB Garamond | 400 | 17px | 1.75 | — | `--text-body` |
| label | EB Garamond | 600 | 15px | 1.6 | 0.18em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| arches | 50% 50% 0 0 |
| windows | 999px |

- **Page max-width:** 1080px
- **Section gap:** 128px
- **Card padding:** 36px
- **Element gap:** 24px

## Components

### Pointed Arch Frame

**Role:** the pointed-arch frame (the core component)

The container's top is cut into a pointed arch with clip-path (two arcs meeting at the apex, or a polygon apex), zero radius, with a 1px gold stroke along the edge. The interior fills mid violet or deep violet and may embed stained-glass blocks. The common aspect ratio is 1:2 to 1:2.5, like a church window.

### Gilt Button

**Role:** action button

Blood-red fill, gold text, 1px gold stroke, zero radius, 15px serif, 0.18em tracking, padding 14px 36px, no shadow. On hover the fill turns deep violet, the text reaches gold 100% and the stroke rises to 80%; on press the whole button sinks 1px. Transition 400ms ease-out.

- **Sizes:** padding 14px 36px; label 15px
- **States:** hover: violet fill, gold border 80%; active: sink 1px

### Rose Window

**Role:** the rose-window ornament

A 96 to 240px circle divided by conic-gradient into 8 or 12 sectors, each taking red, violet, green or gold at 40% opacity, with a 2px gold outer ring and 4 concentric thin rings. Placed centered at a section's top or in a corner, like a church window.

### Manuscript Border

**Role:** the manuscript border

A 24 to 48px decorative band around the page margin: a 1px gold line with repeating small diamonds or trefoils, and a 16px cross or floral ornament at each corner. It frames the entire content area, making the page read as a manuscript leaf.

### Drop Cap

**Role:** the drop cap

The paragraph's first letter floats left at 3.2× the body size, aligned to three lines, colored gold or blood red, in the decorative serif. Allowed once per content block, and only in the first paragraph.

## Do's and Don'ts

### Do

- Pair deep violet, blood red and black with gold lines
- Shape with pointed arches, trefoils and rose windows
- Set headings in blackletter, body in a readable serif
- Keep manuscript-style borders on the page margin
- Use drop caps
- Start transitions at 400ms; movement stays solemn

### Don't

- Don't use bright cheerful palettes
- Don't use rounded cute elements
- Don't set headings in a modern sans
- Don't over-simplify
- Don't use quick flickers or springy bounces
- Don't set body text in blackletter

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Violet | `#2d1b4e` | Page base |
| 1 | Mid Violet | `#4a2d6e` | Cards and raised surfaces |
| 2 | Black | `#0a0a0a` | The deepest sections |

## Elevation

- **None:** `none — depth comes from arch and shadow shape`
- **Gold rim:** `inset 0 0 0 1px rgba(201,162,39,0.40)`

## Imagery

Church architecture photography, stained-glass details, manuscript illuminations, woodcuts. Always dark-toned with clear arched composition. Photos may be graded into deep-violet and blood-red duotones. No bright photography, modern illustration or any lighthearted graphic.

## Layout

Capped at 1080px with 32px container padding and 128px section gaps. Strict axial symmetry is allowed (gothic, unlike dark academia, prefers ceremonial symmetry). Ornamental bands stay on the page margin; the content area narrows inside them.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#c9a227`
- background: `#2d1b4e`
- red: `#8b1a1a`
- gold: `#c9a227`
- black: `#0a0a0a`
- mid: `#4a2d6e`

EXAMPLE COMPONENT PROMPTS:

1. Build a gothic card: deep-violet #2d1b4e ground, the top cut into a pointed arch with clip-path, zero radius, 1px gold #c9a227 stroke, 36px padding. Headings in blackletter 60px, 0.02em tracking, #c9a227; body EB Garamond 17px at 1.75 line height in rgba(233,225,245,0.85). The first paragraph's initial drops at 3.2× in #c9a227. Buttons take blood-red #8b1a1a fill with gold text, a 1px gold border, zero radius, turning deep violet on hover. Page base #2d1b4e with a 32px manuscript-style gold border band.
2. Build a rose window: a 160px circle divided by conic-gradient into 12 sectors of red, violet, green and gold at 40% opacity, with a 2px gold outer ring and 4 concentric thin rings.
