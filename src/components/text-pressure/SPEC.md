Implement the "TextPressure" component from zero: a full-width headline of variable-font characters that deform under the pointer — letters near the cursor swell wider, heavier, more italic (and optionally fade toward a pressure colour), an idle "wave" or "pulse" breathes through the word when the pointer is away, and clicking drops expanding ripples that push the letters out as they pass. Full specification follows; it must not depend on external pages, videos, images, or off-the-shelf effect components; its one external asset is a variable-font stylesheet loaded by default and swappable through a prop (the exact default stylesheet URL is part of the embedded source).

## Structure & rendering

- One React file, TextPressure.jsx, no stylesheet of its own. React >= 18; no runtime dependencies. A small `<style>` tag is rendered inline with the component carrying the font @import (from fontUrl) and the stroke-mode rules.
- Root is a full-size transparent div (width/height 100%); the headline is an `<h1 class="text-pressure-title">` with aria-label = text and one aria-hidden `<span data-char>` per character (Array.from split, inline-block). h1 inline style: fontFamily, textTransform uppercase, the live font size, line-height 1, fontWeight 100, width 100%, textAlign center, whiteSpace nowrap, userSelect none, color textColor, transform scale(1, scaleY) with origin center top, and two CSS vars for the stroke width/colour. flex = true renders the h1 as display flex with justifyContent space-between so the letters always fill the full width (false leaves the natural inline flow); className merges in.
- Sizing: font size = containerWidth / (characterCount / 2), clamped to minFontSize; a ResizeObserver on the container re-runs it. scale = true also derives scaleY = containerHeight / fontSize so the word stretches vertically with its box.
- Font: the component speaks font-variation-settings directly. width drives 'wdth' floor(5 + 200 × pressure), weight drives 'wght' floor(100 + 900 × pressure), italic drives 'ital' pressure (two decimals); axes that are off pin their defaults (wdth 100, wght 400, ital 0) in the same settings string, so any combination reads naturally on a variable font that carries those axes.
- Stroke mode: adds an `is-stroke` class whose rule gives each span an ::after echoing the character (content: attr(data-char)), positioned behind (z-index -1), transparent fill, with -webkit-text-stroke-width/-color from the CSS vars — an outlined ghost behind every glyph.

## Pressure model

- Each frame measures every character's centre and computes pressure = clamp(1 − distance(pointer, centre) / maxDist, 0..1) with maxDist = max(titleWidth × radius, 1) — a circular zone of influence sized by radius (a fraction of the headline width).
- The pointer is followed by a smoothed virtual point: it eases toward the real cursor with factor 1 − exp(−elapsed / lag), lag = 1000 × smoothing² ms, so smoothing 0 snaps instantly and 1 glides heavily. On mount the virtual point is seeded at the container's centre so the word starts at rest.
- Colour: with pressureColor set, each letter's colour is color-mix(in oklab, pressureColor N%, textColor) where N = round((1 − (1 − pressure)²) × 100) — the tint only saturates near full pressure. alpha = true sets each span's opacity to its pressure.
- Writes are cached per span: font-variation-settings, opacity and colour are only reassigned when the computed string changes.

## Idle animation & ripples

- idle "wave": pressure at rest = crest² where crest = 0.5 + 0.5 × cos(2π × (position / spread − clock / 3.2)), position = the character's horizontal progress across the title, spread = max(radius × 2, 0.2), clock advanced by idleSpeed. idle "pulse": lag = |position − 0.5| × 0.4, breath = 0.5 − 0.5 × cos(2π × (clock / 2.8 − lag)), pressure at rest = 0.42 × breath² × (3 − 2 × breath) — a soft heartbeat travelling down the word.
- Idle yields to the pointer: an engage value eases (320ms) toward 1 when the cursor is seen and inside the container, toward 0 otherwise, and the applied pressure = rest + (pointer − rest) × engage, so the wave dissolves as you approach.
- Click ripples: pointerdown on the container pushes a ripple at that point (at most 6 kept, oldest dropped); each lives 1.3s and expands at 1.25 × title-width per second. Per character the swell = (1 − offset²)² × fade² × min(1, age / 0.06) with offset = (distance − age × speed) / band, band = max(span × 0.14, 32), fade = 1 − age / 1.3; swells combine into the pressure screen-style (1 − (1 − p)(1 − swell)) so overlapping rings stack without clipping.

## Loop, responsiveness & cleanup

- One requestAnimationFrame loop drives everything with dt clamped to 64ms; it self-sleeps once the virtual pointer has settled, no ripple lives, idle mode is off (or engaged) and writes have quiesced (a short grace window after the last change), and it wakes on: mousemove, touchstart/touchmove, scroll (capture), the cursor leaving the document, variable-font load completion, visibility via an IntersectionObserver on the container, any option/size/text change.
- prefers-reduced-motion: reduce disables the idle wave/pulse entirely; direct pointer pressure and ripples remain (they follow the user's hand).
- Unmount removes all window/document listeners, disconnects both observers, and cancels the frame. Multiple instances are independent (own refs, own loop).
- The headline is a single nowrap line that scales with container width; keep the container wide enough for the character count at 375 / 768 / 1440.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "Compressa" | The headline text. |
| fontFamily | string | "Roboto Flex" | Font family; must be a variable font carrying the axes you enable. |
| fontUrl | string | Embedded Roboto Flex stylesheet (opsz 8–144, wdth 25–151, wght 100–1000, display swap) | Stylesheet injected via @import; the exact default URL is part of the embedded source. |
| width | boolean | true | Maps pressure to the 'wdth' axis (5 → 205). |
| weight | boolean | true | Maps pressure to the 'wght' axis (100 → 1000). |
| italic | boolean | true | Maps pressure to the 'ital' axis (0 → 1). |
| alpha | boolean | false | Fades each letter's opacity to its pressure. |
| flex | boolean | true | Letters spread with space-between to always fill the width. |
| stroke | boolean | false | Draws an outlined echo of each letter behind it. |
| scale | boolean | false | Stretches the word vertically to fill the container height. |
| radius | number | 0.5 | Pressure zone radius as a fraction of the headline width. |
| smoothing | number | 0.5 | Pointer lag 0–1; higher follows more slowly. |
| idle | "none" \| "wave" \| "pulse" | "none" | Idle animation while the pointer is away. |
| idleSpeed | number | 1 | Clock multiplier of the idle animation. |
| clickRipple | boolean | true | Clicking spawns expanding pressure ripples. |
| textColor | string | "currentColor" | Base letter colour. |
| pressureColor | string | "" | Colour the letters tint toward at high pressure; empty disables tinting. |
| strokeColor | string | "#FF0000" | Outline colour of the stroke echo. |
| strokeWidth | number | 3 | Outline width of the stroke echo, in px. |
| className | string | "" | Extra class names for the headline. |
| minFontSize | number | 24 | Lower clamp for the computed font size. |

## Delivery & validation

- Deliver the complete content of TextPressure.jsx plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: letters near the cursor swell in width/weight/italic and relax smoothly behind it with the configured lag; each axis can be pinned off and the settings string stays valid; alpha fades and pressureColor tints only near full pressure; stroke mode draws the echo behind every glyph with the configured width/colour; idle wave and pulse breathe through the word, dissolve as the pointer enters and return after it leaves; click drops up to 6 stacking ripples that die after 1.3s; font size tracks the container and respects minFontSize; scale stretches with height; reduced motion disables idle but keeps pointer response; the loop sleeps when nothing moves and wakes on scroll/font/visibility; unmount leaves no listeners, observers or frames; multiple instances are independent; no overflow at 375 / 768 / 1440 wide.
