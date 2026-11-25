# Liquid Glass — Style Reference

> Glass lets the background show through, bends it slightly at the edges, and springs gently back to touch.

**Theme:** mixed

Liquid glass is built from a clear backdrop, thin translucent neutral surfaces, fine directional edge highlights and restrained refraction. Reserve it for floating navigation, search, playback controls and transient menus; body text and information cards stay stable and readable. Supporting environments must default to an SVG displacement filter so the background visibly bends at the glass edge; plain translucent white plus blur is only a fallback, not full liquid glass. Curved edges use refraction curves with a flat center, allowing the faintest chromatic dispersion. Both dark and light scenes must protect text contrast; on press the glass compresses briefly, stretches slightly while dragged, and settles back over about 420ms.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Paper | `#F3F2ED` | `--color-paper` | The calm, low-contrast page ground that keeps floating glass and text clear. |
| Graphite Ink | `#202929` | `--color-ink` | Primary text in titles, body copy and controls on light backgrounds. |
| Deep Sea Scene | `#25414A` | `--color-glass-scene` | The photo, tone or line background glass needs to transmit and refract; dark overlays use white text here. |
| Salt Mist | `#E4EFEB` | `--color-glass-mist` | A light teal-tinted surface color, for the soft tinted layer of the material, never for outer glow. |
| Glancing Light | `#FFFFFF` | `--color-glass-glint` | A one-pixel highlight along the glass's upper edge or lit side, revealing the curve's direction. |
| Sage Focus | `#557B79` | `--color-focus` | Focus rings and small state hints on light-background controls, keeping contrast sufficient. |

## Typography

### System UI — platform system fonts keep it natural; hierarchy comes from size, whitespace and medium weights, never outlines or glow.

- **Substitute:** -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 16, 20, 28, 40, 56
- **Line height:** 1.05 (display), 1.18 (headings), 1.55 (body)
- **Letter spacing:** -0.045em on display, 0.025em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 500 | 56px | 1.05 | -0.045em | `--text-display` |
| heading-lg | — | 500 | 40px | 1.12 | -0.035em | `--text-heading-lg` |
| heading | — | 600 | 28px | 1.2 | — | `--text-heading` |
| subheading | — | 500 | 20px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.5 | — | `--text-body` |
| label | — | 500 | 12px | 1.35 | 0.025em | `--text-label` |

## Spacing & Layout

**Base unit:** 8px
**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 4 | 4px | `--spacing-4` |
| 8 | 8px | `--spacing-8` |
| 12 | 12px | `--spacing-12` |
| 16 | 16px | `--spacing-16` |
| 24 | 24px | `--spacing-24` |
| 32 | 32px | `--spacing-32` |
| 48 | 48px | `--spacing-48` |
| 64 | 64px | `--spacing-64` |
| 88 | 88px | `--spacing-88` |

### Border Radius

| Element | Value |
|---|---|
| buttons and navigation | 999px |
| search and segmented controls | 999px |
| cards | 24px |
| menus and sheets | 28px |

- **Page max-width:** 1120px
- **Section gap:** 88px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Floating Glass Bar

**Role:** primary navigation and scene switching

A capsule dock 56–64px tall with hit areas of at least 44px. It floats over tinted photos or content: the clear state uses a low-concentration surface tint, a real background-displacement refraction enabled by default, and a one-pixel directional highlight. The center stays flat, refraction concentrates in an 8–24px curved edge band; restrained dispersion is allowed. Dark scenes take white icons and text; bright scenes add neutral tinting so labels never vanish. The selected segment slides horizontally with dragging, compresses to 0.96 on press, widens slightly while dragged, and settles over about 420ms after release. Keyboard focus uses a clear two-pixel ring.

- **Sizes:** 56–64px overall height; at least 44px per hit area; capsule radius
- **States:** Idle; 110ms press compression; drag with slight horizontal stretch; 420ms spring settle; keyboard focus; disabled

### Clear Glass Button

**Role:** light actions over photos or media

Capsule-shaped, at least 44px tall, with a low-concentration surface, real edge refraction and a hairline upper-edge highlight; soft blur only when refraction is unsupported. Prefer white labels on dark scenes; on bright backgrounds switch to dark labels with a neutrally tinted surface. Press compresses to 0.96 over about 110ms and releases with a roughly 420ms spring; respects reduced-motion preferences. Avoid the clear variant over backgrounds with no visible content.

- **Sizes:** 44px minimum hit target; capsule radius; 12–16px horizontal inset
- **States:** Rest; hover edge glint; compress on press; visible focus; disabled at readable opacity

### Tinted Glass Menu

**Role:** short menus and transient options

22–28px radius, carried by a more opaque warm-white or sage-grey layer for short labels, options and icons. Background blur stays moderate, outer shadows soft, a single thin highlight at the top. Menu text is always ink; long explanations and complex settings live in stable solid content panels instead.

- **Sizes:** 22–28px radius; 8–16px item spacing; menu rows at least 44px high
- **States:** Resting; focused or selected row; open; dismiss; keyboard navigation

### Glass Search Field

**Role:** search over photos and tinted scenes

A rounded capsule, at least 44px tall, lightly tinted with soft blur; input and result text uses deep ink, never hollow or low-contrast placeholders. The edge highlight stays static; focus is expressed with an independent high-contrast sage outer ring — glow never substitutes for focus feedback.

- **Sizes:** 44–52px height; capsule radius; 12–16px horizontal inset
- **States:** Empty; editing; focus-visible; clear action; results; no results; disabled

### Solid Reading Card

**Role:** body copy, tables and long content

A stable warm-white solid panel, 22–24px radius and 24px padding. At most one low-contrast neutral divider and a soft outer shadow — no glass refraction, so scrolling backgrounds never disturb reading.

- **Sizes:** 22–24px radius; 24px padding; generous text measure
- **States:** Stable reading surface; optional subtle hover when interactive

## Do's and Don'ts

### Do

- Place clear glass only over navigation and controls that have real content to transmit
- Choose white or ink labels per background brightness so text stays clear
- Express the glass curve with a one-pixel directional highlight and slight displacement
- Tint short content like menus slightly to raise contrast
- Keep body copy, tables and dense information on stable solid surfaces
- Compress on press for about 110ms, stretch slightly on drag, spring back over about 420ms
- Respect reduced-motion and reduced-transparency preferences
- Keep a readable frosted surface and fine highlight in browsers without live refraction

### Don't

- Don't fake refraction with rainbow edges, neon-outlined titles or colored glow
- Don't flood cards, body text or whole pages with clear glass
- Don't lay clear glass over flat backgrounds with no detail
- Don't let highlights or refraction erode text, icon or focus contrast
- Don't randomly morph border radii continuously; liquid feedback comes from interaction
- Don't assume filter support is uniform across browsers

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Paper canvas | `#F3F2ED` | Stable reading and content surface |
| 1 | Clear glass | `rgba(255, 255, 255, 0.12)` | Floating controls on a rich, darker scene |
| 2 | Tinted glass | `rgba(239, 245, 242, 0.86)` | Menus and short labels over a bright or detailed scene |
| 3 | Solid content | `#FCFCFA` | Long-form copy, data, and controls requiring steady contrast |

## Elevation

- **Floating control:** `0 8px 24px rgba(19, 37, 41, 0.12), inset 0 1px 0 rgba(255,255,255,0.72)`
- **Transient panel:** `0 16px 40px rgba(19, 37, 41, 0.18), inset 0 1px 0 rgba(255,255,255,0.78)`

## Imagery

Give clear glass visible background detail: photos, low-contrast terrain lines, tonal shifts or geometric grids all work. Place texture beneath floating controls so straight lines bend slightly at the glass edge while the center stays calm. No rainbow gradients, neon text, or blur-only blank monochrome grounds posing as refraction.

## Layout

Organize the page on warm light paper, using a bright detailed photo, contour lines or a grid as the preview canvas to validate both dark and light scenes. Content layers as "stable body → glass action layer"; navigation and short menus float sparingly while the information body keeps a clear solid ground. Desktop centers the scene and dock; narrow screens keep the same dock as a tappable capsule with room for system safe areas.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#202929`
- background: `#F3F2ED`
- scene: `#25414A`
- glassTint: `rgba(255, 255, 255, 0.12)`
- glint: `rgba(255, 255, 255, 0.72)`
- focus: `#557B79`

EXAMPLE COMPONENT PROMPTS:

1. Design a clear liquid-glass navigation set: float a rounded capsule dock over a photo with fine lines and tonal shifts. Use a low-concentration neutral surface, a one-pixel directional highlight and an SVG background-displacement refraction enabled by default. Generate a narrow curved edge band from surface normals and the refraction curve, keeping the center flat; allow the faintest dispersion but never draw rainbow borders. Options are at least 44px tall; label colors follow background brightness to stay clear. Press compresses lightly, drag stretches horizontally, release springs back over about 420ms; add keyboard focus feedback and respect reduced motion. Keep body copy and information cards on warm-white solid surfaces; menus use a more opaque light sage tinted material. Live background refraction runs only in Chromium; other browsers keep the same surfaces with frosted feedback. No rainbow edges, neon text or continuous automatic morphing.
