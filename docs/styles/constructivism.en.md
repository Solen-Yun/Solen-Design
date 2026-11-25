# Constructivism — Style Reference

> Red and black cut into the paper: everything shouts on a slant.

**Theme:** light

Constructivism comes from Soviet propaganda posters: only three colors — red (#cc0000), ink (#1a1a1a) and aged paper (#f2e8d5) — with color blocks cutting diagonally into the frame, elements rotated -6 to 3 degrees and skewed (skew-x-3), type set ultra-bold uppercase (6xl, weight 900), 4px black borders, and 4px hard offset shadows imitating woodblock print. Its discipline is "three colors, right angles, hard edges" — no rounding, no gradients, no color beyond the three. The chaos is surface; the composition is exact.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Poster Red | `#cc0000` | `--color-poster-red` | Primary: blocks, accents and anything that must be seen at once. |
| Ink | `#1a1a1a` | `--color-ink` | Text, 4px borders and hard shadows. Structure and impact both. |
| Aged Paper | `#f2e8d5` | `--color-aged-paper` | Page ground. Yellowed, like 1920s print. |
| Gold | `#d4a843` | `--color-gold` | The only permitted third color, in small highlights. |
| Ochre | `#8b4513` | `--color-ochre` | Text color pressed onto red, avoiding red on red. |

## Typography

### Inter — weight 900 only, always uppercase. Titles 80 to 112px at line height 0.88; the text block is itself a skewed layout element.

- **Substitute:** 'Arial Black', 'Helvetica Neue', sans-serif
- **Weights:** 900
- **Sizes:** 16, 24, 36, 56, 80, 112
- **Line height:** 0.88 (display), 0.95 (headings), 1.5 (body)
- **Letter spacing:** -0.03em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 112px | 0.88 | -0.03em | `--text-display` |
| heading-lg | — | 900 | 80px | 0.92 | -0.03em | `--text-heading-lg` |
| heading | — | 900 | 56px | 0.95 | — | `--text-heading` |
| subheading | — | 900 | 36px | 1 | — | `--text-subheading` |
| body | — | 900 | 16px | 1.5 | — | `--text-body` |
| label | — | 900 | 16px | 1.4 | 0.04em | `--text-label` |

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
| inputs | 0 |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Diagonal Plane

**Role:** the diagonal plane (core component)

A rectangle filled red or black, tilted with transform: rotate(-6deg) skewX(3deg), or cut diagonally with clip-path. Zero radius, optionally a 4px black stroke. It is never cropped by its container and may overflow the page edge, giving the sense of cutting into the paper.

### Agitprop Headline

**Role:** the agitprop headline

80 to 112px, weight 900, uppercase, line height 0.88, -0.03em tracking, itself rotated -3 degrees. It may stack in three lines and overlap color blocks, but the text must sit on the top layer. Some words may reverse out (on red blocks) or turn red.

### Block Button

**Role:** action buttons

Red fill, aged-paper text, 4px black border, zero radius, 16px/900 uppercase, padding 12px 28px, hard shadow 4px 4px 0 ink. On hover the fill turns ink and the text aged paper, the shadow widening to 8px; on press it translates 4px 4px with the shadow collapsing. Transition 100ms linear.

- **Sizes:** padding 12px 28px; label 16px
- **States:** hover: inverted, shadow 8px; active: translate 4px

### Bar Divider

**Role:** the thick bar divider

An 8px or 16px pure-black or pure-red bar spanning full width, optionally tilted -2 degrees. It replaces whitespace to separate sections — constructivism uses blocks, not emptiness.

### Number Stamp

**Role:** the large number mark

80 to 160px weight-900 digits in red or black, optionally semi-transparent (30%), pressed onto a block as a background mark. For section numbers and data emphasis, at most two per screen.

## Do's and Don'ts

### Do

- Keep strictly three colors: red, ink, aged paper
- Cut diagonally with skewed blocks
- Use weight 900 only, uppercase
- Pair 4px black borders with 4px hard shadows
- Limit angles to -6, 0, +3
- Separate sections with thick bars, not whitespace

### Don't

- Don't use soft rounded corners
- Don't use gradients
- Don't leave the three-color system
- Don't use more than three angles
- Don't use hairline borders
- Don't use soft illustration

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Aged Paper | `#f2e8d5` | Page ground |
| 1 | Red Plane | `#cc0000` | Red diagonal blocks |
| 2 | Ink Plane | `#1a1a1a` | Black blocks |

## Elevation

- **Hard offset:** `4px 4px 0 #1a1a1a`
- **Hard offset lg:** `8px 8px 0 #1a1a1a`
- **Pressed:** `none`

## Imagery

Constructivist poster graphics: geometric blocks, bold black silhouettes, factories and gears, worker silhouettes, radiating lines. Photos may be processed into red-black duotone with heavy black outlines. No color photography, soft illustration or gradients.

## Layout

Capped at 1200px, with elements allowed to overflow containers and page edges. The diagonal is the page's primary compositional device; sections separate with 8 to 16px thick bars. Only three angles are used — -6, 0, +3 degrees; mixing more angles disorders the page.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#f2e8d5`
- red: `#cc0000`
- ink: `#1a1a1a`
- gold: `#d4a843`
- ochre: `#8b4513`

EXAMPLE COMPONENT PROMPTS:

1. Build a constructivist poster layout: aged-paper ground #f2e8d5 with a red #cc0000 diagonal block (transform: rotate(-6deg) skewX(3deg), zero radius, 4px black border) cutting in from the left and overflowing its container. Title 112px/900 uppercase at line height 0.88, -0.03em tracking, rotate(-3deg), color #1a1a1a, overlapping the block but sitting on the top layer. Button red fill, aged-paper text, 4px black border, zero radius, box-shadow 4px 4px 0 #1a1a1a, inverting to black-and-paper on hover. Sections separate with 16px pure-black bars. The page uses only red, ink and aged paper.
