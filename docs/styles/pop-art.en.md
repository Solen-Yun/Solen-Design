# Pop Art — Style Reference

> Bold black outlines, Ben-Day dots, shouting speech bubbles: a comic printed on canvas.

**Theme:** light

Pop art descends from Warhol and Lichtenstein: a 4px bold black border wraps everything, backgrounds carry Ben-Day dots (evenly spaced circles), colors are high-saturation flat yellow, pink and blue, text sits at weight 900 uppercase like a comic masthead, and buttons and cards carry a 4px 4px 0 black hard shadow. Gradients are banned (everything must be flat), low saturation and greys are banned, borders under 2px are banned, full rounding is banned, and unadorned minimalism is banned — an empty pop canvas is an unfinished one.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Pop Yellow | `#ffdd00` | `--color-pop-yellow` | The primary ground and largest blocks. The style's brightness source. |
| Pop Pink | `#ff69b4` | `--color-pop-pink` | The second primary, often colliding directly with yellow. |
| Pop Blue | `#00bfff` | `--color-pop-blue` | The third clash color and speech-bubble ground. |
| Black | `#000000` | `--color-black` | The 4px outline, hard shadows and text. Every shape is drawn by it. |
| White | `#ffffff` | `--color-white` | Canvas and dot-bed ground, also reversed-out text. |
| Light Violet | `#a486ff` | `--color-light-violet` | The fourth clash, least frequent, breaking the fixed yellow-pink-blue set. |

## Typography

### Inter — weight 900 only, always uppercase. Titles run 56 to 80px at line height 0.95, like a comic cover.

- **Substitute:** 'Arial Black', Impact, sans-serif
- **Weights:** 900
- **Sizes:** 16, 20, 28, 40, 56, 80
- **Line height:** 0.95 (display), 1.05 (headings), 1.4 (body)
- **Letter spacing:** -0.02em on display, 0.04em on uppercase labels

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | — | 900 | 80px | 0.95 | -0.02em | `--text-display` |
| heading | — | 900 | 56px | 1 | -0.02em | `--text-heading` |
| subheading | — | 900 | 40px | 1.05 | — | `--text-subheading` |
| body-lg | — | 900 | 20px | 1.35 | — | `--text-body-lg` |
| body | — | 900 | 16px | 1.4 | — | `--text-body` |
| label | — | 900 | 16px | 1.3 | 0.04em | `--text-label` |

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
| cards | 2px |
| buttons | 2px |
| bubbles | 24px |

- **Page max-width:** 1160px
- **Section gap:** 96px
- **Card padding:** 24px
- **Element gap:** 16px

## Components

### Comic Headline

**Role:** the comic headline (core)

56 to 80px, weight 900, uppercase, line height 0.95, -0.02em tracking, black or white. May stack a 2px text stroke (-webkit-text-stroke) and a 4px 4px 0 black offset shadow, giving the masthead its depth. May rotate -2 to 2 degrees.

### Pop Button

**Role:** action buttons

Pop-yellow or pink fill, black text, 4px black border, 2px radius, 16px/900 uppercase, padding 12px 28px, hard shadow 4px 4px 0 black. On hover the fill hard-cuts to another clash color and the shadow widens to 6px; on press it translates 4px 4px with the shadow collapsing. Transition 100ms linear.

- **Sizes:** padding 12px 28px; label 16px
- **States:** hover: color cut, shadow 6px; active: translate 4px

### Ben-Day Bed

**Role:** the Ben-Day dot bed (signature)

A radial-gradient of dots at 6px spacing and 1.5px radius, colored 100% of one clash color (yellow, pink or blue) over white. The grid angles 45 degrees (to avoid moiré). It must stay clearly visible — the dots are Lichtenstein's signature; blurring them throws the style away.

### Speech Bubble

**Role:** speech bubbles

White or yellow fill, 4px black border, 24px radius (the bubble is the only element allowed to round), 20px padding, hard shadow 4px 4px 0 black. The tail is drawn with two pseudo-elements: a 4px black-bordered triangle and a white triangle covering its stroke. Text 20px/900 uppercase.

### Dot Card

**Role:** the dotted content card

White ground layered with 45-degree Ben-Day dots, 4px black border, 2px radius, 24px padding, hard shadow 4px 4px 0 black. Title 40px/900, body 16px/900. On hover the dot color swaps to another clash and the shadow widens to 6px.

## Do's and Don'ts

### Do

- Wrap everything in 4px bold black borders
- Use Ben-Day dots as background texture
- Paint flat and saturated — never gradient
- Set titles at 900 uppercase
- Keep hard shadows at 4px 4px 0 black
- Let speech bubbles carry quotes

### Don't

- Don't use gradients
- Don't use low saturation or greys
- Don't use borders under 2px
- Don't use full rounding (except bubbles)
- Don't build unadorned minimal pages
- Don't blur the dots

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | Pop Yellow | `#ffdd00` | Yellow sections |
| 1 | White | `#ffffff` | White sections |
| 2 | Pop Pink | `#ff69b4` | Pink sections |

## Elevation

- **Hard offset:** `4px 4px 0 #000000`
- **Hard offset lg:** `6px 6px 0 #000000`
- **Pressed:** `none`

## Imagery

Pop-processed images: photos pressed into 4 to 6 flat color blocks with black outlines (like silkscreen), or graded into dot monochrome. Repeating the same image in a grid (Warhol-style) is allowed. No gradient imagery, realistic photography or minimal compositions.

## Layout

Capped at 1160px with 24px container padding and 96px section gaps. Elements may overlap and rotate -2 to 2 degrees. The page zones into large flat blocks (yellow, white, pink); every section must carry at least dots or a bold border — bare empty areas cannot appear.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: `#000000`
- background: `#ffdd00`
- pink: `#ff69b4`
- blue: `#00bfff`
- white: `#ffffff`
- violet: `#a486ff`

EXAMPLE COMPONENT PROMPTS:

1. Build a pop-art card: white ground layered with 45-degree Ben-Day dots (6px spacing, 1.5px radius, color #ff69b4), 4px solid #000 border, 2px radius, 24px padding, box-shadow 4px 4px 0 #000. Title 40px/900 uppercase at line height 0.95 in black, body 16px/900. Button #ffdd00 fill, black text, 4px black border, 2px radius, hard shadow 4px 4px 0 #000; on hover the fill hard-cuts to #ff69b4 and the shadow widens to 6px. Zone the page into yellow, white and pink flat blocks; no gradients anywhere.
