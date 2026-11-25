# Shader Gradient — Style Reference

> A genuinely computed iridescent field, with glass panels floating above it.

**Theme:** dark

The shader-gradient style is what a premium SaaS hero has looked like for a while: a live WebGL fragment shader rendering a flowing grid gradient on a near-black canvas, the colors breathing slowly, frosted glass panels floating above it, and exactly one violet used for UI accent. The difficulty is not visual but a matter of discipline — never pass off a static gradient image or CSS keyframes as a live shader (that is where the cheapness comes from), cap devicePixelRatio, pause requestAnimationFrame through IntersectionObserver when the field scrolls off-screen, provide a fallback for when WebGL is unavailable, and never set type directly on the gradient field.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas Black | `#08090d` | `--color-canvas-black` | The canvas ground. Near black but not pure, so the iridescence has somewhere dark to sink into. |
| Bright White | `#edeef2` | `--color-bright-white` | Primary text and high-contrast elements. A slightly cool white. |
| Violet | `#7c5cff` | `--color-violet` | The only UI accent: primary button, focus states and icons. The iridescence inside the shader does not count as a UI color. |
| Cyan | `#22d3ee` | `--color-cyan` | Appears only inside the shader field, giving the gradient a warm-to-cool transition. |
| Pink | `#f472b6` | `--color-pink` | Also shader-only, the third arm of the iridescence. |

## Typography

### Inter — the only typeface on the site. Headings 48 to 64px with tight tracking, small labels 12px uppercase.

- **Substitute:** -apple-system, 'SF Pro Display', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 12, 14, 16, 20, 32, 48, 64
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** -0.03em on display, 0.14em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | Inter | 600 | 64px | 1.05 | -0.03em | `--text-display` |
| heading-lg | Inter | 600 | 48px | 1.1 | -0.025em | `--text-heading-lg` |
| heading | Inter | 600 | 32px | 1.2 | — | `--text-heading` |
| body-lg | Inter | 400 | 20px | 1.5 | — | `--text-body-lg` |
| body | Inter | 400 | 16px | 1.6 | — | `--text-body` |
| label | Inter | 500 | 12px | 1.4 | 0.14em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 16px |
| buttons | 12px |
| inputs | 12px |
| icons | 8px |

- **Page max-width:** 1120px
- **Section gap:** 128px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Violet CTA

**Role:** the primary action button

Violet fill, white label, 12px radius, no stroke, 16px/500, 12px 24px padding, shadow 0 8px 30px violet 35%. On hover the fill lightens to #8f72ff; on press it scales 0.98. Transition 300ms. Only one exists on the page.

- **Sizes:** padding 12px 24px; label 16px
- **States:** hover: #8f72ff; active: scale 0.98

### Glass Card

**Role:** the content and feature card

White 6% fill, 24px blur, 16px radius, 1px white 10% border, 24px padding, shadow 0 20px 60px black 45%. At the top-left a 36px violet 20% icon block (8px radius, 1px violet 30% border). The title is 20px/600 white, the body 14px white 60%.

### Shader Field

**Role:** the live shader canvas (signature component)

A full-bleed canvas pinned at the bottom layer, running a fragment shader that renders a grid gradient in three colors (violet, cyan, pink), breathing slowly with time over a 20 to 30 second cycle. devicePixelRatio must be capped (usually at 2), requestAnimationFrame must be paused through IntersectionObserver when the field is off-screen, and a static gradient image in the same palette serves as the fallback when WebGL is unavailable. Under prefers-reduced-motion only a single frame is rendered. The page may hold exactly one canvas.

- **Sizes:** full-bleed; DPR capped at 2

### Glass Input

**Role:** the email and form input

White 6% fill, 12px blur, 12px radius, 1px white 12% border, 12px 16px padding, 16px type. The placeholder is white 40%. On focus the border turns violet 70%, the fill rises to 9%, and a 2px violet 25% outer ring is added.

### Scrim Layer

**Role:** the readability scrim

Between the shader and the type there must be a scrim: a vertical gradient from 60% black to transparent, or a glass panel with 24px blur. Its only purpose is to keep text on the field at 4.5:1 contrast or better. Omitting it is forbidden.

## Do's and Don'ts

### Do

- Use a real WebGL fragment shader
- Cap devicePixelRatio
- Pause rAF through IntersectionObserver when off-screen
- Provide a static fallback for when WebGL is unavailable
- Always put a glass panel or scrim under the text
- Keep the UI accent to a single violet

### Don't

- Don't pass off a static gradient image as a live shader
- Don't leave DPR uncapped (frames drop)
- Don't keep running rAF while off-screen
- Don't ignore reduced-motion or the WebGL fallback
- Don't set type directly on the field
- Don't add a second canvas or a second loud accent

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Canvas Black | `#08090d` | The shader canvas |
| 1 | Glass 6% | `rgba(255,255,255,0.06)` | Cards and panels |
| 2 | Glass 12% | `rgba(255,255,255,0.12)` | Hover and secondary buttons |

## Elevation

- **Glass card:** `0 20px 60px rgba(0,0,0,0.45)`
- **Violet CTA:** `0 8px 30px rgba(124,92,255,0.35)`

## Imagery

The imagery is the shader itself — no photography and no illustration. Product screenshots may sit inside glass panels. No additional background images; they fight the field.

## Layout

Capped at 1120px with 24px container padding and 128px section gaps. The opening is 100vh, with the content vertically centered and wrapped in a glass panel. The page holds exactly one canvas; everything else is a DOM layer.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#edeef2`
- background: `#08090d`
- accent: `#7c5cff`
- cyan: `#22d3ee`
- pink: `#f472b6`
- glass: `rgba(255,255,255,0.06)`

EXAMPLE COMPONENT PROMPTS:

1. Build a shader-gradient hero: a full-bleed canvas at the bottom layer runs a WebGL fragment shader rendering a flowing grid gradient in #7c5cff, #22d3ee and #f472b6, breathing slowly over a 25 second cycle; devicePixelRatio is capped at 2; IntersectionObserver pauses requestAnimationFrame when the field scrolls off-screen; when WebGL is unavailable it falls back to a static gradient in the same palette. Above it sits a glass panel (rgba(255,255,255,0.06) fill, 24px blur, 16px radius, 1px rgba(255,255,255,0.1) border, 24px padding) holding a 64px/600 heading (tracking -0.03em) and one violet CTA (#7c5cff fill, 12px radius, 16px/500).
