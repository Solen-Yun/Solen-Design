# Launch Keynote — Style Reference

> A pure-black stage where the product lights itself, one claim per screen, and scrolling plays the story.

**Theme:** dark

The launch-keynote style imitates a technology product launch page: the stage is pure black (#000000) with no borders and no texture, the product image glows on its own, and the whitespace itself is the tension. The whole page carries exactly one accent — electric blue #2997ff — with everything else in black, white and grey. Its signature is the scroll-scrubbed frame sequence: a sticky canvas plays a pre-rendered product animation against scroll progress, one product and one claim per screen. The technical constraints are stricter than the visual ones — frames must lazy-load through IntersectionObserver rather than all preloading on load, the scroll handler must never read offsetTop or getBoundingClientRect (that causes layout thrash), critical information must never be baked into the frame images, prefers-reduced-motion must be respected, and devicePixelRatio must be capped.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Stage Black | `#000000` | `--color-stage-black` | The page ground. Pure black with no texture, so the product's edges vanish into an infinitely deep stage. |
| Near White | `#f5f5f7` | `--color-near-white` | Primary text and high-contrast elements. Softer than pure white, easier on the eyes over time. |
| Mid Grey | `#86868b` | `--color-mid-grey` | Secondary text, explanations and specs. Always the third level. |
| Electric Blue | `#2997ff` | `--color-electric-blue` | The only accent: links, the primary CTA and key numbers. No second color anywhere. |
| Card Graphite | `#1d1d1f` | `--color-card-graphite` | Cards and information blocks, a step above the stage, dividing content without breaking the black. |

## Typography

### SF Pro Display — the only typeface on the site. Display 56 to 80px at -0.035em tracking, small labels 12px uppercase at 0.2em tracking — those two extremes, set against each other, are the voice of the style.

- **Substitute:** -apple-system, 'Helvetica Neue', system-ui, sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 17, 21, 28, 40, 56, 80
- **Line height:** 1.02 (display), 1.1 (headings), 1.5 (body)
- **Letter spacing:** -0.035em on display, 0.2em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | SF Pro Display | 700 | 80px | 1.02 | -0.035em | `--text-display` |
| heading-lg | SF Pro Display | 700 | 56px | 1.05 | -0.03em | `--text-heading-lg` |
| heading | SF Pro Display | 600 | 40px | 1.1 | -0.025em | `--text-heading` |
| subheading | SF Pro Display | 500 | 28px | 1.2 | -0.02em | `--text-subheading` |
| body-lg | SF Pro Display | 400 | 21px | 1.45 | — | `--text-body-lg` |
| body | SF Pro Display | 400 | 17px | 1.5 | — | `--text-body` |
| label | SF Pro Display | 500 | 12px | 1.4 | 0.2em | `--text-label` |

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
| 160 | 160px | `--spacing-160` |
| 240 | 240px | `--spacing-240` |

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 999px |
| inputs | 12px |
| media | 0 |

- **Page max-width:** 1120px
- **Section gap:** 240px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Buy Button

**Role:** the primary action button

Electric blue fill, white label, fully rounded at 999px, no stroke, 17px/500 with tight tracking, 12px 24px padding. On hover the fill becomes #0071e3; on press it scales to 0.98. Transition 300ms. Only one such button exists on the page.

- **Sizes:** padding 12px 24px; label 17px
- **States:** hover: #0071e3; active: scale 0.98

### Spec Card

**Role:** the spec and feature card

Graphite fill, 24px radius, no stroke, 32px padding. At the top a 12px uppercase 0.2em electric blue label, in the middle a 28px/600 white title, below it a 17px mid-grey explanation. The card carries no border and no shadow of its own — borders on a pure black stage would destroy the sense of infinite depth.

### Scrub Stage

**Role:** the scroll-scrubbed frame sequence (the signature component)

The outer block is 3 to 4 times the viewport height; the inner one is sticky at top-0, 100vh tall, holding a canvas. Frames are stored as WebP and loaded through IntersectionObserver only as the block approaches the viewport — never all 96 frames preloaded on first render — with the canvas sized at a devicePixelRatio capped at 2. Scroll progress is read once inside requestAnimationFrame from window.scrollY and cached; the handler never reads getBoundingClientRect or offsetTop. With prefers-reduced-motion only key frames are drawn. All critical text lives in DOM elements outside the canvas.

- **Sizes:** outer 3–4 × 100vh; sticky 100vh

### Glass Nav

**Role:** the top navigation

Fixed at the top, 48px tall, a black 70% ground with 24px blur and a 1px white 10% border along the bottom. The wordmark on the left is 17px/600 near white; the links on the right are 14px near white at 80%, with the buy link in electric blue. Hover turns the links pure white.

### Dark Field

**Role:** the email and form input

Graphite fill, 1px white 10% border, 12px radius, 12px 20px padding, 17px type. The placeholder is mid grey. On focus the border turns electric blue — no outer ring, no glow.

## Do's and Don'ts

### Do

- Keep the stage pure black, with no borders and no texture
- Use exactly one accent, electric blue
- Lazy-load frames with IntersectionObserver
- Read scroll progress once inside rAF and cache it
- Keep critical text in the DOM, not in frame images
- Respect reduced-motion and cap DPR

### Don't

- Don't use multicolored gradients or a second accent
- Don't read layout properties inside the scroll handler
- Don't preload every frame on first paint
- Don't bake critical information into frame images
- Don't pile on borders and radius decoration
- Don't ignore reduced-motion or the DPR cap

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Stage Black | `#000000` | The page stage |
| 1 | Card Graphite | `#1d1d1f` | Cards and information blocks |
| 2 | Glass Nav | `rgba(0,0,0,0.70)` | The top navigation (with blur) |

## Elevation

- **None:** `none — the stage has no depth cues`
- **Card:** `0 24px 60px rgba(0,0,0,0.60)`

## Imagery

Product renders are the only imagery, and they must bring their own light with edges that dissolve into the black. Product close-ups, cutaway views of internals and frame-sequence animation are allowed. No people photography, no multicolored gradients, no background texture.

## Layout

Capped at 1120px, one product and one claim per screen. Section gaps of 240px, almost everything centered. Text blocks stay under 20 Chinese characters or 40 characters wide, because only short sentences deserve that much whitespace. The frame-sequence block occupies 3 to 4 screens of scroll.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#f5f5f7`
- background: `#000000`
- card: `#1d1d1f`
- accent: `#2997ff`
- muted: `#86868b`
- border: `rgba(255,255,255,0.10)`

EXAMPLE COMPONENT PROMPTS:

1. Build a launch-keynote product block: a pure black #000000 stage, a centered 56px/700 heading (tracking -0.03em, color #f5f5f7), a 17px #86868b explanation below, and one fully rounded electric blue button (#2997ff fill, white label, padding 12px 24px). Leave 240px of space above and below the block. If a scroll animation is needed, play a frame sequence on a sticky 100vh canvas: frames stored as WebP, lazy-loaded with IntersectionObserver, DPR capped at 2, and scroll progress read once per requestAnimationFrame from window.scrollY.
