Implement the "ImageTrail" component from zero: a full-container cursor trail that drops one image after another along the mouse's path — each image appears at the pointer with a slight lag, drifts with the motion, and fades out, cycling through the provided picture list. One shared component exposes several built-in looks through its options: random rotation or rotation aligned to the motion direction, size variance, an inner zoom-and-flash reveal, 3D tilt toward the pointer, momentum drift, and a stacking mode where the newest N images stay pinned while older ones retire. Animation is timeline-based, driven by a tween library. Full specification follows; it must not depend on external pages, font files, or off-the-shelf effect components.

## Structure & rendering

- React 18+ with a tween engine dependency (gsap ^3.13.0, used through its public timeline/tween utils). Two files: ImageTrail.jsx (entry, trail engine) and ImageTrail.css (styles). No iframe.
- Root is a `<div>` with class content plus any className: width 100%, height 100%, position relative, z-index 100, border-radius 8px, background transparent, overflow visible; when tilt > 0 the root also gets perspective: 1000px so the 3D rotations read correctly.
- One `<div class content__img data-trail-image>` per item URL, in list order: absolute at top 0 left 0, width var(--trail-size) (default 190px, numbers become px), aspect-ratio var(--trail-aspect) (default 1.1), border-radius var(--trail-radius) (default 15px), opacity 0, overflow hidden, pointer-events none, will-change transform and filter. Inside each is `<div class content__img-inner>` carrying style backgroundImage: url(item): background-size cover, background-position 50% 50%, width and height calc(100% + 20px), positioned at −10px top and left — the inner layer is oversized so cover-cropping and rotation never reveal empty seams at the frame edges.
- The images are absolutely positioned but never visible at rest; the engine animates their transform (x, y, scale, rotation, rotationX, rotationY), zIndex and opacity. Layout is untouched: the root can sit over or under anything.

## Input & spawning

- The container listens for mousemove and (passive) touchmove; the pointer position is stored relative to the container box (touches use the first touch). The very first event only seeds the trackers — nothing spawns for the initial sighting.
- A rAF loop runs while the smoothed position is catching up: each frame the smoothed point lerps toward the raw pointer at rate 0.1, and when the raw pointer has moved more than threshold px (straight-line distance) from the last spawn point, the next image spawns and the last-spawn point resets. The loop re-arms itself until the smoothed point is within 0.5px of the pointer, then sleeps until the next pointer event.
- prefers-reduced-motion: reduce suppresses spawning entirely — the trail stays empty and the loop only lerps the smoothed point.
- Spawns cycle the items round-robin in list order (index + 1 modulo total); re-spawning an image that is still visible kills its running tweens first so it restarts cleanly. Changing the items array identity tears down and rebuilds the whole engine.

## Image lifecycle (one timeline per spawn)

- Per spawn: delta = raw pointer − last spawn point; motion angle = atan2 of the delta in degrees. Random scale factor = 1 + random(−0.5, 0.6) × sizeVariance. Tilt targets: rotationX = −(pointerY − containerH/2) / (containerH/2) × tilt, rotationY = (pointerX − containerW/2) / (containerW/2) × tilt, so the card faces the pointer. A monotonically increasing zIndex counter layers each new image above the previous ones.
- Rotation: from = random(−rotation, rotation) and to = from × 0.4 by default; with alignToMotion the card instead starts at the previous motion angle and eases to the new one, normalized to within ±180° of the start so it always turns the short way, and the previous angle is stored for the next spawn.
- Entrance tween on the frame element: from opacity 1, scale appearScale × scale, x/y = smoothed point − half size, rotation from, rotationX/Y at half tilt; to scale, x/y = raw pointer − half size + delta × 0.6 × drift, rotation to, full tilt. Duration 0.9 s ease power2 when drift > 0, else 0.4 s ease power1.
- Inner reveal tween, only when zoom ≠ 1 or flash > 0: from scale zoom and filter brightness(1 + flash × 1.5) to scale 1 and brightness(1) over 0.5 s ease power1 — each image starts zoomed-in and bright, then relaxes.
- Exit, stacking mode (stack > 0): the newest keep = max(1, min(round(stack), total − 1)) images stay visible; every older visible image retires — 0.4 s ease power4 to opacity 0 and scale exitScale — and the timeline's completion bookkeeping resets the zIndex counter once nothing is visible.
- Exit, default mode (stack = 0): after lifetime seconds the image fades out over 0.4 s (ease expo when drift > 0, else power3) to opacity 0 and scale exitScale × scale; when drift > 0 a second tween runs alongside for 1.5 s ease power4, pushing x and y further along the motion delta by drift × 1.2 — the card keeps gliding the way the cursor was moving as it dissolves.
- Unmount: cancel the rAF loop, remove both listeners, and kill every tween on all frames and inners. Instances are fully independent.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | string[] | [] | Image URLs cycled round-robin as the trail spawns. |
| size | number \| string | 190 | Frame width in px; numbers become px. |
| aspectRatio | number | 1.1 | Frame aspect ratio (width / height). |
| radius | number \| string | 15 | Frame corner radius; numbers become px. |
| threshold | number | 80 | Pointer travel in px required between two spawns. |
| lifetime | number | 0.4 | Seconds an image stays before fading out (default mode). |
| appearScale | number | 1 | Scale an image starts at before easing to its final size. |
| zoom | number | 1 | Inner image starting zoom; > 1 starts cropped-in and relaxes. |
| flash | number | 0 | Starting brightness boost of the inner image (1 + flash × 1.5). |
| exitScale | number | 0.2 | Scale images shrink to as they fade out. |
| drift | number | 0 | Momentum along the pointer direction; > 0 lengthens the entrance and adds a glide on exit. |
| rotation | number | 0 | Random rotation range in degrees applied on spawn. |
| sizeVariance | number | 0 | Random per-spawn scale variance, 0–1. |
| alignToMotion | boolean | false | Rotate images to match the pointer's motion direction. |
| stack | number | 0 | Keep the newest N images visible and retire older ones; 0 uses the lifetime fade. |
| tilt | number | 0 | 3D tilt in degrees toward the pointer. |
| className | string | "" | Extra class names for the container. |

## Delivery & validation

- Deliver the complete content of ImageTrail.jsx and ImageTrail.css plus install steps and the usage example; no ellipses, no "fill in the core yourself" placeholders. Dependency: gsap ^3.13.0 (public API only; the trail logic lives in the delivered files).
- Validate: moving the mouse in straight lines and circles spawns images along the path at the threshold spacing, cycling through every provided image; fast wiggles never resurrect a half-faded image mid-tween (old tweens are killed); rotation / alignToMotion / sizeVariance / zoom+flash / tilt / drift each visibly change the look; stack keeps exactly N images and retires the rest, while stack 0 fades each image after lifetime; touch moves spawn too; prefers-reduced-motion keeps the trail empty without errors; resizing the container keeps coordinates aligned; swapping items rebuilds the trail; unmount leaves no rAF loop or live tweens; the container itself never intercepts pointer interaction (images are pointer-events none); 375 / 768 / 1440 wide without overflow.
