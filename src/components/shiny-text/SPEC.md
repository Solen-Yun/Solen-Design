Implement the "ShinyText" component from zero: a sheen of light that sweeps across text — a soft band by default, expandable into multiple trailing bands, with an optional blurred glow layer, pointer-following mode, and loop / hover / view triggers. The text keeps its real glyphs (a background-clipped gradient, not duplicated layers), so it stays selectable and accessible. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: ShinyText.jsx (entry, gradient engine, state machine) and ShinyText.css (all styles). React >= 18; no runtime dependencies. No iframe, no canvas element in the render tree.
- Root is a `<span>` (class shiny-text plus className): position relative, display inline-block, background no-repeat sized 100% 100%, background-clip text, transparent text fill; inline style merges the style prop over a starting `linear-gradient(color, color)`. Content is `children ?? text` — real text nodes, so screen readers and selection work.
- When glow > 0 the component appends an aria-hidden `<span class="shiny-text__glow">` holding the same content: absolutely positioned over the root (inset 0), background-clipped like the base, blurred 0.14em, pointer-events none, user-select none. Its opacity is set to the glow value every frame; its background is the same sweep gradient but with a fully transparent shine colour, so only a coloured halo travels with the band.
- Colours: the base and shine colours are parsed once per change through a shared offscreen canvas 2d context (fillStyle round-trip), so any CSS colour string the browser resolves works (hex, rgb(), hsl(), named). Blending is gamma-aware: channels mix in 2.2-power space with alpha weighting, so white shining over grey reads as light, not washed pastel.
- The sheen itself is a linear-gradient rebuilt on the fly each frame at `angle` degrees and written to backgroundImage. Stops: the band centre spans a core of half-width × (1 − softness) with soft edges filling the rest; up to 3 bands trail behind at 1.3 × shineWidth spacing, each 28% weaker; both ends of the gradient are pinned to the pure base colour. All stops are computed positions blended between base and shine, sorted by offset.

## Motion engine

- One engine per instance, mounted once; props flow in through a settings ref and a sync effect, so changing any option mid-flight applies live without restarting (a colour change recomputes the palette, disabling resets to the static gradient).
- The sheen position is a scalar in percent along the gradient axis. The travel extent beyond the element is shineWidth/2 + (bands − 1) × shineWidth × 1.3 + 2; "right" sweeps from −extent to 100 + extent, "left" the reverse. Sweep duration scales with distance: speed seconds × max(0.15, |to − from| / span), eased by the easing prop — linear, smooth (cosine) or snappy (quintic in-out).
- Phases: idle → sweep → wait (loop only, delay seconds between passes, driven by a self-sleeping setTimeout that only wakes the rAF loop when due) → sweep again. yoyo alternates the sweep direction on every pass.
- Triggers: "loop" (default) sweeps forever; "hover" plays one sweep per pointerenter; "view" plays one sweep the first time the element intersects the viewport (tracked with an IntersectionObserver that also pauses the wait timer while offscreen and wakes on return).
- followPointer: the pointer position is projected onto the gradient axis (via the angle) into the same percent space, and a spring (stiffness 220, damping 2√220) pulls the sheen toward it; on leave the sheen sweeps back to the nearest edge. Takes precedence over sweeps while inside.
- pauseOnHover: while hovered, sweep time freezes (the start timestamp advances with elapsed frames instead of wall time) and resumes on leave.
- disabled: the sheen parks off-element and the root falls back to the flat base-colour gradient.
- prefers-reduced-motion: reduce — automatic sweeps (loop, hover, view) are suppressed entirely; the pointer-follow spring still responds because it is direct manipulation.
- The rAF loop is self-sleeping: it runs only while a sweep or the pointer spring is moving, and timers take over during waits. Unmount cancels the frame, clears timers, disconnects the observer, removes the pointer listeners and drops the sync hook. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | - | The text to shine across; used when children are not passed. |
| children | ReactNode | - | Takes precedence over text. |
| color | string | "#b5b5b5" | Base colour of the text. |
| shineColor | string | "#ffffff" | Colour of the sweeping sheen. |
| speed | number | 2 | Seconds a full pass takes (floored at 0.1). |
| delay | number | 0 | Seconds between passes in loop mode. |
| angle | number | 120 | Gradient angle in degrees; also the axis for pointer following. |
| shineWidth | number | 40 | Width of the sheen in percent of the element, clamped 2–200. |
| softness | number | 0.8 | 0–1; how soft the band's edges are. |
| bands | number | 1 | Number of trailing bands, 1–3. |
| glow | number | 0 | 0–1; strength of the blurred glow layer that travels with the band. |
| direction | "left" \| "right" | "left" | Which way the sheen sweeps. |
| easing | "linear" \| "smooth" \| "snappy" | "smooth" | Easing of each sweep. |
| trigger | "loop" \| "hover" \| "view" | "loop" | When a sweep runs: forever, on pointer enter, or once on first view. |
| yoyo | boolean | false | Alternates sweep direction between passes. |
| followPointer | boolean | false | The sheen spring-follows the pointer instead of self-sweeping. |
| pauseOnHover | boolean | false | Freezes the sweep while the pointer is over the text. |
| disabled | boolean | false | Shows the flat base colour, no sheen. |
| className | string | "" | Extra class names for the span. |
| style | CSSProperties | - | Inline styles for the span. |

## Delivery & validation

- Deliver the complete content of ShinyText.jsx and ShinyText.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the sheen sweeps edge-to-edge seamlessly in both directions with no popping at the ends; base and shine colours blend as light (any CSS colour string, including rgb()/hsl()); softness widens the band's falloff, bands add weaker trailing bands at the right spacing; angle rotates the sweep axis and matches pointer projection; speed/delay map to wall time; yoyo alternates; loop repeats forever, hover plays once per enter, view plays once on first intersect; followPointer tracks the pointer with a smooth spring and parks on leave; pauseOnHover freezes and resumes; glow renders a blurred halo exactly over the band without affecting layout; disabled and reduced motion show the static text; changing props mid-flight applies without restart; the text remains selectable and screen-reader readable; unmount leaves no raf, timers, observers or listeners; same-page instances are independent; no overflow at 375 / 768 / 1440 wide.
