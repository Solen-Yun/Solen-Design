Implement the "StrokeText" component from zero: a display headline rendered as SVG where outlined letterforms draw themselves on (stroke dash sweeping per character), then the fill floods in — either wiped across the glyph box by an animated clip rectangle or faded in per character — optionally backed by a drop shadow that lifts in as the fill lands. Solid strokes animate per character; dashed/dotted strokes render as patterned outlines with an optional marching-ants loop. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components beyond the animation library named below.

## Structure & rendering

- One React component in StrokeText.jsx plus StrokeText.css. React >= 18. Dependencies: gsap at ^3.13.0 (core plus its ScrollTrigger plugin, registered once on the client).
- Root is a `<span class="stroke-text">` (plus `stroke-text--hover` when trigger is "hover", giving cursor: pointer) with role="img" and aria-label = the text; className and style merge in, and a `--stroke-text-width` CSS variable is set to the measured glyph-box width in px (600 before measuring). The stylesheet makes it display block, width 100%, line-height 0; the inner `<svg>` is display block, width 100%, max-width var(--stroke-text-width), height auto, margin 0 auto, overflow visible, aria-hidden.
- Text layout: every character of text (split by Array.from so astral chars survive) becomes one `<tspan>` in each layer; typography comes from fontFamily / fontSize (px) / fontWeight / letterSpacing (px) applied as an inline style shared by all layers.
- Layers inside the svg: a stroke `<text>` (fill none, stroke strokeColor, strokeWidth, round linejoin/linecap) and a fill `<text>` (fill fillColor) wrapped in a `<g>` that carries the optional shadow filter. Solid strokes paint the stroke layer first, fill second; dashed/dotted strokes paint fill first and stroke last because the stroke carries an SVG mask. The fill layer also carries a clipPath when fillMode is "wipe".
- Measurement: the stroke text's getBBox() (try/catch guarded) defines the viewBox, padded by max(strokeWidth, fontSize × 0.1) on every side; the box updates on font-character changes, document.fonts.ready, and a ResizeObserver on the root (updates smaller than 0.5px are ignored). Before the first measurement the viewBox falls back to `0 -fontSize 600 fontSize*1.3` and the svg is visibility hidden.
- IDs for clipPath / filter / mask are derived from useId with non-alphanumerics stripped, so multiple instances don't collide.

## Draw-on & fill choreography

- Solid strokes: each character tspan gets strokeDasharray = dash = max(fontSize × 7, 200) and the animation tweens strokeDashoffset dash → 0 over drawDuration seconds with the ease prop and a per-character stagger (stagger seconds; reverse = true staggers from the end), so the outline draws on letter by letter.
- Fill reveal, starting at drawDuration + fillDelay:
  - fillMode "wipe" (default): a clipPath rect on the fill layer animates from a zero-size frame to the full glyph box over fillDuration = max(0.4, drawDuration × 0.5) with power2.inOut; wipeFrom picks the growing edge — "left" grows rightward, "right" grows leftward, "top" grows downward, "bottom" grows upward.
  - fillMode "fade": fill opacity tweens 0 → 1 per character with the same stagger configuration, power2.out, over fillDuration.
  - fillMode "none": the fill layer never shows (and the shadow stays unlifted); only the outline draws.
- Shadow: when shadow is true and fillMode is not "none", a feDropShadow filter (dx = dy = fontSize × 0.06, stdDeviation = fontSize × 0.016, floodColor shadowColor or strokeColor, flood-opacity 0.5, sRGB) sits on the fill group and tweens from dx/dy/opacity 0 to its lifted values at drawDuration + fillDelay + fillDuration × 0.3 over fillDuration × 1.4 with power3.out — the headline settles and then casts.
- Trigger "mount" (default) plays the timeline immediately. "scroll" arms a ScrollTrigger on the element at start `top 82%`, once, playing from 0 on first entry. "hover" shows the finished headline immediately and rebuilds + replays the whole timeline from 0 on every pointerenter. "loop" runs the timeline forever with repeatDelay 0.9s and yoyo, alternating draw-on and erase.
- hoverRedraw (with mount/scroll triggers): after a completed draw, pointerenter fades the strokes out (strokeOpacity → 0, 0.2s), resets the dash offset, and redraws at 80% of drawDuration; guarded so it cannot restart while active or mid-draw.
- prefers-reduced-motion: reduce — no timeline runs; the finished state (full stroke, full fill, lifted shadow) is set instantly.

## Dashed & dotted strokes

- strokeStyle "dotted" builds stroke-dasharray `0 gap` with gap = max(dashLength, strokeWidth × 1.8) (dot rows); "dashed" builds `on off` with on = max(dashLength − strokeWidth, 0.5) and off = dashLength × 0.6 + strokeWidth. "solid" uses none of this.
- With a pattern active, the choreography described above is skipped; instead the stroke layer renders through a mask that keeps only the stroke ring: a white stroked copy of the text (strokeWidth + 2) minus a black filled copy eroded by feMorphology (radius strokeWidth / 2 + 0.75), so patterned dashes wrap only the letterform edges.
- marching = true animates the whole outline's stroke-dashoffset 0 → −pattern-period linearly over period / (fontSize × 0.22) seconds, repeating forever — ants crawling along the outline. All tweens, the ScrollTrigger, listeners and the march tween are killed on unmount or when the relevant props change.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "Draw Attention" | The headline text. |
| strokeColor | string | "#A78BFA" | Outline stroke colour. |
| fillColor | string | "currentColor" | Fill colour revealed after the draw. |
| strokeWidth | number | 1.4 | Stroke width in SVG units. |
| drawDuration | number | 1.6 | Stroke draw-on time in seconds. |
| fillDelay | number | 0.2 | Delay after the draw before the fill reveals, in seconds. |
| stagger | number | 0.05 | Per-character stagger in seconds. |
| ease | string | "power2.out" | Ease of the stroke draw. |
| trigger | "mount" \| "scroll" \| "hover" \| "loop" | "mount" | When the choreography runs. |
| fillMode | "wipe" \| "fade" \| "none" | "wipe" | How the fill appears after the draw. |
| wipeFrom | "left" \| "right" \| "top" \| "bottom" | "left" | Edge the wipe grows from. |
| fontSize | number | 128 | Font size in px. |
| fontWeight | number | 800 | Font weight. |
| fontFamily | string | "inherit" | Font family; inherit keeps the page's font. |
| letterSpacing | number | -4 | Letter spacing in px. |
| reverse | boolean | false | Staggers the draw from the last character instead of the first. |
| strokeStyle | "solid" \| "dashed" \| "dotted" | "solid" | Outline style; dashed/dotted render a patterned ring via mask. |
| dashLength | number | 10 | Base length unit of the dash/dot pattern. |
| marching | boolean | false | Marching-ants loop along patterned outlines. |
| hoverRedraw | boolean | false | Redraws the outline on hover after a completed draw (mount/scroll). |
| shadow | boolean | false | Drop shadow that lifts in with the fill. |
| shadowColor | string | - | Shadow colour; defaults to the stroke colour. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | {} | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of StrokeText.jsx and StrokeText.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. Dependencies: gsap at ^3.13.0 (core, ScrollTrigger plugin).
- Validate: mount plays draw-on then wipe/fill with the configured delay; all four wipeFrom directions wipe the fill correctly; fade mode staggers per character; none mode keeps the fill hidden; scroll trigger fires once on entering the viewport; hover shows the final state and replays on each pointerenter; loop yoyos forever with the 0.9s repeat delay; reverse staggers from the end; shadow lifts after the fill with the stroke-colour flood unless overridden; dashed/dotted render the patterned ring through the erode mask and marching crawles the ants; hoverRedraw redraws only after completion and never double-runs; reduced motion shows the final state instantly; late font loads re-measure the viewBox; multiple instances don't collide on SVG ids; unmount leaves no timelines, triggers, listeners or tweens; the headline scales to its container at 375 / 768 / 1440 wide without overflow.
