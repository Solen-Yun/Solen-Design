# Neo-Brutalism — Style Reference

> Black frames, hard shadows, zero radius: the interface is built from slabs that refuse to be squeezed.

**Theme:** light

Neo-Brutalism takes its attitude from architecture: structure exposed, materials undecorated. On the web this means giving every element a 2px to 4px pure-black frame, a blur-free offset shadow, and zero border radius, so flat surfaces gain real thickness. Interaction must be physical too — on hover the shadow grows and the element lifts toward the top-left (Brutal Snap); on active the element translates by exactly the shadow offset while the shadow drops to zero, as if pressed flat by a palm (Physical Crushing). Color is black and white as the base, plus four high-saturation accents, each with one fixed duty — no gradients, no translucency.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#000000` | `--color-ink` | All borders, text, hard shadows and inverted blocks. The entire weight of the structure rests on it; never substitute dark grey. |
| Paper | `#ffffff` | `--color-paper` | Page canvas and card fill. Pure white maximizes the contrast against black frames and shadows. |
| Hot Pink | `#ff006e` | `--color-hot-pink` | Selected text and primary accent. Also the color card shadows may switch to on hover. |
| Acid Lime | `#ccff00` | `--color-acid-lime` | Hover accent fill. Used for the hover background of tags and primary buttons; background transitions follow the shared token, or the state duration declared by a named component. No gradients and no opacity fades. |
| Electric Cyan | `#00d9ff` | `--color-electric-cyan` | Accent for data, status and secondary panels. When pink and lime are present, cyan only appears in small areas. |
| Tangerine | `#ff9500` | `--color-tangerine` | Warning and fourth accent. The least used; no more than three simultaneous occurrences site-wide. |

## Typography

### sans-serif — all headings, weight fixed at 900. Headings draw power from weight and tight tracking, not from stacking sizes.

- **Substitute:** Inter, 'Helvetica Neue', Arial, sans-serif
- **Weights:** 700, 900
- **Sizes:** 24, 32, 48, 64, 72
- **Line height:** 0.95 (display), 1.05 (headings), 1.6 (body)
- **Letter spacing:** -0.02em on display, 0.12em on uppercase labels

### mono — body, labels, buttons and data. Monospace makes the interface read like terminal output; it is the style's second signature.

- **Substitute:** ui-monospace, SFMono-Regular, Menlo, Consolas, monospace
- **Weights:** 400, 700
- **Sizes:** 12, 14, 16
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | sans-serif | 900 | 72px | 0.95 | -0.02em | `--text-display` |
| heading-lg | sans-serif | 900 | 48px | 1 | -0.02em | `--text-heading-lg` |
| heading | sans-serif | 900 | 32px | 1.1 | -0.01em | `--text-heading` |
| subheading | sans-serif | 700 | 24px | 1.2 | — | `--text-subheading` |
| body | mono | 400 | 16px | 1.6 | — | `--text-body` |
| body-sm | mono | 400 | 14px | 1.6 | — | `--text-body-sm` |
| label | mono | 700 | 12px | 1.4 | 0.12em | `--text-label` |

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
| badges | 0 |

- **Page max-width:** 1280px
- **Section gap:** 80px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Block Button

**Role:** primary action button

White fill, 2px ink border, square corners, 4px hard shadow (offset 4px 4px, blur 0). 12px type, weight 700, uppercase, 0.12em tracking, monospace; padding 12px 24px. On hover the shadow grows to 10px, the element shifts 4px toward the top-left, and the background turns acid lime, transitioning over 150ms ease-out. On press the element moves 6px toward the bottom-right and the shadow drops to zero.

- **Sizes:** padding 12px 24px; label 12px
- **States:** hover: fill, shadow, and translate transition 150ms ease-out; active: translate 6px 6px, shadow none

### Brutal Card

**Role:** content card and product card

White fill, 2px ink border, square corners, 8px hard shadow. Padding 24px, card gap 32px. On hover the element lifts 4px, the shadow grows to 10px, and the shadow color may switch to hot pink, transitioning over 150ms ease-out.

- **States:** hover: translate -4px -4px, shadow 10px

### Mono Label

**Role:** category tags and status badges

Ink fill, white text, square corners, no border. 12px monospace, weight 700, uppercase, 0.12em tracking; padding 4px 8px. For inverted use, switch to white fill with a black frame.

- **Sizes:** padding 4px 8px; label 12px

### Hard Input

**Role:** form input

White fill, 2px ink border, square corners, no shadow. 14px monospace, padding 12px 16px. On focus a 4px hard shadow appears while the border width stays unchanged, so the box never shifts layout.

- **States:** focus: 4px hard shadow, border width unchanged

### Marquee Bar

**Role:** scrolling bar at the top or bottom of the page

Ink background, white text, square corners, no shadow. 16px monospace, uppercase, 0.12em tracking, 8px vertical padding; content scrolls horizontally at constant speed, separated by 4px solid squares.

## Do's and Don'ts

### Do

- Give every element a 2px to 4px pure-black border; never grey borders
- Shadows must be blur-free hard offsets, in the 4px and 8px tiers only
- Keep corners square; any radius weakens the physicality
- Grow the shadow on hover; on active, translate by the shadow offset and zero it
- Headings fixed at weight 900; body text in monospace
- The shared transition token is transition-all duration-200; named showcase component examples on this page use 150ms ease-out

### Don't

- Don't use any border radius (rounded-lg, rounded-full, etc.)
- Don't use blurred shadows (shadow-lg, shadow-xl); they destroy the physical feel
- Don't use gradients, including on buttons and backgrounds
- Don't use grey or translucent borders
- Don't fade with opacity; distinguish the shared token's 200ms from the named showcase components' 150ms override
- Don't translate on active without zeroing the shadow

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#ffffff` | Page canvas |
| 1 | Slab | `#f4f4f4` | Secondary panels and section backgrounds |

## Elevation

- **Hard offset sm:** `4px 4px 0 0 #000000`
- **Hard offset lg:** `8px 8px 0 0 #000000`
- **Hover lift:** `10px 10px 0 0 #000000`
- **Pressed:** `none`

## Imagery

No photography. Use thick-stroked geometric shapes, dot grids and checkerboards, pixelated icons — all monochrome or one of the four accents. Any image must be drawable with 2px lines and solid blocks; gradients or soft glow break the style.

## Layout

12 columns, capped at 1280px, container padding 16px to 32px. Section gap 80px, card gap 32px. Elements may offset 4px to 8px from the grid for a sense of collision, but offsets within one section keep the same direction. Heading and body alignment must be hard-aligned; no softened centering.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#000000`
- background: `#ffffff`
- border: `#000000`
- accent: `#ff006e`
- hoverFill: `#ccff00`
- secondaryPanel: `#f4f4f4`

EXAMPLE COMPONENT PROMPTS:

1. Build a primary button: white fill, 2px pure-black border, square corners, box-shadow 4px 4px 0 0 #000. Text 12px monospace, 700, uppercase, 0.12em tracking, padding 12px 24px. On hover the box-shadow becomes 10px 10px 0 0 #000, transform translates -4px -4px, and the background transitions to #ccff00, transition 150ms ease-out. On active, transform translates 6px 6px and box-shadow becomes none.
2. Build a card grid: three columns, 32px gap. Each card is white with a 2px pure-black border, square corners, an 8px hard shadow and 24px padding; inside, in order: a 12px uppercase monospace label (ink fill, white text), a 32px weight-900 heading, and 14px monospace body copy. On hover the card translates -4px -4px and the shadow grows to 10px.
