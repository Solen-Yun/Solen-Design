# Modern Gradient — Style Reference

> A violet-pink beam of light over a deep indigo night sky, sliced into layers by glass cards.

**Theme:** dark

Modern Gradient belongs to the startup-launch-page lineage: a deep indigo ground (#1e1b4b) holds the whole frame, a violet-to-fuchsia gradient acts as the only light source, and glass cards slice that light into layers. The key rule is that gradients must have a direction — the button uses a 200%-wide three-stop gradient, and on hover the background slides to the other end so the colors flow instead of simply swapping. Cards use 10% white fill with a 20% white border; on hover the opacity rises and a violet glow is injected. Motion runs slow (500ms ease-out), paired with a slight lift and 1.02 scale, so the light is perceived as moving.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Violet | `#8b5cf6` | `--color-violet` | Gradient start and primary accent. Every glow departs from it. |
| Deep Indigo | `#1e1b4b` | `--color-deep-indigo` | Page ground. Warmer than pure black, so violet light reads as glowing rather than greying. |
| Fuchsia | `#ec4899` | `--color-fuchsia` | Gradient end and hover state. Appears only alongside violet, together forming that beam. |
| Cyan | `#06b6d4` | `--color-cyan` | Data, second chart series and contrast highlights. Forms a warm-cool counterpoint to violet. |
| Amber | `#f59e0b` | `--color-amber` | Rare notices and badges. No more than one per screen, to break the cool palette. |
| Glass White | `rgba(255,255,255,0.10)` | `--color-glass` | Card fill. Must be paired with a border and blur, or it vanishes on the dark ground. |

## Typography

### Inter — the only typeface on the site. 700 headings with tight tracking hold down the glowing background; 400 body keeps the dark ground readable.

- **Substitute:** system-ui, -apple-system, 'Segoe UI', sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 16, 20, 28, 40, 64
- **Line height:** 1.05 (display), 1.15 (headings), 1.6 (body)
- **Letter spacing:** -0.03em on display, 0.06em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 700 | 64px | 1.05 | -0.03em | `--text-display` |
| heading-lg | — | 700 | 40px | 1.1 | -0.02em | `--text-heading-lg` |
| heading | — | 600 | 28px | 1.2 | — | `--text-heading` |
| subheading | — | 600 | 20px | 1.35 | — | `--text-subheading` |
| body-lg | — | 400 | 16px | 1.6 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.6 | — | `--text-body` |
| label | — | 600 | 12px | 1.4 | 0.06em | `--text-label` |

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
| 128 | 128px | `--spacing-128` |

### Border Radius

| Element | Value |
|---|---|
| cards | 24px |
| buttons | 16px |
| inputs | 16px |
| icons | 16px |

- **Page max-width:** 1200px
- **Section gap:** 112px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Gradient Button

**Role:** primary action button

A violet→fuchsia→violet three-stop linear gradient at 200% width, white text, 16px radius, no border, 16px type, weight 700, 0.02em tracking, padding 16px 32px. Resting shadow 0 8px 20px violet 30%. On hover the background position slides to the right end (the gradient flows in reverse), the shadow expands to 0 15px 30px fuchsia 40%, the button lifts 4px and scales to 1.02; on press it scales to 0.95. Transition 500ms ease-out.

- **Sizes:** padding 16px 32px; label 16px
- **States:** hover: gradient slides, lift 4px, glow widens; active: scale 0.95

### Glass Card

**Role:** feature cards and content cards

10% white fill, 20px blur, 1px 20% white border, 24px radius, 32px padding. The icon block is 56px square with a gradient fill, 16px radius and a white icon. On hover the fill rises to 15%, the border turns violet 50%, the card lifts 8px and scales to 1.02, a 0 20px 50px violet 18% glow is injected, and the icon block scales to 1.1 while rotating 12 degrees, over 500ms ease-out.

- **States:** hover: fill 10%→15%, border violet, lift 8px, icon rotate 12deg

### Gradient Input

**Role:** forms and subscription inputs

8% white fill, 10px blur, 1px 18% white border, 16px radius, padding 14px 18px, 14px type. Placeholder in white 45%. On focus the border turns violet 60% and a 3px violet 25% outer ring appears.

### Aurora Backdrop

**Role:** hero background light

Two to three 600px-radius radial gradient glows on the deep indigo ground (violet 40%, fuchsia 30%, cyan 20%), blurred 120px, at 60% overall opacity. Only on the hero and one or two other sections; fixed while scrolling.

## Do's and Don'ts

### Do

- Gradients must have a direction; make the colors flow on hover
- Glass cards must carry blur, border and fill together
- Deep indigo ground, never pure black
- Motion at 500ms, paired with a lift and 1.02 scale
- Light blobs only on the hero and a few sections
- Body text contrast no lower than 4.5:1

### Don't

- Don't use a pure black background
- Don't use glass cards without a border
- Don't put gradients on body text
- Don't use more than three accents at once
- Don't use fast transitions; light does not teleport
- Don't let light blobs cover the whole page

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Deep Indigo | `#1e1b4b` | Page ground |
| 1 | Glass | `rgba(255,255,255,0.10)` | Cards and panels |
| 2 | Glass Hover | `rgba(255,255,255,0.15)` | Hover fill |

## Elevation

- **Button glow:** `0 8px 20px rgba(167,139,250,0.30)`
- **Button hover:** `0 15px 30px rgba(217,70,239,0.40)`
- **Card hover:** `0 20px 50px rgba(167,139,250,0.18)`

## Imagery

Abstract gradients, light blobs, 3D-rendered geometry. Product screenshots may be cropped and layered over the gradients. No portrait photography, realistic illustration or flat solid backgrounds — without light there is no style.

## Layout

Capped at 1200px, 12 columns, container padding 24px, section gap 112px. The hero is centered and fills the first screen, headlines capped at two lines. Feature areas use three-column glass cards. The page stays dark; only the footer may invert once.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#f8fafc`
- background: `#1e1b4b`
- card: `rgba(255,255,255,0.10)`
- accent: `#8b5cf6`
- secondary: `#ec4899`
- border: `rgba(255,255,255,0.20)`

EXAMPLE COMPONENT PROMPTS:

1. Build the gradient primary button: background: linear-gradient(90deg, #8b5cf6, #ec4899, #8b5cf6), background-size: 200% auto, white text, 16px radius, weight 700, padding 16px 32px, shadow 0 8px 20px rgba(167,139,250,0.3). On hover, background-position moves to right, the shadow expands to 0 15px 30px rgba(217,70,239,0.4), and transform lifts 4px while scaling to 1.02, transition 500ms ease-out. The page ground is #1e1b4b.
