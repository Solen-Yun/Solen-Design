# Retro Vintage — Style Reference

> Old paper never floats: everything sits quietly, and only the colors oxidize.

**Theme:** light

Retro vintage reproduces the age of print: sepia as the lead color, cream paper, chunky borders, old-fashioned typography (uppercase, wide-tracked serif headings). It carries two bans almost no other style has. First, no element ever scales or translates vertically — old paper does not float (Antique Stillness). Second, transitions may never be faster than 150ms, because oxidation is a geological process (Slow Passage). All colors are low-saturation and yellow-leaning; the four auxiliaries (brick red, forest green, sand, olive) come from 1970s printing inks.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Sepia | `#8b4513` | `--color-sepia` | Headings, borders and the primary accent. The system's entire sense of age comes from this brown. |
| Cream | `#f5e6d3` | `--color-cream` | Page canvas. Mimics yellowed paper, two steps warmer than pure white. |
| Brick | `#c94c4c` | `--color-brick` | Warnings and key marks, in printing red rather than screen red. |
| Forest | `#2e4a3f` | `--color-forest` | Secondary accent and dark blocks. The packaging green common in the seventies. |
| Sand | `#d4a373` | `--color-sand` | Warm blocks and separators, letting hierarchy exist without contrast. |
| Olive | `#816904` | `--color-olive` | Tags and postmark-style stamps; the least frequent. |

## Typography

### Playfair Display — headings and wordmarks, mostly uppercase with 0.16em wide tracking. The serif's stroke contrast is the key to vintage print.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700, 900
- **Sizes:** 16, 20, 28, 40, 56
- **Line height:** 1.1 (display), 1.2 (headings), 1.65 (body)
- **Letter spacing:** 0.01em on display, 0.16em on uppercase labels

### Inter — body copy and captions, kept neutral. Line height runs tall, echoing the setting of old books.

- **Substitute:** 'Courier New', system-ui, sans-serif
- **Weights:** 400, 500
- **Sizes:** 13, 15, 17
- **Line height:** 1.4 (display), 1.4 (headings), 1.65 (body)
- **Letter spacing:** 0 on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Playfair Display | 900 | 56px | 1.1 | 0.01em | `--text-display` |
| heading | Playfair Display | 700 | 40px | 1.15 | 0.01em | `--text-heading` |
| subheading | Playfair Display | 400 | 28px | 1.25 | — | `--text-subheading` |
| body-lg | Inter | 400 | 17px | 1.65 | — | `--text-body-lg` |
| body | Inter | 400 | 15px | 1.65 | — | `--text-body` |
| label | Inter | 500 | 13px | 1.4 | 0.16em | `--text-label` |

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
| cards | 4px |
| buttons | 4px |
| inputs | 4px |
| stamps | 999px |

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Letterpress Button

**Role:** action button

Sepia fill, cream text, 2px same-color border, 4px radius, no shadow. 15px/500, uppercase, 0.16em tracking, padding 14px 28px. On hover the fill deepens one step while the position never changes (no translation, no scaling); on press it becomes a transparent button carrying the 2px border. Transition 300ms ease-out, never faster than 150ms.

- **Sizes:** padding 14px 28px; label 15px
- **States:** hover: deeper fill, no movement; active: outlined

### Paper Card

**Role:** content cards and menu cards

Cream brightened one step, 2px sepia 25% border, 4px radius, 32px padding. Inside, a 1px dashed divider may appear (echoing a ticket). Titles are 28px uppercase serif at 0.16em; body is 15px at 1.65 line height. On hover the border deepens to 40% only — the element never moves.

### Stamp Badge

**Role:** tags and postmark-style marks

Olive or brick fill, cream text, 999px full radius, no border, 12px/500, uppercase, 0.16em tracking, padding 4px 12px. An inner shadow may be layered to suggest an embossed print (inset 0 1px 0 white 30%).

### Ticker Rule

**Role:** dividers and decorative bands

32px tall: a repeating small pattern (dots or diagonal lines) on sepia, or a plain 2px sepia line. Used between sections instead of large blank areas, with 24px page margins. No scrolling animation.

## Do's and Don'ts

### Do

- Keep every element still — no translation, no scaling
- Keep transitions at 150ms or slower
- Set headings uppercase at 0.16em tracking
- Start borders at 2px in the brown family
- Keep the whole palette low-saturation and yellow-leaning
- Suggest age with paper grain and embossing

### Don't

- Don't use any scale or translate-y
- Don't use transitions faster than 150ms
- Don't use modern gradients or glassmorphism
- Don't use neon or high-saturation colors
- Don't use the minimal-flat language
- Don't use large radii

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream | `#f5e6d3` | Page canvas |
| 1 | Lifted Cream | `#faf0e2` | Cards and panels |
| 2 | Forest Block | `#2e4a3f` | Dark blocks and footer |

## Elevation

- **None:** `none — everything sits flat on the paper`
- **Inset rule:** `inset 0 0 0 1px rgba(139,69,19,0.25)`

## Imagery

Old photographs, print scans, woodcut engravings. A layer of paper grain and 5% yellowing may be applied. Image edges may take chunky borders or stamp perforations. No modern photography, no 3D renders, no saturated color.

## Layout

Capped at 1120px, container padding 32px, section gap 96px. Old-fashioned centered symmetry is allowed (unlike modern left alignment); headings often travel with fine-line ornaments. Information may run dense, but decorative bands separate the blocks.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#8b4513`
- background: `#f5e6d3`
- card: `#faf0e2`
- brick: `#c94c4c`
- forest: `#2e4a3f`
- olive: `#816904`

EXAMPLE COMPONENT PROMPTS:

1. Build a vintage card: background #faf0e2, 2px solid rgba(139,69,19,0.25) border, 4px radius, 32px padding, no shadow. Title in serif 28px uppercase 0.16em tracking, color #8b4513; body 15px at 1.65 line height. On hover the border deepens to rgba(139,69,19,0.4) only, transition 300ms ease-out — no translation, no scaling. Page base #f5e6d3.
2. Build a letterpress button: sepia fill, cream 15px/500 uppercase text at 0.16em tracking, 2px same-color border, 4px radius, padding 14px 28px, no shadow. On hover the fill deepens one step with zero movement over 300ms ease-out; on active it becomes transparent while keeping the 2px border.
