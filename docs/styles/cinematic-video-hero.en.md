# Cinematic Video Hero — Style Reference

> A poster frame lands first, then the frame starts moving — like the first shot of a trailer.

**Theme:** dark

The cinematic video hero builds atmosphere with a short clip: the poster frame renders first as the LCP, the muted video loads and autoloops only when it enters the viewport, and text rests on a readability scrim. Its technical discipline outruns its visuals — the video must never be an LCP dependency, must have a poster, must never preload=auto, must never carry key information inside the video (the video may not play or may be downgraded), must not autoplay with sound, must loop seamlessly and move slowly. prefers-reduced-motion and mobile fallbacks must both be handled, or weak-network devices see pure black.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Film Black | `#05060a` | `--color-film-black` | The video area and page ground. Near-black with blue, making the gold accent warmer. |
| Warm White | `#f3efe8` | `--color-warm-white` | Light sections and text. A warm ivory, like the projection screen. |
| Warm Gold | `#e4c063` | `--color-warm-gold` | The only accent: primary buttons, scene numbers and highlights. |
| Card Dark | `#141821` | `--color-card-dark` | Cards and info blocks. One step brighter than film black, sectioning without breaking the dark field. |
| Silver | `#9aa6b8` | `--color-silver` | Secondary text and metadata, the grey of subtitles. |

## Typography

### Inter — the only typeface. Hero titles 40 to 56px at 500, small labels 11px uppercase at 0.16em.

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 600
- **Sizes:** 11, 13, 16, 24, 40, 56
- **Line height:** 1.05 (display), 1.15 (headings), 1.55 (body)
- **Letter spacing:** -0.02em on display, 0.16em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 500 | 56px | 1.05 | -0.02em | `--text-display` |
| heading-lg | — | 500 | 40px | 1.1 | -0.02em | `--text-heading-lg` |
| heading | — | 600 | 24px | 1.2 | — | `--text-heading` |
| body-lg | — | 400 | 16px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 13px | 1.55 | — | `--text-body` |
| label | — | 500 | 11px | 1.4 | 0.16em | `--text-label` |

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
| cards | 12px |
| buttons | 999px |
| inputs | 999px |

- **Page max-width:** 1200px
- **Section gap:** 128px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Gold Button

**Role:** the primary action button

Warm-gold fill, film-black text, fully rounded 999px, no stroke, 16px/600, padding 14px 28px. On hover the fill brightens to #efce78; on press it scales 0.98. May carry a 12px play-triangle icon with 8px gap. Transition 300ms.

- **Sizes:** padding 14px 28px; label 16px
- **States:** hover: #efce78; active: scale 0.98

### Video Stage

**Role:** the video hero (signature component)

100vh tall, overflow hidden, film-black ground. Render the poster image first (AVIF, as the LCP); the video element is muted, loop, playsInline, preload="none", with IntersectionObserver calling load() and play() at 25% visibility. Over it, a gradient scrim from black 75% at the bottom to transparent. Under prefers-reduced-motion nothing plays — only the poster remains. Mobile may degrade to poster plus one still frame.

- **Sizes:** 100vh; poster as LCP

### Scene Card

**Role:** scene cards and film entries

16:9 ratio, 12px radius, overflow hidden; the ground is a poster still with a scrim from black 75% at the bottom to transparent. The lower-left holds an 11px uppercase 0.16em warm-gold scene number, below it an 18px/600 white title. The card carries no border.

### Ghost Button

**Role:** secondary actions

White 10% fill, 12px blur, fully rounded 999px, 1px white 25% stroke, white text 16px/500, padding 14px 28px. On hover the fill rises to 18%. For secondary actions like "learn more".

### Pill Field

**Role:** email and subscribe inputs

White 10% fill, 12px blur, fully rounded 999px, 1px white 25% stroke, padding 12px 20px, 16px text, placeholder white 50%. On focus the stroke turns warm gold 70% and the fill rises to 15%.

## Do's and Don'ts

### Do

- Render the poster first as the LCP
- Load video with preload=none, only in view
- Keep it muted, playsInline, seamlessly looped
- Rest all text on a scrim
- Hold key information in the DOM, not the video
- Keep only the poster under reduced motion

### Don't

- Don't let the video become the LCP dependency
- Don't omit the poster
- Don't preload=auto large videos
- Don't put key information inside the video
- Don't autoplay with sound
- Don't use fast cuts or broken seamless loops

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Film Black | `#05060a` | Video area and page ground |
| 1 | Card Dark | `#141821` | Cards |
| 2 | Warm White | `#f3efe8` | Light sections |

## Elevation

- **Gold CTA:** `0 8px 24px rgba(228,192,99,0.28)`
- **Card:** `0 20px 50px rgba(0,0,0,0.45)`

## Imagery

Video and stills must share one source and grade: dark fields, slow motion, seamless loops. Natural light and night scenes allowed. No fast cuts, jerky motion or color-jumping footage.

## Layout

Capped at 1200px; the hero runs 100vh full-bleed with text centered or in the lower-left third. Section gaps 128px. Outside the video area everything stays film black or card-dark — no large white sections, keeping the dark field continuous.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#f3efe8`
- background: `#05060a`
- card: `#141821`
- accent: `#e4c063`
- muted: `#9aa6b8`
- scrim: `rgba(0,0,0,0.75)`

EXAMPLE COMPONENT PROMPTS:

1. Build a cinematic video hero: a section 100vh tall, background #05060a, overflow hidden. Render the poster image (AVIF) first as the LCP; the video is muted, loop, playsInline, preload="none", with IntersectionObserver calling load() and play() at 25% visibility, and nothing plays under prefers-reduced-motion. Over it a linear-gradient(to top, rgba(0,0,0,0.75), transparent). The text area holds a 56px/500 title (-0.02em tracking), an 11px uppercase 0.16em #e4c063 scene label, and a fully rounded warm-gold button (#e4c063 fill, #05060a text, padding 14px 28px).
