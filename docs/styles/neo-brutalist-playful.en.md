# Neo-Brutalist Playful — Style Reference

> The black-frame hard-shadow skeleton stays, but with five candy colors — and a little tilt is allowed.

**Theme:** light

Neo-brutalist playful is the younger sibling of neo-brutalism, with an identical skeleton: 4px pure-black borders, zero radius, blur-free offset shadows. The differences are three. First, shadows may be colored — and they swap color on hover. Second, elements may rotate -2 to 3 degrees and keep turning on hover. Third, accents expand from four to five, with three allowed per screen. Motion uses a spring curve with overshoot (300ms); pressing translates by the shadow offset and zeroes the shadow. All decoration must use icons, never emoji — that is what separates it from "playing around".

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#000000` | `--color-ink` | The baseline of all borders and shadows, plus text. The 4px stroke is non-negotiable. |
| White | `#ffffff` | `--color-white` | Card fill. Pure white so all five accents can sit on top. |
| Coral | `#ff6b6b` | `--color-coral` | Primary action and the first shadow color; the most frequent accent. |
| Mint | `#4ecdc4` | `--color-mint` | The second shadow color and links, in cold counterpoint to coral. |
| Sunny | `#ffe66d` | `--color-sunny` | Hover highlights and corner badges, on small decorative blocks. |
| Seafoam | `#95e1d3` | `--color-seafoam` | Category colors and status marks, lighter than mint. |
| Peach | `#f38181` | `--color-peach` | Emotional emphasis, on favorite, like and recommend badges. |

## Typography

### Inter — the only font on the site, weights 700 and 900 only. Headings squeeze to a 1.0 line height so the type reads as blocks.

- **Substitute:** 'Arial Black', Helvetica, sans-serif
- **Weights:** 700, 900
- **Sizes:** 14, 16, 20, 28, 40, 56
- **Line height:** 1 (display), 1.1 (headings), 1.55 (body)
- **Letter spacing:** -0.03em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 56px | 1 | -0.03em | `--text-display` |
| heading | — | 900 | 40px | 1.05 | -0.02em | `--text-heading` |
| subheading | — | 700 | 28px | 1.15 | — | `--text-subheading` |
| body-lg | — | 700 | 20px | 1.4 | — | `--text-body-lg` |
| body | — | 700 | 16px | 1.55 | — | `--text-body` |
| label | — | 700 | 14px | 1.35 | 0.04em | `--text-label` |

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
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| tags | 0 |

- **Page max-width:** 1200px
- **Section gap:** 80px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Playful Button

**Role:** primary action button

Coral fill, white text, 4px black border, zero radius, 6px coral or mint hard shadow, resting at -2 degrees of rotation. 16px/900, padding 12px 24px. On hover it lifts 4px, moves right 1px, rotates to 3 degrees and the shadow swaps to sunny yellow, widening to 8px; on press it translates 6px 6px, scales 0.95, rotation returns to zero and the shadow is removed. Transition 300ms on the spring curve cubic-bezier(0.34, 1.56, 0.64, 1). A 12px yellow square (2px black border) may sit at the top-right as a corner badge.

- **Sizes:** padding 12px 24px; label 16px
- **States:** hover: rotate to 3deg, yellow shadow; active: translate 6px, scale 0.95, shadow none

### Tilted Card

**Role:** content cards and feature cards

White ground, 4px black border, zero radius, 8px mint hard shadow, resting at -1 degree, 28px padding. A row of 16px colored squares (each with a 2px border) sits along the top as a decorative sequence. On hover the card lifts 8px, rotates 2 degrees and the shadow swaps to coral, widening to 12px. Transition 300ms spring.

### Square Input

**Role:** form inputs

White ground, 4px black border, zero radius, padding 12px 16px, 16px/700 type. On focus a 4px mint hard shadow appears without changing the size; the error state swaps both border and shadow to coral.

### Icon Tag

**Role:** tags with icons

Colored fill (one of the five accents), 2px black border, zero radius, 12px/700 type, padding 4px 10px, with a 14px line icon on the left. Emoji or symbol characters are forbidden as icon substitutes.

### Sticker Cluster

**Role:** decorative sticker groupings

Three to five small squares, dots or stars of 12px to 24px, each with a 2px black border, in different accents, the whole group rotated -3 degrees. Used only in card corners, carrying no information, at most two per screen.

## Do's and Don'ts

### Do

- Keep 4px black borders, zero radius and hard shadows
- Let shadows be colored and swap on hover
- Hold rotation between -2 and 3 degrees
- Decorate with icons only, never emoji
- Keep motion at 300ms with overshoot
- Cap the screen at three accent colors

### Don't

- Don't use any border radius
- Don't use blurred shadows
- Don't use gradients
- Don't rotate past 3 degrees
- Don't use emoji or symbol characters
- Don't use soft greys

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | Pages and cards |
| 1 | Coral Block | `#ff6b6b` | Emphasis sections |

## Elevation

- **Coral shadow:** `6px 6px 0 #ff6b6b`
- **Mint shadow:** `8px 8px 0 #4ecdc4`
- **Sunny hover:** `8px 8px 0 #ffe66d`
- **Pressed:** `none`

## Imagery

Thick-stroked shapes, geometric stickers, monochrome icons. Photos may be graded into high-contrast duotones and given a black frame. No soft photography, no gradients, no emoji decoration.

## Layout

Capped at 1200px with 24px container padding and 80px section gaps. Elements may rotate -2 to 3 degrees, with at most four rotated elements per screen. Cards stagger vertically by 8px. All content lands on multiples of the 8px grid — rotation never changes the landing point.

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
- coral: `#ff6b6b`
- mint: `#4ecdc4`
- sunny: `#ffe66d`
- peach: `#f38181`

EXAMPLE COMPONENT PROMPTS:

1. Build a playful-brutalist button: background #ff6b6b, white text, 4px solid #000 border, border-radius 0, 900 weight 16px, padding 12px 24px, box-shadow 6px 6px 0 #4ecdc4, transform rotate(-2deg). On hover translateY(-4px) rotate(3deg) with the shadow becoming 8px 8px 0 #ffe66d; on active translate(6px,6px) scale(0.95) rotate(0) with no shadow. Transition 300ms cubic-bezier(0.34,1.56,0.64,1).
2. Build a tilted card: white ground, 4px black border, zero radius, 8px mint hard shadow, resting at -1 degree, 28px padding, with a row of 16px colored squares (2px borders) along the top. On hover lift 8px, rotate 2 degrees, shadow swaps to coral at 12px. Transition 300ms spring.
