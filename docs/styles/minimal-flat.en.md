# Minimal Flat — Style Reference

> Two colors, zero shadows, generous whitespace — every decoration has been deleted.

**Theme:** light

Minimal Flat works by subtraction: no shadows, no gradients, no mixed radii; hierarchy is built from color blocks and whitespace alone. Black and white form the main structure, and four high-saturation accents each own one class of action (signal pink for pressed states, mint for data, yellow for highlights, ochre for secondary). Interaction avoids shadows too — on hover the foreground and background invert outright, completing within 200ms; the pressed state switches to an accent color for a clear one-shot feedback. Radius must be uniform — either all square or all fully rounded; mixing falls apart instantly.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | Text, strokes and dark blocks. Pure black is allowed because this style wants maximum contrast. |
| White | `#ffffff` | `--color-white` | Page canvas and inverted block fill. Always paired with pure black; no mid greys. |
| Signal Pink | `#ff3366` | `--color-signal-pink` | Pressed state and primary accent. The strongest visual signal on the site, appearing only for a single interaction moment. |
| Mint | `#00d4aa` | `--color-mint` | Data, success and charts. For numbers that must be read; never a background. |
| Bright Yellow | `#ffcc00` | `--color-yellow` | Highlights and markers. For emphasizing a passage or a label, never more than one line. |
| Ochre | `#b45700` | `--color-ochre` | Secondary accent and warning. The least used; for cases that must differ from signal pink. |

## Typography

### Inter — the only typeface on the site. Headlines use 900 with tight tracking for tension; body stays neutral at 400.

- **Substitute:** Helvetica Neue, Arial, system-ui, sans-serif
- **Weights:** 400, 700, 900
- **Sizes:** 12, 14, 16, 24, 40, 64
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** -0.03em on display, 0.12em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 64px | 1.05 | -0.03em | `--text-display` |
| heading-lg | — | 900 | 40px | 1.1 | -0.02em | `--text-heading-lg` |
| heading | — | 700 | 24px | 1.2 | -0.01em | `--text-heading` |
| body-lg | — | 400 | 18px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 16px | 1.6 | — | `--text-body` |
| label | — | 700 | 12px | 1.4 | 0.12em | `--text-label` |

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
| 192 | 192px | `--spacing-192` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |
| buttons-pill | 999px |

- **Page max-width:** 1280px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 16px

## Components

### Filled Button

**Role:** primary action button

Pure black fill, white text, 2px pure-black border, square corners, no shadow. 16px type, weight 700, padding 16px 32px. On hover the fill and text swap (white background, black text, border kept); on press the fill becomes signal pink with white text and a matching border. Transitions change colors only, 200ms.

- **Sizes:** padding 16px 32px; label 16px
- **States:** hover: inverted; active: pink fill; no shadow at any state

### Outlined Button

**Role:** secondary action

White fill, pure black text, 2px pure-black border, square corners. padding 16px 32px, 16px/700. On hover it inverts to black with white text; on press it turns signal pink, sharing the same state logic as the primary button.

### Flat Card

**Role:** content blocks and work cards

White fill, 2px pure-black border, square corners, no shadow, no radius, 32px padding. On hover the background turns fully black and the text turns white, with no translation. Images must match the card width with square crops.

### Accent Label

**Role:** categories, tags and status

No border, square corners, no radius, 12px type, weight 700, 0.12em tracking, padding 4px 8px. Default: black fill with white text; for highlights, yellow fill with black text; for data, mint fill with white text. The three variants never mix.

## Do's and Don'ts

### Do

- Use pure black and white for the main structure; each accent owns one class of action
- Zero shadows; hierarchy comes from color blocks and whitespace
- Radius must be uniform — all square or all fully rounded
- On hover invert foreground and background, never a shadow
- Pressed states switch to an accent for one clear feedback moment
- Section gaps start at 128px; prefer fewer modules

### Don't

- Don't use any shadows
- Don't use gradients
- Don't mix square corners with small radii
- Don't use elements below 50% opacity
- Don't replace black hierarchy with grey text
- Don't use patterned or textured backgrounds

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | Page canvas |
| 1 | Black Block | `#000000` | Inverted blocks and footer |

## Elevation

- **None:** `none`
- **Rule:** `2px solid #000000`

## Imagery

Two-tone photography, geometric composition, large solid color blocks. Images must be square-cropped, high contrast, with no soft transitions. Photos may be flattened to monochrome as block backgrounds. No shadows, gradients, soft glow or decorative illustration.

## Layout

12 columns, capped at 1280px, container padding 24px. Section gaps run 128px to 192px — far larger than usual; whitespace itself is the layout's main material. All sections align left or flush to the edge; headings never center. Whole blocks may invert to black with white text, but no more than twice per page.

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
- accent: `#ff3366`
- data: `#00d4aa`
- highlight: `#ffcc00`
- border: `#000000`

EXAMPLE COMPONENT PROMPTS:

1. Build a minimal flat button: pure black fill, white text, 2px pure-black border, square corners, no shadow, 16px/700, padding 16px 32px. On hover it inverts to white with black text; on press the fill becomes #ff3366 with white text. Only transition-colors 200ms — no translation or shadow of any kind.
