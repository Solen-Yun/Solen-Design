# Mobile Editorial — Style Reference

> The rhythm of a magazine pressed into a phone: serif headlines, warm paper, a single column of flow.

**Theme:** light

The mobile-editorial style transplants magazine typography onto a phone screen: serif headlines carry the personality, sans body copy keeps it readable, a warm paper ground (#fffdf8) supplies the printed feel, and the structure is a single vertical column plus a horizontal feature strip plus a bottom navigation. Its color discipline is strict — coral #e97b61 is the only strong action color, and everything else is paper, ink and three low-saturation supporting colors. Any extra accent breaks the editorial rhythm, so in its spec "one color fewer" always beats "one color more".

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#24211f` | `--color-ink` | Headings and body. A near black with warmth, which is where the printed feel comes from. |
| Paper | `#fffdf8` | `--color-paper` | The page ground. A faintly warm white, more paper-like than plain white. |
| Coral | `#e97b61` | `--color-coral` | The only strong action color: primary buttons, section labels and links. |
| Sage | `#c5d8c1` | `--color-sage` | The marker color for lifestyle and nature sections. A ground, never type. |
| Sand Gold | `#e9d7a9` | `--color-sand-gold` | Pull-quote grounds and the culture section — the second ground color. |
| Lilac | `#d7c4e8` | `--color-lilac` | Opinion and review sections, appearing least often. |

## Typography

### Playfair Display — serif for headings, 24 to 30px for most. On a phone, larger type only squeezes the line, so restraint rules.

- **Substitute:** Georgia, 'Songti SC', serif
- **Weights:** 400, 700
- **Sizes:** 20, 24, 30, 38
- **Line height:** 1.1 (display), 1.2 (headings), 1.6 (body)
- **Letter spacing:** -0.01em on display, 0.18em on uppercase labels

### Inter — sans for body copy and labels. Body at 15px and line height 1.75, comfortable for a thumb scrolling down.

- **Substitute:** system-ui, -apple-system, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 15
- **Line height:** 1.4 (display), 1.4 (headings), 1.75 (body)
- **Letter spacing:** 0 on display, 0.18em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Playfair Display | 700 | 38px | 1.1 | -0.01em | `--text-display` |
| heading | Playfair Display | 700 | 30px | 1.2 | — | `--text-heading` |
| subheading | Playfair Display | 400 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | Inter | 400 | 15px | 1.75 | — | `--text-body-lg` |
| body | Inter | 400 | 14px | 1.75 | — | `--text-body` |
| label | Inter | 600 | 12px | 1.4 | 0.18em | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |

### Border Radius

| Element | Value |
|---|---|
| cards | 16px |
| buttons | 999px |
| inputs | 12px |
| images | 12px |

- **Page max-width:** 480px
- **Section gap:** 32px
- **Card padding:** 20px
- **Element gap:** 12px

## Components

### Coral Button

**Role:** the primary action button

Coral fill, white label, fully rounded at 999px, no stroke, 15px/500, 12px 20px padding. On hover the fill deepens to #d9644e; on press it scales 0.98. The transition changes color only, over 200ms.

- **Sizes:** padding 12px 20px; label 15px
- **States:** hover: #d9644e; active: scale 0.98

### Story Card

**Role:** the story card (a vertical list item)

Paper ground with a 1px ink 15% rule above and below (no side borders), 20px 0 padding. At the top a 12px uppercase 0.18em coral section label plus reading time, in the middle a 24px serif headline of at most two lines, below it 14px body copy of at most three lines in ink 65%. The cards carry no gap between them; the rules do the dividing.

### Feature Strip

**Role:** the horizontal feature strip

A horizontally scrolling row of cards, each 280px wide with a 12px radius, a 4:3 image on the left and a 20px serif title below. Cards are 12px apart; the container has 16px padding on each side and lets the last card overhang by 24px as a hint that it scrolls.

### Archive Field

**Role:** the search and subscribe input

Paper ground with only a 1px ink 25% bottom rule (no enclosing border), 12px 4px padding, 14px type. The placeholder is ink 45%. On focus the rule turns coral and stays 1px.

### Bottom Nav

**Role:** the bottom navigation

Fixed at the bottom, 56px tall, paper ground with 16px blur and a 1px ink 10% rule along the top, four equal items, each a 12px label under a 20px icon. The current item is coral; the rest are ink 50%.

## Do's and Don'ts

### Do

- Pair serif headlines with sans body copy
- Keep coral the only strong action color
- Use a single column capped at 480px
- Carry features in a horizontal strip
- Keep line height 1.75 for thumb reading
- Fix the navigation to the bottom

### Don't

- Don't use many accent colors
- Don't break the editorial rhythm
- Don't expand into multiple columns on desktop
- Don't let a headline run past two lines
- Don't use cool-toned photography
- Don't use full-bleed images

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper | `#fffdf8` | Page ground |
| 1 | White | `#ffffff` | Overlays and nested cards |
| 2 | Sage Bed | `rgba(197,216,193,0.35)` | Section grounds |

## Elevation

- **None:** `none — hairline rules separate`
- **Sheet:** `0 -12px 40px rgba(36,33,31,0.10)`

## Imagery

Editorial photography: people, places and objects, cropped uniformly at 4:3 or 3:2, warm in tone. Small thumbnails with long headlines are allowed. No full-bleed images, no decorative illustration, no cool-toned photography.

## Layout

Mobile first: a single column capped at 480px, 16px padding, 32px section gaps. On desktop it centers as one 480px column and does not widen into multiple columns. A fixed 56px bottom navigation gets matching bottom padding in the content area.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#24211f`
- background: `#fffdf8`
- accent: `#e97b61`
- sage: `#c5d8c1`
- gold: `#e9d7a9`
- muted: `#6b6560`

EXAMPLE COMPONENT PROMPTS:

1. Build a mobile-editorial story card: paper #fffdf8 ground with a 1px rgba(36,33,31,0.15) rule above and below, no side borders, 20px 0 padding. At the top a 12px uppercase 0.18em #e97b61 section label plus reading time, in the middle a Playfair Display 24px headline of at most two lines, below it 14px body copy of at most three lines in rgba(36,33,31,0.65) at line height 1.75. The primary button is coral #e97b61 with a 999px radius and a 15px/500 white label. Page ground #fffdf8, a single column capped at 480px, and a fixed 56px bottom navigation.
