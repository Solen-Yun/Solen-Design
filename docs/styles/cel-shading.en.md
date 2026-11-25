# Cel Shading — Style Reference

> Bold ink lines, flat fills, hard shadows: every frame of hand-drawn animation has only two tones.

**Theme:** light

Cel shading comes from traditional animation's cel-paint process: every color block is flat, shadow is single-layered and hard, and edges are outlined with 3px ink lines. On interfaces it carries a distinctive timing rule — transitions run 75ms, because animation is frame-sampled, not fluidly eased; easing must be linear or ease-in, never ease-in-out. On press, elements squash (horizontal 110%, vertical 90%) and sink — cartoon physics, not material physics.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Ink | `#1a1a2e` | `--color-ink` | Every 3px stroke, hard shadow and text. The ink line is the style's skeleton. |
| Cel White | `#fafaf5` | `--color-cel-white` | The flat ground. Slightly warm, like an animation cel sheet. |
| Red | `#e63946` | `--color-red` | Primary actions and high-energy states. Flat, never gradient. |
| Aqua | `#4ea8de` | `--color-aqua` | Information and secondary actions, the cool block of the frame. |
| Grass | `#2ecc71` | `--color-grass` | Success and health, the positive in cartoon semantics. |
| Sunset | `#f1c40f` | `--color-sunset` | Highlights and energy, for emphasis bars and badges. |

## Typography

### Inter — the only typeface, only 700 and 900. Uppercase, line height 1.0, making text read like a title card.

- **Substitute:** 'Arial Black', Helvetica, sans-serif
- **Weights:** 700, 900
- **Sizes:** 14, 16, 20, 28, 40, 56
- **Line height:** 1 (display), 1.1 (headings), 1.5 (body)
- **Letter spacing:** -0.02em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 56px | 1 | -0.02em | `--text-display` |
| heading | — | 900 | 40px | 1.05 | — | `--text-heading` |
| subheading | — | 700 | 28px | 1.1 | — | `--text-subheading` |
| body-lg | — | 700 | 16px | 1.5 | — | `--text-body-lg` |
| body | — | 700 | 14px | 1.5 | — | `--text-body` |
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
| badges | 999px |

- **Page max-width:** 1120px
- **Section gap:** 80px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Cel Button

**Role:** the primary action button

Flat red fill, white text, 3px ink stroke, zero radius, 4px hard shadow, 14px/900 uppercase, padding 12px 24px. On hover the fill brightens to #ff4d5a, the button lifts 4px, the shadow widens to 6px, and a skewed white 30% sheen sweeps left to right (300ms linear). On press it scales horizontally 1.1, vertically 0.9, translates 4px 8px with the shadow collapsing — a squash, not a displacement. Transition 75ms linear.

- **Sizes:** padding 12px 24px; label 14px
- **States:** hover: lift 4px, shadow 6px; active: scaleX 1.1, scaleY 0.9, shadow none

### Cel Card

**Role:** content and storyboard cards

Flat paper-white, 3px ink stroke, zero radius, 24px padding, 4px hard shadow. Title 28px/900 uppercase, body 14px/700 at 60% ink. On hover it lifts and shifts left 2px each while the shadow widens to 6px. Transition 75ms linear.

### Ink Divider

**Role:** dividers and stroke lines

A 3px pure-ink line, spanning content width or full width. Lines do the dividing here rather than whitespace — the style leans on strokes for structure. Short 8px dashes are allowed as emphasis marks.

### Impact Badge

**Role:** status and energy badges

Sunset-yellow or grass-green flat fill, 3px ink line, fully rounded 999px, 14px/900 uppercase, padding 4px 12px, optionally with a 3px hard shadow. For one-shot marks like "new", "done" or "critical".

### Speed Lines

**Role:** speed lines and motion accents

Three to five 3px ink lines, 24px to 64px long, angled 15 degrees along one side of an element, 8px apart. They hint at motion direction and appear only on interactive elements — static sections stay clean.

## Do's and Don'ts

### Do

- Wrap every element in 3px ink lines
- Fill flat — never gradient
- Keep one shadow layer, zero blur
- Transition 75ms with linear or ease-in
- Squash on press (110%/90%)
- Keep zero radius except badges

### Don't

- Don't use gradient fills
- Don't use hairline borders
- Don't use low saturation or greys
- Don't use silky transitions above 300ms
- Don't use ease-in-out
- Don't use blurred shadows

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Cel White | `#fafaf5` | Page ground |
| 1 | Red Block | `#e63946` | Accent sections |
| 2 | Aqua Block | `#4ea8de` | Info sections |

## Elevation

- **Hard shadow:** `4px 4px 0 #1a1a2e`
- **Hard shadow hover:** `6px 6px 0 #1a1a2e`
- **Pressed:** `none`

## Imagery

Flat illustration and cel painting: two tones per shape, hard-edged shadows, 3px outlines. Character and prop illustration allowed. No photography, gradients or soft shadows.

## Layout

Capped at 1120px with 24px container padding and 80px section gaps. Elements may overlap and misalign slightly, like storyboard panels. All sections divide with 3px ink lines; whitespace runs slightly tighter than other hard-edged styles because the lines carry the separation.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1a1a2e`
- background: `#fafaf5`
- red: `#e63946`
- aqua: `#4ea8de`
- grass: `#2ecc71`
- sunset: `#f1c40f`

EXAMPLE COMPONENT PROMPTS:

1. Build a cel-shading button: background #e63946, white text, 3px solid #1a1a2e border, border-radius 0, 900 weight 14px uppercase, padding 12px 24px, box-shadow 4px 4px 0 #1a1a2e. On hover the background turns #ff4d5a with translateY(-4px) and the shadow widening to 6px 6px 0 #1a1a2e. On active scaleX(1.1) scaleY(0.9) translate(4px,8px) with no shadow. Transition 75ms linear. Page ground #fafaf5.
