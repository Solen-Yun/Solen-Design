Implement the "EchoText" component from zero: a display text where a stack of ghosted copies trails behind the words — on entrance the ghosts converge from a directional smear into the single word, and afterwards they follow the pointer, drift on their own, shear against scrolling, or burst out of a click, always dissolving back into stillness. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React + CSS, two files only: EchoText.jsx (entry, echo state, frame loop) and EchoText.css (all styles). React >= 18; no runtime dependencies. No iframe. File starts with a `'use client'` directive.
- Root is an inline-block `<span>` (class echo-text plus className) with white-space nowrap, line-height 0.9, letter-spacing −0.04em, user-select none, layout/style containment, normal font kerning and geometric text rendering. Inline styles: fontSize, fontWeight, color, and cursor: pointer when click bursts are available. style merges last.
- Children, in paint order: N ghost copies (class echo-text__echo, absolutely positioned inset 0, pointer-events none, aria-hidden, each carrying data-echo-index counting down from echoCount to 1, initial opacity 0), a burst layer (class echo-text__bursts, absolute inset 0, pointer-events none), and the front copy (echo-text__echo echo-text__echo--front, position relative, z-index 2, permanent opacity 1) which is the accessible text.
- The ghost count is the echoes prop clamped to 0–24 and forced to 0 when the user prefers reduced motion (preference tracked live through a matchMedia change listener).
- Ghost colour: when echoColors is a non-empty array the colours interpolate across that ramp with `color-mix(in srgb, last N%, first)` where N is the echo's depth ratio; otherwise each ghost mixes the tint prop into the inherited colour at 18% + 5% per echo, capped at 72%. The outline style (echoStyle "outline") renders transparent fill with a max(1px, 0.014em) currentColor stroke. Each ghost's blur is fixed at blur × index/echoCount px (0 disables).
- Per-echo scale grows with depth: 1 + (echoScale − 1) × depth.

## Motion engine

- A requestAnimationFrame loop drives per-frame positions for the front copy and every ghost: each frame, echo i eases toward its desired offset with rate 0.34 / (1 + i × lag × 4.2) — deeper echoes trail further behind, shaped by the lag prop (clamped 0.02–0.5). Rates are normalised against a clamped frame delta, so motion is framerate-independent. Echoes also carry a slower "bend" channel (rate scaled by depth and lag) used for velocity shear. Every frame the loop computes the largest remaining gap and an activity level (max of entrance remainder, separation ratio, pointer movement, drift and pointer speed, smoothed); each ghost's opacity is fade^index × activity (fade clamped 0.1–0.95), so ghosts emerge when things move and dissolve when settled. The loop self-sleeps when nothing is moving and no bursts are alive; pointer, scroll and click events wake it.
- Entrance (mode "entrance" or "both"): the front copy and every ghost start displaced by offset × (index + 0.35) along the direction vector — right {1,0}, left {−1,0}, up {0,−1}, down {0,1}, diagonal {0.72,0.72} — so the front copy travels the shortest distance and the deepest ghost the longest, and all converge to rest over duration ms using the ease prop (linear, cubic ease-out, cubic ease-in-out, or a quintic "snappy"). Only ghosts blur and fade; the front copy always stays at full opacity.
- Pointer trail (mode "pointer" or "both", trail "pointer", hover-capable pointer only): a window pointermove maps the cursor's distance from the text centre to a reach of cursorRadius (clamped 40–1200); the follow target is the unit direction × reach × offset (vertical component damped ×0.72), and every copy including the front chases it — the front with the tightest lag, ghosts progressively looser. pointer-out resets the target to rest. pointermove is passive; pointerout with no relatedTarget recentres.
- Autonomous drift (trail "auto"): when the pointer is away (never hovered, outside cursorRadius, or idle for more than 2.6 s) a drift level blends toward 1 and each echo rides a sine wave with a 7.2 s period — x = sin(phase − index × spacing) × swing, y = sin × cos × 1.3 × swing, spacing = 0.12 + lag × 1.1, swing = offset × drift × (0.25 + 0.75 × depth) — producing a lazy undulating smear; when the pointer comes near, drift blends back to 0 and the ghosts resume following. An IntersectionObserver pauses the drift while the text is off-screen.
- Scroll trail (trail "scroll"): a captured passive scroll listener tracks per-target scroll positions of the document and every ancestor element; accumulated deltas (negated) become a push velocity that smooths per frame, and echoes bend against it (shift clamped to ±offset × 4, applied stronger on deeper echoes) so fast scrolling smears the word opposite the scroll direction.
- Click burst (clickBurst): each click spawns 3–6 clones (echoCount/3 + 2, clamped) sampled across the echo depths, cloned from live ghost nodes with the burst origin as their transform-origin at the click point; over 1.1 s each clone scales up by 0.34 × burstReach (burstReach = offset/36, clamped 0.35–2.5) with an 80 ms stagger between copies, its opacity peaking at 0.75 × fade^(depth/2) and decaying with a (1 − progress)^1.5 curve. Clones remove themselves when dead; at most 4 bursts live at once.
- The offset prop clamps to 0–120 px and scales the entrance smear, pointer reach and drift swing; the duration clamps to ≥ 0.
- Reduced motion: no ghosts render at all, the loop never starts, and the CSS media query also hides echo copies and pins the front copy's transform — the component collapses to plain text.
- Unmount: the frame cancels, listeners (pointermove, pointerout, scroll with capture, click) remove, the observer disconnects and all burst clones remove. Same-page instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| text | string | "Motion Echo" | The text the echoes repeat. |
| echoes | number | 12 | Number of ghost copies, 0–24. |
| lag | number | 0.24 | How much deeper echoes trail, 0.02–0.5. |
| offset | number | 36 | Trail reach in px, 0–120. |
| direction | "right" \| "left" \| "up" \| "down" \| "diagonal" | "right" | Which way the entrance smear points. |
| fade | number | 0.72 | Opacity falloff per echo, 0.1–0.95. |
| blur | number | 3 | Maximum blur of the deepest echo in px, 0–16. |
| tint | string | "#7dd3fc" | Ghost colour mixed into the inherited ink. |
| echoColors | string[] | - | Colour ramp interpolating from first to last across the echo stack. |
| echoStyle | "solid" \| "outline" | "solid" | Solid ghost fill or stroke-only ghosts. |
| echoScale | number | 1 | Scale growth toward the deepest echo, 0.25–2.5. |
| mode | "entrance" \| "pointer" \| "both" | "both" | Entrance converge only, pointer trail only, or both. |
| trail | "pointer" \| "auto" \| "scroll" | "pointer" | What drives the ghosts after the entrance: cursor, autonomous drift, or scrolling. |
| clickBurst | boolean | true | Clicks pop a burst of expanding ghost clones. |
| cursorRadius | number | 320 | Pointer influence radius in px, 40–1200. |
| duration | number | 900 | Entrance converge duration in ms. |
| ease | "linear" \| "ease-out" \| "ease-in-out" \| "snappy" | "ease-out" | Entrance easing curve. |
| fontSize | string | "clamp(3rem, 9vw, 7rem)" | Font size of the text. |
| fontWeight | number | 800 | Font weight of the text. |
| color | string | "currentColor" | Ink of the front copy; ghosts mix tint into it. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of EchoText.jsx and EchoText.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: ghosts converge from every direction on entrance and settle to a single word; pointer trail lags progressively with depth and recentres on leave; autonomous drift undulates and hands back control when the pointer approaches; scroll smears opposite the scroll direction and recovers; click bursts pop from the click point, stack up to 4 and clean up their clones; echoColors ramps while plain tint mixes by depth; outline ghosts stroke instead of fill; echoes, lag, offset, fade, blur and echoScale all take effect; ghost opacity collapses to 0 when everything rests and the loop sleeps; reduced motion renders plain text with no ghosts; the front text stays the accessible content; unmount leaves no loop, listeners or clones; same-page instances are independent; no horizontal overflow at 375 / 768 / 1440 wide.
