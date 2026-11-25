Implement the "FuzzyText" component from zero: a text renderer that draws its label onto a canvas and keeps it permanently fuzzy — the raster is sliced into thin rows (or columns) that jitter horizontally every frame, with a controllable idle tremor, a stronger hover tremor, periodic glitch bursts, an optional RGB channel split, and click/intro shockwaves that momentarily shred the text before it settles. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + Canvas 2D, one file only: FuzzyText.jsx. React >= 18; no runtime dependencies. No iframe. File starts with a `'use client'` directive.
- Renders exactly one `<canvas>` carrying the className prop, `role="img"`, `aria-label` set to the flattened text, and an inline style setting `cursor: pointer` only when trigger is "click". The visible text never exists in the DOM — the canvas is the rendering.
- The text is `React.Children.toArray(children).join('')`; any children flatten into that string.
- Three offscreen canvases drive the effect: a source canvas holding the cleanly painted text raster, a scratch canvas used only by the "both" direction, and — when colorSplit > 0 — three channel canvases holding single-channel copies (red / green / blue) of the text.
- Layout measurement: measureText with actualBoundingBoxLeft/Right/Ascent/Descent under the font string `${fontWeight} ${fontPx}px ${family}`; family resolves to the computed fontFamily of the canvas when fontFamily is "inherit", otherwise to the prop. A numeric fontSize is used as px; a string fontSize is measured by appending a hidden probe span with that font-size to the canvas parent and reading its computed size (fallback 16px). Letter spacing, when non-zero, is rendered by painting each character manually and advancing x by its measured width + spacing (width measured the same way); otherwise the whole string paints at once with `textBaseline: alphabetic` at (5px inset + bounding left, ascent).
- Padding reserves room for the fuzz: padX = fuzzRange + 20 plus, when colorSplit is active and direction is not "vertical", an extra ceil(fuzzRange × 0.5) + 4; padY is 0 for "horizontal", and fuzzRange + 10 plus the split pad for "vertical". Canvas CSS size is textWidth + 2×inset + 2×padX by textHeight + 2×padY; the backing store multiplies by devicePixelRatio clamped to 2, and the style width/height pin the CSS size in px.
- Ink: when color is "currentColor", "inherit" or empty and no gradient is set, the fill colour follows the canvas's computed CSS colour, re-checked every 250 ms while the loop runs; a change repaints the source raster. Otherwise the color prop is used directly. Any CSS colour parses through a 1×1 canvas probe. When gradient is an array of at least two colours, the text paints with a horizontal linear gradient spanning the text box, stops distributed evenly in array order; gradient overrides ink following. The colour probe is module-level and shared.
- RGB split mode paints each channel canvas with the same text in a channel-isolated colour: for a light ink (average relative luminance of the ramp ≥ 0.5) the other channels are 0 and the layers composite with `lighter`; for a dark ink they are 255 and composite with `multiply`. The blend mode is chosen once per raster build.

## Fuzz engine

- Every frame the canvas clears and re-blits the raster in slices: for direction "horizontal", each row band of height `step` is drawn shifted by a random row offset; for "vertical", each column band is shifted vertically; for "both", row-shifted bands first render into the scratch canvas, which is then re-sliced into column bands shifted vertically onto the visible canvas. Offsets regenerate every frame, in device pixels: rows within ±amp/2, "both"-mode columns within ±amp×0.25. Row/column offsets live in Int32Array caches sized to the raster. When amp < 0.5 the raster draws unsliced (rest state).
- amp = intensity × fuzzRange × dpr; step = max(1, round(sliceSize × coarse × dpr)) where sliceSize is the user band size and coarse = 1 + 3 × energy² — click bursts and the intro temporarily multiply the band size so the text visibly chunks apart.
- Intensity pipeline: the resting level is baseIntensity (0 under reduced motion); the active level is hoverIntensity whenever the pointer is over the actual glyph box (hit-tested by mapping pointer coordinates into canvas space against the padded text rect — the padding around the text does not count as hover) with enableHover on, or permanently when trigger is "always" (except reduced motion, which stays at base); trigger "click" rests at base. Any glitch burst or click flash forces the goal to 1. With transitionDuration > 0 the level approaches its goal exponentially (factor 1 − 0.05^(1/duration) per frame, snapping within 0.002); otherwise it snaps instantly.
- Click burst (trigger "click"): each click starts an envelope that rises over 70 ms (ease-out quadratic) and decays exponentially with τ = 240 ms until below 0.004. The envelope pushes the level toward peak = min(2, 0.6 + hoverIntensity × 1.4) and feeds energy into the slice size, producing a violent shred that relaxes back to the idle tremor.
- clickEffect (when trigger is not "click"): a click flashes the goal to 1 for 150 ms.
- Glitch mode: a timer chain runs every glitchInterval ms — set the glitch flag for glitchDuration ms, then reschedule; while flagged the intensity goal is 1, so the text convulses on a rhythm without any pointer. Disabled entirely under reduced motion; timers cleared on unmount and on prop change.
- Intro: when intro is on, the canvas starts at opacity 0; over introDuration ms an envelope (1 − progress)^2.5 pushes the level toward peak 2 while the opacity fades in across the first 30% of that window, so the text materialises out of a violent blur that collapses into legibility. The intro runs once per mount; reduced motion skips it.
- Frame loop: requestAnimationFrame, throttled to the fps prop (frames skipped until 1000/fps elapsed), pauses when an IntersectionObserver reports the canvas off-screen and resumes on re-entry, and fully idles (no draws) while intensity is 0 and nothing changed.
- Rebuild: window resize (rAF-throttled) rebuilds the rasters when the measured font size or DPR changed; the first build waits for `document.fonts.load(font)` (falling back to `document.fonts.ready`) so webfonts rasterise correctly.
- Reduced motion: base intensity 0, glitch and intro disabled — the text renders crisp and static.
- Unmount: cancel animation and resize frames, clear timers, disconnect the observer, remove every pointer/click/resize listener. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | The text to render. Children flatten into a single string. |
| fontSize | number \| string | "clamp(2rem, 8vw, 8rem)" | Font size in px (number) or any CSS font-size string. |
| fontWeight | number \| string | 900 | Font weight of the rasterised text. |
| fontFamily | string | "inherit" | Font family; "inherit" follows the surrounding page font. |
| color | string | "currentColor" | Ink colour. "currentColor" / "inherit" / "" follow the surrounding CSS colour live. |
| enableHover | boolean | true | Lets hovering the glyphs raise the tremor to hoverIntensity. |
| baseIntensity | number | 0.18 | Idle tremor strength, 0–1. |
| hoverIntensity | number | 0.5 | Tremor strength while hovered (or always, when trigger is "always"). |
| fuzzRange | number | 30 | Maximum slice displacement in px at full intensity. |
| fps | number | 60 | Frame rate cap of the jitter loop. |
| direction | "horizontal" \| "vertical" \| "both" | "horizontal" | Which axis the slices shift along. |
| transitionDuration | number | 0 | Seconds for the intensity to ease between rest and hover; 0 snaps instantly. |
| clickEffect | boolean | false | Flashes the tremor to full for 150 ms on click (when trigger is not "click"). |
| glitchMode | boolean | false | Pulses the tremor to full on a timer rhythm. |
| glitchInterval | number | 2000 | Milliseconds between glitch pulses. |
| glitchDuration | number | 200 | Length of each glitch pulse in ms. |
| gradient | string[] \| null | null | Two or more colours painting the text as a left-to-right gradient. |
| letterSpacing | number | 0 | Extra tracking between characters in px. |
| sliceSize | number | 1 | Thickness of the jittering slice bands in px. |
| trigger | "hover" \| "click" \| "always" | "hover" | What raises the tremor: pointer over the glyphs, a click shockwave, or permanently active. |
| intro | boolean | false | Materialises the text from a violent blur on mount. |
| introDuration | number | 1400 | Length of the intro collapse in ms. |
| colorSplit | number | 0 | Strength of the RGB channel split; 0 disables it. |
| className | string | "" | Extra class names for the canvas. |

## Delivery & validation

- Deliver the complete content of FuzzyText.jsx plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the text shimmers at baseIntensity and jumps to hoverIntensity only when the pointer crosses the glyphs (padding stays calm); horizontal / vertical / both directions all slice correctly at DPR 1 and 2; trigger "click" fires a shockwave that shreds and settles, "always" trembles at hoverIntensity; transitionDuration smooths the level shift; glitchMode pulses on rhythm; clickEffect flashes once per click; intro collapses from blur with the opacity fade; colorSplit separates red/blue around the resting channel with the right blend for light and dark ink; gradient renders left-to-right; letterSpacing tracks correctly for wide glyphs; colour set to currentColor tracks CSS colour changes within 250 ms; resize and webfont loads rebuild the raster; the canvas exposes role="img" with the right aria-label; prefers-reduced-motion renders a crisp static text with no glitch or intro; the loop sleeps when intensity is 0 and when off-screen; unmount leaves no frame loop, timers, observers or listeners; same-page instances are independent; no horizontal overflow at 375 / 768 / 1440 wide.
