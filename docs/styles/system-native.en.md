# System Native — Style Reference

> Generous whitespace, one system blue, motion timed just slow enough: let the product speak for itself.

**Theme:** light

The core of the system-native style is not elements but proportion: content occupies far less area than whitespace, and the product image is the only protagonist. A cool pale grey (#f5f5f7) replaces pure white as the ground, with cards one step whiter, floating above it. Color allows a single system blue (#0071e3) for actions — everything else is greyscale. Radii are restrained and consistent: fully-rounded buttons, 24px cards, 12px inputs. Motion is the style's signature: 500ms on an ease-in-out curve, hover lifting slightly as the shadow spreads — any faster becomes an ordinary web page, any slower becomes a drag.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Native Black | `#000000` | `--color-native-black` | Body, headings and full-screen dark sections. The dark stage pushes the product image to the front. |
| Native Grey | `#f5f5f7` | `--color-native-grey` | Page canvas. One step softer than pure white, giving white cards something to rest against. |
| Card White | `#ffffff` | `--color-card-white` | Card and overlay fills. Appear only on the grey ground. |
| System Blue | `#0071e3` | `--color-system-blue` | The only accent: primary CTA, links and selection. One instance per screen. |
| Success Green | `#34c759` | `--color-success-green` | Success and online status, as small marks. |
| Alert Red | `#ff3b30` | `--color-alert-red` | Errors and deletion; its presence means irreversible. |

## Typography

### SF Pro Display — the only font on the site. Large headings at 600 with tight tracking, body at 400 stays neutral; type runs large (17px and up).

- **Substitute:** -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif
- **Weights:** 400, 500, 600, 700
- **Sizes:** 12, 14, 17, 24, 40, 56, 80
- **Line height:** 1.05 (display), 1.15 (headings), 1.55 (body)
- **Letter spacing:** -0.025em on display, 0.01em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 600 | 80px | 1.05 | -0.025em | `--text-display` |
| heading-lg | — | 600 | 56px | 1.1 | -0.02em | `--text-heading-lg` |
| heading | — | 600 | 40px | 1.15 | -0.015em | `--text-heading` |
| subheading | — | 500 | 24px | 1.3 | — | `--text-subheading` |
| body-lg | — | 400 | 17px | 1.55 | — | `--text-body-lg` |
| body | — | 400 | 14px | 1.5 | — | `--text-body` |
| label | — | 400 | 12px | 1.4 | 0.01em | `--text-label` |

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
| cards | 24px |
| buttons | 999px |
| inputs | 12px |
| product-media | 18px |

- **Page max-width:** 1080px
- **Section gap:** 128px
- **Card padding:** 32px
- **Element gap:** 24px

## Components

### Pill Button

**Role:** the primary action — Buy, Learn more

System-blue fill, white text, 999px full radius, no border. 17px type, weight 500, padding 12px 24px, shadow 0 4px 14px blue 30%. On hover the fill brightens to #0077ed, the button lifts 2px and the shadow spreads to 20px at 40%; on press it scales to 0.96. Transition 500ms on cubic-bezier(0.25, 0.1, 0.25, 1).

- **Sizes:** padding 12px 24px; label 17px
- **States:** hover: lift 2px, brighter fill; active: scale 0.96

### Product Card

**Role:** product cards and feature cards

White ground, 24px radius, 32px padding, shadow 0 4px 12px 4%. Content is centered: a 192px square product image on top (18px radius, native grey ground), then a 24px/600 title and 14px grey copy. On hover the card lifts 4px, the shadow spreads to 0 20px 40px 8% and the product image scales 1.05, over 500ms.

### Search Field

**Role:** search and inputs

Native grey ground, 12px radius, no border, padding 12px 16px, 17px type. On focus a 2px system-blue ring appears, without changing the field's size.

- **States:** focus: 2px blue ring

### Vibrancy Nav

**Role:** top navigation

48px tall, white at 80% opacity, backdrop-blur 20px, a bottom 1px grey 50% border. Links 12px, weight 400, 32px apart, turning 50% grey on hover. At most one text-only CTA on the right.

## Do's and Don'ts

### Do

- Put whitespace first; keep elements sparse to the edge of empty
- Use one system blue only, #0071e3
- Time motion at 500ms, ease-in-out
- Keep buttons fully rounded, cards 24px, inputs 12px
- Pair 600-weight headings with tight tracking
- Use native grey instead of pure white as the ground

### Don't

- Don't use multiple accents
- Don't use gradient backgrounds
- Don't use heavy shadows
- Don't cram content together
- Don't use decorative illustration or icon walls
- Don't mix more than three radius tiers

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Native Grey | `#f5f5f7` | Page canvas |
| 1 | Card White | `#ffffff` | Cards and overlays |
| 2 | Black Stage | `#000000` | Full-screen product sections |

## Elevation

- **Card rest:** `0 4px 12px rgba(0,0,0,0.04)`
- **Card hover:** `0 20px 40px rgba(0,0,0,0.08)`
- **Button glow:** `0 4px 14px rgba(0,113,227,0.30)`

## Imagery

Product renders and studio photography are the only protagonists: full-bleed, centered, on a pure ground (black, white or native grey). Slow parallax and scaling are allowed. No illustration, icon walls, gradient backgrounds or close-up portraits.

## Layout

Capped at 1080px with 24px container padding. Section gaps start at 128px; whitespace is at least half the height of the content. Each screen tells one story: one heading, one subline, two links. Product sections may run full-bleed and inverted.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#1d1d1f`
- background: `#f5f5f7`
- card: `#ffffff`
- accent: `#0071e3`
- muted: `#86868b`
- dark: `#000000`

EXAMPLE COMPONENT PROMPTS:

1. Build a product card: white ground, 24px radius, 32px padding, shadow 0 4px 12px rgba(0,0,0,0.04). On top a 192px square product image (18px radius, #f5f5f7 ground), below it a 24px/600 title #1d1d1f and 14px #86868b copy, then a #0071e3 fully-rounded button (17px/500, padding 12px 24px). On hover the card lifts 4px, the shadow spreads to 0 20px 40px rgba(0,0,0,0.08) and the image scales 1.05, over 500ms cubic-bezier(0.25,0.1,0.25,1).
2. Build a vibrancy nav: 48px tall, white at 80% opacity, backdrop-filter: blur(20px), bottom 1px grey 50% border. 12px/400 links 32px apart turning 50% grey on hover; at most one text-only CTA on the right.
