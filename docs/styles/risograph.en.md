# Risograph — Style Reference

> Two ink plates printed out of register: misregistration plus halftone is what Riso looks like.

**Theme:** light

Risograph is a real stencil-print process: one ink plate at a time, the paper passing through once per layer — hence misregistration, halftone dots, and a limit of three colors or fewer. The interface reproduces it with two hard rules. First, Misregistration Offset: on hover a bidirectional hard shadow must simulate two ink plates slipping apart — one toward the bottom-right (the blue plate), one toward the top-left (the orange plate); single-direction shadows are wrong. Second, Instant Print: all transitions run 100ms and must be ease-linear, because this is mechanical printing, not organic motion — ease-in-out and opacity-based color swaps are never allowed.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Riso Pink | `#ff6b9d` | `--color-riso-pink` | The first ink plate. Riso pink is highly saturated; it is the signature color. |
| Riso Blue | `#2563eb` | `--color-riso-blue` | The second ink plate. Overprinted with pink it produces violet — the core Riso mix. |
| Riso Orange | `#ff8a00` | `--color-riso-orange` | The third plate and the second direction of misregistration. |
| Cream Stock | `#faf5eb` | `--color-cream-stock` | Paper ground. Riso never prints pure white; the stock itself is cream. |
| Riso Green | `#22c55e` | `--color-riso-green` | An optional plate, as the third color or replacing orange. |
| Riso Lavender | `#a38bff` | `--color-riso-lavender` | The product of pink and blue overprinting, also usable directly as a plate. |

## Typography

### Space Mono — monospace or a bold sans with slightly open tracking. Riso edges swell with ink, so the face should be straight and forceful.

- **Substitute:** ui-monospace, 'Courier New', monospace
- **Weights:** 400, 700
- **Sizes:** 12, 14, 17, 24, 34, 48
- **Line height:** 1.1 (display), 1.2 (headings), 1.7 (body)
- **Letter spacing:** 0.02em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 48px | 1.1 | 0.02em | `--text-display` |
| heading | — | 700 | 34px | 1.2 | — | `--text-heading` |
| subheading | — | 700 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 17px | 1.65 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.7 | — | `--text-body` |
| label | — | 700 | 12px | 1.4 | 0.14em | `--text-label` |

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

- **Page max-width:** 1120px
- **Section gap:** 96px
- **Card padding:** 28px
- **Element gap:** 20px

## Components

### Overprint Card

**Role:** the overprint card (the core component)

On the cream stock, two ink plates stack: the first pink 28%, the second blue 22%, both in multiply blend mode and each offset 2px (one bottom-right, one top-left). Zero radius, 1px ink-blue 30% stroke, 28px padding. On hover a bidirectional hard shadow appears: 6px 6px 0 blue and -4px -4px 0 orange, over 100ms ease-linear.

- **States:** hover: dual-direction hard shadows appear

### Riso Button

**Role:** action button

Fluorescent pink fill, cream text, zero radius, no stroke, 14px/700, 0.14em tracking, padding 12px 28px. On hover a bidirectional hard shadow appears — 4px 4px 0 blue and -3px -3px 0 orange — while the fill hard-cuts to orange (no opacity transition); on press it translates 2px 2px and the shadow zeroes. All within 100ms ease-linear.

- **Sizes:** padding 12px 28px; label 14px
- **States:** hover: dual shadows, hard color cut; active: translate 2px

### Halftone Bed

**Role:** the halftone ground

A radial-gradient dot grid at 4px intervals, 1px radius, in ink-blue 20% or pink 20%, as a section background. Dot angles should differ slightly between plates (15 or 45 degrees) to avoid moiré.

### Registration Mark

**Role:** the registration mark

The classic cross-and-circle: a 16px ring (1px ink blue) under a 24px cross (1px orange), hollow at the center. Placed at page corners or card corners — purely decorative, but it proves this is a print.

### Ink Counter

**Role:** the ink-count mark

A line of 12px monospace type in the page corner stating how many plates this run used (e.g. "2 INKS / PINK + BLUE"), in ink black 50%. A true trace of the Riso workflow — and the style's most persuasive detail.

## Do's and Don'ts

### Do

- Use only two or three ink plates
- Make hover shadows bidirectional
- Transition at 100ms ease-linear
- Keep shadows blur-free
- Ground on cream paper
- Overprint with multiply blending

### Don't

- Don't use complex gradients
- Don't exceed four colors
- Don't use realistic shadows or lighting
- Don't use rounded corners
- Don't use single-direction shadows
- Don't use ease-in-out or opacity transitions

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cream Stock | `#faf5eb` | Paper ground |
| 1 | Pink Layer | `rgba(255,107,157,0.28)` | The first plate layer |
| 2 | Blue Layer | `rgba(37,99,235,0.22)` | The second plate layer |

## Elevation

- **Misregistration:** `6px 6px 0 #2563eb, -4px -4px 0 #ff8a00`
- **Misregistration sm:** `4px 4px 0 #2563eb, -3px -3px 0 #ff8a00`
- **Pressed:** `none`

## Imagery

Two- or three-color halftone images: split photos into two or three ink plates, with misregistration and ink swell at the edges allowed. Hand-drawn line art may be overprinted. No full-color photography, realistic shadows or gradient images.

## Layout

Capped at 1120px with 24px container padding and 96px section gaps. Zero radius; the composition may tilt slightly (0.5 to 1 degree) to mimic hand registration. Every color block must come from the two or three plates — never more than four.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a1a`
- background: `#faf5eb`
- pink: `#ff6b9d`
- blue: `#2563eb`
- orange: `#ff8a00`
- green: `#22c55e`

EXAMPLE COMPONENT PROMPTS:

1. Build a Riso button: background #ff6b9d, cream text, zero radius, 14px/700 at 0.14em tracking, padding 12px 28px. On hover box-shadow 6px 6px 0 #2563eb, -4px -4px 0 #ff8a00 (bidirectional misregistration) while the background hard-cuts to #ff8a00; on active translate(2px,2px) with no shadow. transition: 100ms linear. Page ground #faf5eb, optionally layered with 4px-interval #2563eb 20% halftone dots. Three ink colors site-wide, never more.
2. Build an overprint card: cream ground holding a pink 28% plate and a blue 22% plate in multiply blend, each offset 2px in opposite directions; zero radius, 1px ink-blue 30% stroke, 28px padding. On hover the dual hard shadow appears over 100ms ease-linear, plus a registration mark at the corner.
