# Soft UI — Style Reference

> Big radii, tinted soft-glow shadows, low-saturation colors — it makes people want to click at first sight.

**Theme:** light

Soft UI serves consumer products: social, lifestyle, tools for everyday users. Its method is to soften everything hard — radius starts at 16px, cards at 24px; shadows are not just dark but tinted with the primary hue (indigo at 25% opacity, blur 24px and up); colors are uniformly low-saturation, with pure black and pure saturated colors excluded. Interaction is expressed through floating: on hover elements rise, shadows expand and the primary deepens; on press they settle back and indent slightly. Motion may run as slow as 300 to 500ms, because softness is itself a perceived duration.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Indigo | `#6366f1` | `--color-indigo` | Primary actions, selection and links. Soft does not mean colorless — it needs one clear brand color. |
| Mist | `#f1f5f9` | `--color-mist` | Page canvas and input background. Softer than white, giving white cards something to rest on. |
| Cloud White | `#ffffff` | `--color-cloud` | Card and overlay fill. The brightest layer in a soft style, yet not glaring because shadows hold it up. |
| Blossom | `#ec4899` | `--color-blossom` | Emotional accent: favorites, likes, community feedback. Never a primary alongside indigo. |
| Mint | `#10b981` | `--color-mint` | Success and completion. For progress, checkmarks, saved states. |
| Amber | `#f59e0b` | `--color-amber` | Reminders and todos. The least used; its small area keeps the presence in check. |

## Typography

### Inter — the only typeface on the site. Weight 600 carries the friendly headings; 700 is for figures and emphasis only.

- **Substitute:** Nunito, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 28, 36
- **Line height:** 1.2 (display), 1.3 (headings), 1.65 (body)
- **Letter spacing:** -0.01em on display, 0.02em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 36px | 1.2 | -0.01em | `--text-display` |
| heading | — | 600 | 28px | 1.3 | — | `--text-heading` |
| subheading | — | 600 | 20px | 1.4 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.65 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.65 | — | `--text-body` |
| label | — | 500 | 12px | 1.4 | 0.02em | `--text-label` |

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

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 16px |
| inputs | 16px |
| icons | 999px |

- **Page max-width:** 1200px
- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Soft Button

**Role:** primary action button

Indigo fill, white text, 16px radius, no border. 16px type, weight 500, padding 12px 24px. The resting shadow is 0 10px 24px indigo 25%. On hover the button lifts 4px and the shadow expands to 0 18px 32px 35%; on press it settles back and switches to inset 0 4px 10px at 28% of the deep primary, while scaling to 0.96. Transition 300ms ease-in-out.

- **Sizes:** padding 12px 24px; label 16px
- **States:** hover: lift 4px, shadow up; active: inset shadow, scale 0.96

### Soft Card

**Role:** feature cards and content cards

White fill, 24px radius, no border, 32px padding, shadow 0 12px 32px slate grey 25%. The icon block is 56px square with a 16px radius on a 10% indigo ground; on hover the card lifts 8px, the shadow turns indigo 20%, and the icon block scales to 1.1 with a lighter ground. Transition 500ms.

- **States:** hover: lift 8px, shadow tinted indigo, icon 1.1

### Soft Input

**Role:** form inputs

Mist background, no border, 16px radius, padding 14px 20px. On focus the fill turns white, a 4px indigo 20% outer ring appears, and a 0 10px 26px indigo 14% soft glow is added. Transition 300ms, no size change.

- **States:** focus: white fill, 4px ring, soft glow

### Icon Chip

**Role:** feature icons and status marks

A circle (999px), 40px or 56px across, on a 10% primary ground, with the icon in the primary color itself. No borders and no shadows; the ground color does the differentiating. On hover the ground rises to 16%; the icon does not move.

## Do's and Don'ts

### Do

- Radius starts at 16px, cards at 24px
- Shadows carry the primary hue instead of pure black, with blur above 24px
- Colors are uniformly low-saturation; exclude pure black and pure saturated colors
- Hover lifts 4px to 8px; press settles back and indents
- Keep at least 24px between cards; prefer fewer modules
- Motion starts at 300ms; 500ms for card-level movement

### Don't

- Don't use square corners or radius below 16px
- Don't use pure black text #000000
- Don't use hard shadows without blur
- Don't split sections with 1px solid strokes
- Don't fill large areas with high-saturation pure colors
- Don't compress spacing for information density

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Mist | `#f1f5f9` | Page canvas |
| 1 | Cloud White | `#ffffff` | Cards and overlays |

## Elevation

- **Card rest:** `0 12px 32px rgba(148,163,184,0.25)`
- **Card hover:** `0 24px 48px rgba(99,102,241,0.20)`
- **Button rest:** `0 10px 24px rgba(99,102,241,0.25)`
- **Button hover:** `0 18px 32px rgba(99,102,241,0.35)`
- **Button pressed:** `inset 0 4px 10px rgba(67,56,202,0.28)`

## Imagery

Bright, low-saturation photography and 3D soft-glow graphics. People are fine, but gentle, everyday, without strong contrast. Gradient color blocks are allowed as background glow. No hard-edged illustration, pure black backgrounds or high-saturation photography.

## Layout

12 columns, capped at 1200px, container padding 24px. Section gap 96px, card gap 24px, element gap 24px. Whitespace is part of the style: prefer dropping a module over compressing spacing. Cards may stagger, but no more than three per row.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1f2937`
- background: `#f1f5f9`
- card: `#ffffff`
- primary: `#6366f1`
- muted: `#64748b`
- accent: `#ec4899`

EXAMPLE COMPONENT PROMPTS:

1. Build a soft-style feature card: white fill, 24px radius, no border, 32px padding, shadow 0 12px 32px rgba(148,163,184,0.25). Top left holds a 56px circular icon block (indigo 10% ground, icon #6366f1), followed by a 20px/600 title and 14px #64748b body. On hover the card lifts 8px, the shadow becomes rgba(99,102,241,0.2), and the icon scales to 1.1, transitioning over 500ms.
