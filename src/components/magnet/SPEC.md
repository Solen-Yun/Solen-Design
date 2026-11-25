Implement the "Magnet" component from zero: a wrapper whose content eases toward the cursor whenever it comes near, then settles back with spring physics when it leaves — the classic magnetic button, with a shared pointer field so multiple magnets on one page never fight over the cursor, optional 3D tilt and scale, per-axis locking, a distance clamp, and a fully configurable spring. Everything is hand-rolled: no tween library, no external physics. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components.

## Structure & rendering

- Pure React, one file only: Magnet.jsx (entry, arbitration, spring solver). No stylesheet, no runtime dependencies, no iframe.
- The component renders two nested `<div>`s: a wrapper with position relative, display inline-block, the caller's wrapperClassName and style (merged after the defaults so it can override them), plus any extra props spread onto it; and an inner div with the caller's innerClassName and willChange: transform, holding the children. Only the inner div ever transforms — layout stays untouched, and the wrapper's rect is the anchor for all distance math.
- All animation state lives in refs and the mount effect runs once; a second effect runs after every render and just re-arbitrates and wakes the frame loop, so prop changes (padding, strength, axis, spring …) take effect on the next frame without remounting.

## Shared pointer field & arbitration

- A module-level field tracks one global pointer: window pointermove (passive; touch pointers are ignored) stores the raw client coordinates, window scroll (capture, passive) re-arbitrates, and pointerleave on the document element plus window blur clear the pointer and re-arbitrate. These listeners attach when the first Magnet mounts and detach when the last one unmounts; every instance registers an entry holding its wrapper, its settings ref, a reduced-motion flag and a wake function.
- Engagement distance: dx/dy from the wrapper's centre, and an "outside" distance = hypot(max(0, |dx| − width/2), max(0, |dy| − height/2)) — zero while the pointer is over the element, growing as it leaves the edges.
- Arbitration decides who reacts: each entry computes its outside distance against its own padding (and is skipped when disabled or reduced-motion). With exclusive on (default), only the single nearest entry — smallest outside distance, ties broken by centre distance — engages; ownership transfers wake both sides. With exclusive off, every magnet within its own padding reacts independently, and each one wakes while engaged or still settling.

## Pull target & spring physics

- Target solve (per frame): disengaged (target all zero, scale 1) when disabled, reduced-motion, no pointer, not the arbitration winner, or outside > padding. Otherwise pull = 1 − smoothstep(padding × 0.5, padding, outside) — full strength inside half the padding ring, easing to zero at its rim (padding 0 means always full pull). The offset target is (dx / magnetStrength × pull, dy / magnetStrength × pull) on the unlocked axes — higher magnetStrength values divide the offset down, so 1 follows strongly and 3 barely moves; axis "x"/"y" zeroes the other component. When maxOffset is set, the offset vector is clamped to that length.
- 3D extras: normalized pointer offsets nx, ny (clamped ±1 across the wrapper's half-extents) produce tiltX = −ny × tilt × pull and tiltY = nx × tilt × pull; the scale target is 1 + (scale − 1) × pull, so tilt and scale fade in with the same pull curve.
- Spring integration: each of x, y, tiltX, tiltY, scale integrates force = stiffness × (target − current) − damping × velocity, velocity += force / mass × dt, current += velocity × dt, in sub-steps of at most 1/120 s. Spring constants come from the spring prop (defaults stiffness 170, damping 16, mass 1; clamped to stiffness ≥ 1, damping ≥ 0, mass ≥ 0.01). Resting (every key within 0.05 of target and slower than 0.05, scale within 0.001) snaps current to target and zeroes velocities; the frame loop then sleeps until the next wake.
- Application: the inner div gets translate3d(x, y, 0), plus perspective(800px) rotateX/rotateY when tilt is nonzero, plus scale when it differs from 1. Engagement flips a data-magnet-active attribute on the wrapper and fires onActiveChange with the new state on every transition.
- prefers-reduced-motion: reduce disengages permanently — the element never moves, while everything else (attributes, callbacks) still works.
- Unmount: cancel the frame, remove the entry from the registry, clear ownership, and detach the global listeners when no instances remain. Multiple instances on one page share the field but keep independent springs.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode | - | The content that gets pulled. |
| padding | number | 100 | Attraction ring beyond the element's edges, in px; 0 restricts the pull to the element itself. |
| disabled | boolean | false | Turns the magnetism off entirely. |
| magnetStrength | number | 2 | How strongly the content follows: the cursor offset is divided by this; higher is weaker. |
| maxOffset | number | - | Length cap for the pull offset, in px. |
| exclusive | boolean | true | Only the nearest magnet reacts to the cursor; false lets every magnet within its padding pull. |
| axis | "both" \| "x" \| "y" | "both" | Which axes the pull applies to. |
| tilt | number | 0 | 3D tilt toward the cursor, in degrees. |
| scale | number | 1 | Extra scale at full pull (target = 1 + (scale − 1) × pull). |
| spring | { stiffness?: number; damping?: number; mass?: number } | - | Spring constants; defaults to stiffness 170, damping 16, mass 1. |
| onActiveChange | (active: boolean) => void | - | Called when engagement starts or ends. |
| wrapperClassName | string | "" | Class names for the wrapper div. |
| innerClassName | string | "" | Class names for the transforming inner div. |
| style | CSSProperties | - | Inline styles for the wrapper div. |
| ...rest | - | - | Any extra props spread onto the wrapper div. |

## Delivery & validation

- Deliver the complete content of Magnet.jsx plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: hovering within the padding ring pulls the content toward the cursor and it settles back with a spring on exit; pull strength follows magnetStrength and caps at maxOffset; axis locking holds one axis; tilt leans the face toward the cursor and scale grows with pull, both fading at the ring's rim; exclusive mode hands engagement to the closest magnet as the cursor moves between two of them, while exclusive false lets both react; data-magnet-active and onActiveChange track engagement exactly; spring constants visibly change the bounce; scrolling and window blur release every magnet; changing props re-solves without remount; prefers-reduced-motion keeps everything still; unmounting the last instance removes the global listeners; works over buttons, cards and icon clusters at 375 / 768 / 1440 wide.
