Implement the "ParticleText" component from zero: a block of text built out of thousands of drifting particles that assemble into the glyph shapes, scatter and reform on demand, repel from the pointer, burst on click, and breathe while idle. Particles heat up with motion and shift toward a highlight colour, and four intro choreographies (gather from all around, rain from above, spiral into the text, a scanning line that sweeps the shape into existence) bring the wordmark to life. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS + Canvas 2D, two files only: ParticleText.jsx (sampling, simulation, rendering) and ParticleText.css (layout). React >= 18; no runtime dependencies beyond React. No iframe.
- Root is a `<div class="particle-text">` — position relative, display block, width and height 100% of its container, min-height 240px, overflow hidden, touch-action pan-y, isolation isolate. Inside are an absolutely positioned full-size `<canvas>` (aria-hidden) and a visually hidden span with the plain text for screen readers.
- The engine lives in one mount effect. Live props reach it through a settings ref updated on every render followed by a wake() call, so prop changes apply without re-sampling unless the text, font or density actually changed.
- Text sampling: an offscreen canvas renders the text with the resolved font — a numeric fontSize is used in px, a CSS string is resolved by measuring a hidden probe span, and fontFamily "inherit" reads the container's computed family. If the measured text is wider than 92% of the container the font shrinks (floor 18px) until it fits. document.fonts.load + fonts.ready are awaited before measuring. Glyph coverage is sampled on a grid with step max(2, floor(density)) — cells with alpha > 40 become particle targets, centred in the container. A deterministic stride filter caps the population at clamp(area/90, 900, 5200) particles.
- Each particle carries deterministic pseudo-random values: a seed ((i × 9301 + 49297) mod 233280 / 233280), a depth in 0.45–1.35, a tone seeded from its x position, and the target pixel's alpha as weight. A build id invalidates stale async font loads.
- Colours: color and highlightColor resolve "currentColor"/"inherit" against the container's computed colour; both go through a 1px canvas probe into rgb. The palette is 12 tones lerped from base to highlight; the highlight rgb doubles as the glow colour.

## Simulation

- Frame loop with clamped dt (≤ 50ms). Particles chase their target with follow = 1 − 0.78^frames; the pointer position is smoothed at 1 − 0.82^frames. Every frame particles are bucketed into a 12-tone × 8-alpha matrix and drawn in buckets so fill-state changes batch: tone comes from motion heat — the distance between a particle and its target (3px deadzone, 36px range) maps to the palette — or from the fixed tone when highlightMode is "gradient"; alpha comes from intro progress with per-mode floors (gather 0, rain 0.55, spiral 0.45, scan 0.35), alpha = 0.35 + 0.65 × level/7.
- Shapes: "circle" draws arcs with radius modulated by alpha weight (0.75–1.2 × particleSize, floor 0.6); "square" draws fixed-size rects; "line" draws short strokes — each particle keeps an angle eased toward its velocity direction (rest angle −45°, wrap to the nearest half turn) and a length = restLength + min(restLength × 4, speed × 1.6) where restLength = max(2, particleSize × 0.8 + density × 0.7), with round caps and a stroke width of max(1, particleSize × 0.65).
- Intros, started on first sample (or on demand): "gather" scatters each particle at a random angle, distance scatter × (0.35 + depth × 0.75) plus jitter, easing in with cubic out; "rain" starts particles above the top edge (y = −12 − depth × 30 − seed × height × 0.22, small x offset by depth) with an ease-in fall and delays of seed × stagger × 1.3, travel time gatherDuration × (0.45 + depth × 0.3); "spiral" orbits particles in from radii around the text centre (aspect-clamped to 1–2.5), each with swirl 1.5–2.6 + radius term, easing with cubic in-out; "scan" holds particles hidden to the right of their target in a band extending 30% beyond the text bounds while an accent-coloured vertical line (1.5px wide, 9-stop vertical gradient fade, optional glow) sweeps left to right over max(200, gatherDuration × 0.8) ms, revealing each particle as the line passes its x. Gather/spiral travel over the full gatherDuration; scan over 40% of it. Delays spread with seed × stagger.
- Click burst: on pointerdown (when clickBurst is on and trigger is not "click") particles within radius = 90 + 70√burstStrength + repelRadius × 0.25 get an impulse of 950 × burstStrength × (0.2 + 0.8 × falloff²) × (0.65 + depth × 0.45) directed away from the click with ±0.45 rad of seed jitter. The offset then integrates through a spring (stiffness 18, damping 7.5) until displacement < 0.05px and velocity < 1, then zeroes.
- Pointer repel: while the pointer is over the canvas, particles within repelRadius are pushed outward with force (1 − d/r)² × pointerRepel. Idle drift: a sin/cos wander (frequencies 0.9 and 0.75, amplitude idleDrift × depth) plays continuously when idleDrift > 0.
- trigger "mount" runs the intro on first sample; "hover" restarts the intro on pointerenter; "click" restarts the intro on click (and suppresses the burst).

## Performance, a11y, lifecycle

- The raf loop is self-sleeping: it keeps running only while gathering, moving, repelling, drifting, bursting or the scan line is visible; otherwise it stops until an event wakes it. IntersectionObserver pauses everything offscreen. DPR is clamped to 2; the canvas bitmap matches the container box.
- Re-sampling triggers: text/fontSize/fontWeight/family/density change, or container resize (size key = width × height @ dpr). Theme changes (class/style/data-theme mutations on html/body, prefers-color-scheme) wake the loop so colours re-resolve; layout changes re-sample on the next frame.
- prefers-reduced-motion: travel time drops to 1 frame with zero scatter and zero delay, the scan line and glow fade stay off, burst and repel are disabled, and a live change event snaps all particles to their targets and stops the loop.
- Unmount disconnects both observers, the theme observer and media queries, removes all canvas listeners, cancels the raf and pending sample frame, and invalidates the build id. Multiple instances are independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "Solen" | The text the particles form. |
| particleSize | number | 2 | Base particle size in px. |
| density | number | 4 | Sampling grid step in px; lower is denser. |
| color | string | "currentColor" | Base particle colour; "currentColor" inherits the container's text colour. |
| highlightColor | string | "#ff5a36" | Highlight colour particles shift toward as they move; also the glow and scan-line colour. |
| highlightMode | "motion" \| "gradient" | "motion" | motion heats particles by displacement; gradient paints the fixed horizontal gradient. |
| shape | "circle" \| "square" \| "line" | "circle" | Particle shape; line draws motion-oriented strokes. |
| intro | "gather" \| "rain" \| "spiral" \| "scan" | "gather" | Intro choreography. |
| scatter | number | 180 | How far particles start from their targets in gather/spiral, in px. |
| gatherDuration | number | 1600 | Base travel time of the intro, in ms. |
| stagger | number | 420 | Random delay spread between particles, in ms. |
| clickBurst | boolean | true | Clicking blasts particles away; they spring back. |
| burstStrength | number | 1 | Burst power multiplier, 0 disables. |
| pointerRepel | number | 40 | How strongly particles flee the pointer, in px of push. |
| repelRadius | number | 120 | Pointer repulsion radius in px. |
| idleDrift | number | 0.7 | Idle breathing amplitude in px; 0 freezes. |
| trigger | "mount" \| "hover" \| "click" | "mount" | What restarts the intro after the first assembly. |
| fontSize | number \| string | "clamp(3rem, 12vw, 8rem)" | Font size for measuring the glyphs; shrinks to fit 92% width. |
| fontWeight | number | 800 | Font weight used for measuring. |
| fontFamily | string | "inherit" | Font family; "inherit" reads the container. |
| glow | boolean | true | Adds a blurred highlight glow behind lit particles. |
| className | string | "" | Extra class names for the root div. |
| style | CSSProperties | - | Inline styles for the root div. |

## Delivery & validation

- Deliver the complete content of ParticleText.jsx and ParticleText.css plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the text assembles from particles in all four intros — gather, rain, spiral and the scan line whose sweep reveals the shape left to right; changing text, font props, density or container size re-samples without leaking particles; clicking bursts and the spring settles cleanly; the pointer carves a hole through the glyphs; idle drift breathes and everything sleeps when offscreen or settled; motion heat tints moving particles toward the highlight, gradient mode paints a fixed ramp; circle / square / line shapes render and the line shape orients with motion; color "currentColor" follows the container colour and highlightColor drives palette, glow and scan line; reduced motion shows the text immediately with no scatter, burst or repel; unmount leaves no raf, observers or listeners; same-page instances are independent; 375 / 768 / 1440 wide without overflow and the headline never exceeds the container.
