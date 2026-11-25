# Y2K — Style Reference

> Chrome, translucent plastic, rainbow gradients: an interface overly optimistic about the future.

**Theme:** light

The Y2K style comes from the digital aesthetics of 1999 to 2003: everything must shine, reflect, and look freshly unboxed. Three techniques simulate it — chrome uses multi-stop linear gradients for mirror reflection, translucent plastic is a semi-transparent white fill with a 1px bright edge and top highlight, and bubbles are radial gradients with inner highlights for a spherical feel. Colors are saturated pink, cyan, magenta and sky blue, often stacked on a silver-grey ground. Radii run huge (pills and spheres); typography is a geometric sans with wide tracking, echoing the product names of that era.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Chrome | `#c0c0c0` | `--color-chrome` | Metal panels and button grounds. Multi-stop gradients are mandatory — a flat tone turns it into grey. |
| Plastic White | `rgba(255,255,255,0.55)` | `--color-plastic` | Translucent shell fill, paired with a 1px bright edge and top highlight. |
| Bubblegum | `#ff69b4` | `--color-bubblegum` | Primary accent and bubble fill; the most typical Y2K color. |
| Electric Cyan | `#00ffff` | `--color-cyan` | Highlights, edge light and data, countering the pink. |
| Magenta | `#ff00ff` | `--color-magenta` | The rainbow gradient's middle stop, on buttons and borders. |
| Sky | `#87ceeb` | `--color-sky` | Gradient start and backgrounds — that era's "tech blue". |

## Typography

### Eurostile — the geometric sans for headings and product names, wide-tracked, all caps. The letterforms' mix of square and round is the era's signature.

- **Substitute:** 'Trebuchet MS', 'Arial Black', sans-serif
- **Weights:** 400, 700
- **Sizes:** 12, 14, 18, 24, 32, 44
- **Line height:** 1.1 (display), 1.2 (headings), 1.55 (body)
- **Letter spacing:** 0.04em on display, 0.14em on uppercase labels

### Verdana — body and captions. Verdana was the most common face of the 1024×768 era.

- **Substitute:** 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 700
- **Sizes:** 12, 13, 15
- **Line height:** 1.4 (display), 1.4 (headings), 1.55 (body)
- **Letter spacing:** 0 on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Eurostile | 700 | 44px | 1.1 | 0.04em | `--text-display` |
| heading | Eurostile | 700 | 32px | 1.15 | — | `--text-heading` |
| subheading | Eurostile | 400 | 24px | 1.25 | — | `--text-subheading` |
| body-lg | Verdana | 400 | 15px | 1.55 | — | `--text-body-lg` |
| body | Verdana | 400 | 13px | 1.55 | — | `--text-body` |
| label | Eurostile | 700 | 12px | 1.4 | 0.14em | `--text-label` |

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
| cards | 24px |
| buttons | 999px |
| inputs | 24px |
| bubbles | 999px |

- **Page max-width:** 1120px
- **Section gap:** 80px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Chrome Button

**Role:** primary action button

999px full radius, a multi-stop chrome gradient (#f5f5f5 → #c8c8c8 → #9e9e9e → #e6e6e6), dark grey text, 1px #8a8a8a stroke, shadow 0 4px 10px deep-blue 20% plus inset 0 1px 0 white 95% and inset 0 -1px 0 black 15%. 14px/700, 0.1em tracking, padding 10px 28px. On hover the gradient shifts upward (the light source moves); on press the gradient inverts and darkens. Transition 150ms.

- **States:** hover: gradient shifts; active: inverted, darker

### Plastic Card

**Role:** content cards and product cards

55% white fill, 24px radius, 1px white 80% border, 24px padding, shadow 0 8px 24px deep-blue 18% plus inset 0 1px 0 white 90%. On hover the fill rises to 70% and the shadow spreads to 32px. A 96px rainbow bubble (radial gradient + inner highlight) may sit at the card's top-right corner.

### Bubble Element

**Role:** decorative bubbles and icon grounds

Fully rounded spheres: a radial gradient from top-left white 80% into the main color at 100%, layered with an inset -8px -8px 16px dark inner shadow and an inset 8px 8px 16px white inner highlight — the texture of a glass marble. Sized 48px to 160px, they may float outside cards.

### Rainbow Border

**Role:** highlight borders and selected states

A 2px conic or linear rainbow gradient (sky → cyan → magenta → pink → sky) used as the border while the ground stays white. Implemented as a 1px-padded gradient layer covered by an inner white ground. Only one primary action may wear it.

### Pill Input

**Role:** search and form inputs

White 70% fill, 999px full radius, 1px #b8d8e8 stroke, padding 10px 20px, 13px type. On focus the stroke turns electric cyan with a 0 0 0 3px cyan 30% ring, plus a white top highlight layer.

## Do's and Don'ts

### Do

- Build chrome from multi-stop gradients; a single tone becomes grey
- Give translucent plastic a bright edge and top highlight
- Build bubbles from radial gradients with dual inner shadows
- Keep radii large: pills and spheres
- Reserve the rainbow gradient for one primary action
- Set product names in uppercase with wide tracking

### Don't

- Don't use matte solid panels
- Don't let chrome be a single flat color
- Don't scatter the rainbow gradient across multiple elements
- Don't use small radii
- Don't use quiet or minimal language
- Don't let bubbles cover body text

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Sky Gradient | `linear-gradient(#dff4ff, #ffffff)` | Page ground |
| 1 | Plastic | `rgba(255,255,255,0.55)` | Panels and card shells |
| 2 | Chrome | `linear-gradient(#f0f0f0, #b8b8b8, #e8e8e8)` | Metal strips and buttons |

## Elevation

- **Plastic shell:** `0 8px 24px rgba(0,80,140,0.18), inset 0 1px 0 rgba(255,255,255,0.90)`
- **Bubble:** `inset -8px -8px 16px rgba(255,105,180,0.45), inset 8px 8px 16px rgba(255,255,255,0.70)`
- **Chrome lip:** `inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.15)`

## Imagery

Chrome, translucent plastic, colorful bubbles, starbursts and light rays. Product shots may be set inside the translucent shell. No matte materials, no minimal photography, nothing quiet.

## Layout

Capped at 1120px with 24px container padding and 80px section gap. Wide overlaps and floating elements are allowed; bubbles may escape their containers. The common hero: a centered headline flanked by one large bubble on each side. Density is moderate but visually busy.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#3a3a4a`
- background: `#dff4ff`
- chrome: `#c0c0c0`
- pink: `#ff69b4`
- cyan: `#00ffff`
- magenta: `#ff00ff`

EXAMPLE COMPONENT PROMPTS:

1. Build a Y2K chrome button: border-radius 999px, background linear-gradient(to bottom, #f5f5f5, #c8c8c8, #9e9e9e, #e6e6e6), 1px #8a8a8a border, text #3a3a4a at 700, 0.1em tracking, padding 10px 28px, box-shadow 0 4px 10px rgba(0,80,140,0.2), inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.15). Page ground: linear-gradient(#dff4ff, #ffffff).
2. Build a glass bubble: a 96px sphere with background radial-gradient(circle at 30% 25%, rgba(255,255,255,0.9), rgba(255,105,180,0.85) 55%, rgba(255,105,180,1)), box-shadow inset -8px -8px 16px rgba(255,105,180,0.45), inset 8px 8px 16px rgba(255,255,255,0.70), plus a soft 0 12px 24px drop shadow.
