# Brutalist Web — Style Reference

> Back to 1993 HTML: system fonts, blue underlined links, pure white ground, zero ornament.

**Theme:** light

Brutalist web is not "ugly" — it refuses to be designed: pure white ground (#ffffff), the system font stack (sans body with Times New Roman titles), blue #0000ff underlined links as the only interaction language, 1px solid borders for structure, zero radius, zero shadow, zero gradients or background images, spacing compressed to minimum. Its value judgment is content over form — anything added to look good is treated as a burden. This is also what separates it from neo-brutalism: neo-brutalism builds a style from bold borders and hard shadows; brutalist web doesn't even want a style.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Black | `#000000` | `--color-black` | Body and titles. Pure black, no greying. |
| White | `#ffffff` | `--color-white` | Every section's ground. Pure white — never ivory or grey-white. |
| Link Blue | `#0000ff` | `--color-link-blue` | The only primary interaction color. Unvisited links take it, visited turn #551a8b. |
| Red | `#ff0000` | `--color-red` | Warnings and errors, browser-default semantics. |
| Green | `#008000` | `--color-green` | Success and "OK", also from browser defaults. |
| Magenta | `#d60099` | `--color-magenta` | A visited-link variant and special marks, extremely rare. |

## Typography

### Times New Roman — titles in the browser's default serif. No tracking, no weight treatment — 1993 had none of those.

- **Substitute:** 'Songti SC', Georgia, serif
- **Weights:** 400, 700
- **Sizes:** 16, 20, 24, 32, 40
- **Line height:** 1.2 (display), 1.3 (headings), 1.5 (body)
- **Letter spacing:** 0 on display, 0 on uppercase labels

### system-ui — body text in the system sans stack or monospace. Default, unstyled, varying with the OS.

- **Substitute:** 'Segoe UI', Arial, Helvetica, sans-serif
- **Weights:** 400, 700
- **Sizes:** 14, 16, 18
- **Line height:** 1.4 (display), 1.4 (headings), 1.5 (body)
- **Letter spacing:** 0 on display, 0 on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Times New Roman | 700 | 40px | 1.15 | — | `--text-display` |
| heading | Times New Roman | 700 | 32px | 1.2 | — | `--text-heading` |
| subheading | Times New Roman | 700 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | system-ui | 400 | 18px | 1.5 | — | `--text-body-lg` |
| body | system-ui | 400 | 16px | 1.5 | — | `--text-body` |
| label | system-ui | 400 | 14px | 1.4 | — | `--text-label` |

## Spacing & Layout

**Base unit:** 4px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |

### Border Radius

| Element | Value |
|---|---|
| cards | 0 |
| buttons | 0 |
| inputs | 0 |

- **Page max-width:** 720px
- **Section gap:** 24px
- **Card padding:** 12px
- **Element gap:** 8px

## Components

### Bare Link

**Role:** links (the only interaction language)

Inline text, #0000ff, underlined (text-decoration: underline), no background, no border, no transition. Hover keeps the same style (default browser behavior) — no extra underline, no opacity change, no shift. Visited turns #551a8b.

### Bare Button

**Role:** submit buttons

The browser's default button appearance (or a 1px solid black border on white), zero radius, 14px system font, padding 4px 12px. No hover animation, no shadow. Its plainness is deliberate.

- **States:** hover: no change; active: default pressed state only

### Rule Block

**Role:** the 1px-bordered section

Section boundaries drawn with 1px solid black (or 50% grey), 12px padding. The page may nest border layers, like early HTML table layouts. Never separate with shadows or background color.

### Default List

**Role:** lists and tables

Browser-default ul/ol indents and bullets; tables with 1px solid borders (border-collapse: collapse), cell padding 4px 8px, no zebra stripes, no radius.

### Dense Text Column

**Role:** the body column

Max-width 720px, line height 1.5 (not enlarged), 12px paragraph spacing, no first-line indent. Left-aligned, no drop caps or any typographic ornament. Density close to a plain text file.

## Do's and Don'ts

### Do

- Ground in pure white, never ivory or grey
- Use the system font stack, unstyled
- Make blue underlined links the primary interaction
- Divide with 1px solid borders
- Keep zero radius, zero shadow, zero gradient
- Compress spacing to minimum

### Don't

- Don't use any rounding
- Don't use drop shadows or text shadows
- Don't use gradients or background images
- Don't animate link transitions
- Don't use decorative faces
- Don't add elements to look good

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | White | `#ffffff` | All sections |
| 1 | Nothing | `none` | There is no second layer |

## Elevation

- **None:** `none — shadows are forbidden`

## Imagery

Almost no images. Unoptimized native images are allowed (no radius, no overlay, no filter); alt text must be complete. No decorative illustration, full-bleed backgrounds or art-processed images.

## Layout

Capped at 720px with 16px container padding and 24px section gaps. Single column, tight set, no grid system. Elements separate with 1px borders rather than whitespace. The whole page should read like a well-set plain text file.

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
- link: `#0000ff`
- red: `#ff0000`
- green: `#008000`
- visited: `#551a8b`

EXAMPLE COMPONENT PROMPTS:

1. Build a brutalist-web document page: pure white ground #ffffff, body 16px in the system sans stack, line height 1.5, max-width 720px, left-aligned, 12px paragraph spacing. Titles in Times New Roman 700 at 32px and 24px. Links #0000ff underlined, no transitions, no hover changes. Sections divide with 1px solid #000 borders and 12px padding. Radius 0, no shadows, no gradients.
