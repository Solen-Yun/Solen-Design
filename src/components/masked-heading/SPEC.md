Implement the "MaskedHeading" component from zero: a headline whose glyphs themselves are the mask — an image or video fills the letter shapes and shows through them, drifting slowly, parallaxing against the pointer, zooming on hover, tintable, dimmable outside a spotlight that follows the cursor, with an optional hollow outline layer, revealed word by word through five entrance animations. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components beyond the tween library named below.

## Structure & rendering

- React + CSS, with the GSAP tween library (core) driving the reveal. Two files: MaskedHeading.jsx (measuring, glyph clip, motion) and MaskedHeading.css (layers). React >= 18. No iframe.
- Root is the element named by the tag prop (default "h2") with class `masked-heading` plus className — position relative, width 100%, text-wrap balance — with inline textAlign, fontWeight, letterSpacing (em) and lineHeight, plus any extra props spread onto it.
- Four layers, in paint order:
  1. Measure layer: `.masked-heading__measure` — colour transparent so the real text is invisible; words render as inline-block spans (white-space pre) each followed by a space, and each word embeds a zero-size baseline marker whose offsetTop gives the exact text baseline.
  2. Defs layer: a hidden `<svg>` with a single `<clipPath>` (userSpaceOnUse, id derived from useId) containing one `<text>` per character — words are flat-mapped to characters, each remembering its word index. Font family/size/weight/style/letter-spacing are copied from the computed measure layer onto these text nodes, and each is positioned at its measured x / baseline y.
  3. Reveal layer: an absolutely inset, pointer-events-none wrapper holding the clip span (clip-path: url(#id)) whose child media span carries the fill — an `<img>` or `<video>` (autoPlay muted loop playsInline, poster optional; the video pauses under reduced motion) with object-fit cover, drag disabled, alt empty, over a background of currentColor mixed at 10%; an optional tint span (mix-blend-mode color); and, when spotlight is on, two full-size spot spans masked by a radial spot mask — a 9-stop radial gradient (circle of spotlightRadius px, transparent-centred falloff via a smoothstep-squared curve) — the tone span (#808080 with saturation blend) desaturates everything outside the beam and the shade span (black at 0.55) darkens it.
  4. Outline layer (optional): an absolutely positioned `<svg>` repeating the same glyph text nodes with fill none, stroke round-joined, stroke colour outlineColor or currentColor and stroke width outlineWidth — a hollow ghost of the headline over the fill.
- The visible media only appears through the glyph clip; the base text layer stays transparent, so the element's own height comes from the real text flow.

## Measuring & motion

- The root's font-size is derived from its width: clamp(clientWidth × textScale, 20, 200) px, so the headline scales fluidly. Per character a DOM Range over the measure text yields x / width; character boxes record baseline y, centre x, centre y (baseline − 0.36 × fontPx) and their line's centre (lines grouped by baseline) for group-aware transforms; the x coordinate and the box width are corrected by the ratio between bounding and offset widths (zoom-safe), the baseline y is taken as measured and is not rescaled.
- Motion runs in one raf loop (self-sleeping, paused offscreen via IntersectionObserver): a slow autonomous drift (sin at 0.21 Hz × drift px horizontally, cos at 0.17 Hz × drift × 0.6 vertically) is added to a pointer parallax target (−normalized pointer × parallax, clamped ±1), both eased with a 0.18s time constant; hover zoom eases toward hoverZoom with a 0.35s time constant (pointer, not touch). The media transform is translate3d(x, y, 0) scale(fillScale × (1 + zoom)), with x/y clamped so the scaled media never reveals its edges: max offset = (scale − 1)/2 × client size. The filter string brightness(brightness) saturate(saturation) plus grayscale(1) when grayscale is on. Writes are cached — a transform/filter/spot position only touches the DOM when it changed.
- Spotlight: while hovered the beam centre follows the pointer with a 0.12s time constant; idle it wanders a Lissajous path across the block (0.5 + 0.36 sin(0.37 t), 0.5 + 0.22 sin(0.61 t + 0.9)) with a 0.6s time constant; reduced motion pins it to the centre. The position is written as two CSS custom properties consumed by the spot mask. ResizeObserver marks the layout dirty and re-syncs on the next frame; document.fonts.ready re-syncs once so glyph boxes track late font loads.
- Reveal animations (per glyph state: x, y, scale — written to the SVG text transforms; per layer):
  - "rise" (default): glyph y from 1.15 em → 0, power4.out, staggered one word at a time (word index × stagger).
  - "scale": glyph scale 0 → 1 with y 0.1 em → 0, expo.out, staggered per letter (index × stagger × 0.35).
  - "blur": whole layer starts blurred (0.3 em) and transparent, glyph x 0.22 → 0 (expo.out), layer blur/opacity ease out over duration × 1.2.
  - "wipe": clip-path inset right 100% → 0, power3.inOut.
  - "fade": layer opacity 0 → 1 and scale 1.08 → 1, power3.out.
  - "none": instant.
  - trigger "view" (default) waits for an IntersectionObserver at threshold 0.25 and plays once; "mount" plays immediately; "hover" settles hidden and replays on each pointerenter. duration is seconds (default 1.1), stagger seconds (default 0.09). prefers-reduced-motion settles everything instantly and keeps the motion loop from drifting; changing reveal-related props re-arms the entrance.
- Unmount cancels the raf, kills the running tween, disconnects the resize/intersection observers and removes pointer listeners. Multiple instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "Designed in the details" | The headline; words split on whitespace for the reveal stagger. |
| tag | string | "h2" | Element to render. |
| mediaType | "image" \| "video" | "image" | What fills the glyph mask. |
| src | string | "" | Media URL; an SVG data URI works for images. |
| poster | string | "" | Poster frame for videos. |
| fillScale | number | 1.25 | Media zoom inside the glyphs; headroom for parallax. |
| parallax | number | 26 | Pointer-follow shift in px (media moves against the pointer). |
| drift | number | 18 | Autonomous drift amplitude in px. |
| hoverZoom | number | 0 | Extra scale eased in while hovered. |
| brightness | number | 1 | Media brightness filter. |
| saturation | number | 1 | Media saturation filter. |
| grayscale | boolean | false | Fully desaturates the media. |
| tint | string | "" | CSS background of a colour-blend layer over the media; empty disables. |
| spotlight | boolean | false | Desaturates and darkens everything outside a moving beam. |
| spotlightRadius | number | 160 | Beam radius in px, floored at 1. |
| outline | boolean | false | Draws a hollow stroke ghost of the glyphs. |
| outlineColor | string | "" | Outline stroke colour; empty uses currentColor. |
| outlineWidth | number | 1 | Outline stroke width in px. |
| reveal | "rise" \| "scale" \| "blur" \| "wipe" \| "fade" \| "none" | "rise" | Entrance animation. |
| duration | number | 1.1 | Entrance duration in seconds. |
| stagger | number | 0.09 | Entrance stagger per word (letters use 0.35 × this), in seconds. |
| trigger | "view" \| "mount" \| "hover" | "view" | When the entrance plays. |
| align | string | "center" | Text alignment. |
| weight | number | 700 | Font weight. |
| tracking | number | -0.03 | Letter spacing in em. |
| lineHeight | number | 1.06 | Line height. |
| textScale | number | 0.115 | Font size as a fraction of the block width, clamped 20–200px. |
| className | string | "" | Extra class names for the root element. |
| style | CSSProperties | - | Inline styles merged after the component's own. |
| ...rest | object | - | Any other props spread onto the root element. |

## Delivery & validation

- Deliver the complete content of MaskedHeading.jsx and MaskedHeading.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders. Dependency: gsap at ^3.13.0 (core).
- Validate: the media shows strictly inside the glyph shapes at every font size and wraps to multiple lines with per-line masks intact; all five entrances play word by word (scale letter by letter) from view / mount / hover; the media drifts on its own, shifts against the pointer and zooms on hover without ever exposing its edges; tint recolours via blend and grayscale strips colour; the spotlight beam tracks the pointer and wanders when idle, desaturating and dimming outside the beam; the outline ghost strokes follow the filled glyphs' position, and only align with them once the entrance animation has settled — during the entrance the outline nodes do not take part in the per-glyph transform; resizing and late font loads re-measure so glyphs stay registered; reduced motion shows the final heading instantly with no drift; unmount leaves no raf, observers, tweens or listeners; multiple instances keep independent clip ids; 375 / 768 / 1440 wide without overflow.
