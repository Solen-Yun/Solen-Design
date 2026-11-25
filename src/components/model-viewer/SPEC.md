Implement the "ModelViewer" component from zero: a product-style 3D model viewer that loads a GLTF/GLB, FBX or OBJ model, auto-frames it, and presents it floating over a soft contact shadow — drag to spin with inertia, pinch or ctrl-wheel to zoom, hover tilts it toward the cursor, it auto-rotates when idle, and it rises into place on mount. Built on React Three Fiber + drei + three, single file ModelViewer.jsx (all styling is inline; no css file). The model itself is the only external asset; everything else is generated in code.

## Structure & rendering

- Root is a `<div>` (plus className) with position relative and the width/height props as pixel size. Inside is a React Three Fiber `<Canvas>`: frameloop "demand" (renders only when invalidated — the loop stops whenever nothing moves), dpr clamped [1, 2], a 30° FOV perspective camera, antialias on, alpha on, preserveDrawingBuffer on (so the canvas can be screenshotted). Canvas touch-action is pan-y and the cursor is grab when drag rotation is on. Until the model has loaded, the canvas sits at opacity 0 and fades in over 0.6s (unless intro is "none", which shows it immediately).
- Format dispatch is by URL extension (query string stripped, case-insensitive): .fbx uses an FBX loader, .obj an OBJ loader, anything else a GLTF/GLB loader (with Draco and meshopt decode enabled). The loaded scene is deep-cloned so the same URL can be mounted twice, and a per-object WeakMap caches the measurements so re-mounts don't re-measure.
- Auto-framing: a bounding box of the model yields its extent, centre and radius; the model is scaled so its largest dimension spans exactly 2 units, re-centred at the origin, and wrapped in four nested groups: place (screen-space offset), float (intro rise + idle bob + grow), tilt (hover tilt, applied before spin) and spin (pitch/yaw in YXZ order).
- Camera: distance = radius / (fit × tan(FOV/2) × min(1, aspect)), divided by zoom; near/far are distance/50 and distance×50, always looking at the origin, so any model — whatever its original size — is framed by the `fit` prop (0.05+; smaller fits looser). offsetX/offsetY shift the model in fractions of the visible half-height (aspect-aware for x).
- Lighting: a white directional light (intensity 0.6, upper-front) plus a drei `Environment` HDR preset at environmentIntensity; environment "none" disables the HDRI entirely. Tone mapping is neutral with the `exposure` prop. When the environment preset prop changes, the previously loaded preset stays mounted as the Suspense fallback until the new one finishes loading, so the model never flashes black.
- Shadow: a soft contact shadow rendered just below the model's lowest point (−0.08 gap), opacity `shadowOpacity`, scale 4× model radius, blur 2.6, 512px resolution, black.

## Motion & interaction

- Drag rotate: pointerdown (primary button for mouse) captures the pointer and zeroes spin inertia; moves add yaw (and pitch, when turntable is off) at 0.0065 rad/px, feeding a blended velocity (40% old + 60% recent, time-normalized). On release the velocity keeps integrating with exponential decay (rate 4.5/s); pitch is clamped to ±65°. If the press lasted over 80ms without movement the velocity is zeroed (no accidental fling). In turntable mode pitch always springs back toward the `tilt` prop at rate 4.
- Zoom: two-finger pinch multiplies the zoom goal by the pinch distance ratio; ctrl/⌘-wheel multiplies it by exp(−deltaY·0.01); both clamp to [minZoom, maxZoom] (props auto-sorted) and the actual zoom eases toward the goal at rate 8. Plain wheel scrolling is never captured.
- Hover tilt: mouse/pen position maps to −1..1 and sets a tilt goal (x-axis ±hoverTilt·0.6 by vertical, y-axis ±hoverTilt by horizontal), eased at rate 6, returning to zero when the pointer leaves.
- Auto-rotate: after `autoRotateDelay` seconds without interaction, spin speed eases toward `autoRotateSpeed` (rate 2) and yaw advances; any pointer/wheel input resets the idle timer and the speed eases back to 0.
- Double-click (when resetOnDoubleClick): yaw eases back to startAngle plus the nearest whole number of extra turns (so it unwinds instead of spinning backwards), pitch returns to the `tilt` prop, zoom returns to 1, rate 7.
- Intro: "rise" animates the float group from 0.45 units below with a scale 0.9→1 and a −0.5 rad twist over 1.3s (cubic ease-out); "spin" keeps the height and adds a −1.2π yaw twist instead; "none" skips everything. A `reduced-motion` media query forces intro off, freezes the idle bob and disables auto-rotate.
- Idle float: when float > 0 the model bobs sinusoidally (period ≈ 4.8s, amplitude float·0.06).
- Frame economy: because the canvas is demand-driven, a render is requested only while the intro plays, a drag or reset is active, velocities/zoom/tilt are settling, spin speed is non-zero, or auto-rotate/float are enabled and motion is allowed — plus every pointer/wheel event and an IntersectionObserver wake when the viewer scrolls back into view (rendering is skipped entirely while off-screen).
- Callbacks & ref: onModelLoaded fires the first time each model object is staged; the imperative ref exposes `capture(type = "image/png")` returning the current canvas as a data URL. Changing `url` resets the ready state and re-fades the canvas.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| url | string | - | Model URL; format picked from the extension (.glb/.gltf/.fbx/.obj). |
| width | number | 400 | Viewer width in px. |
| height | number | 400 | Viewer height in px. |
| environment | "studio" \| "city" \| "sunset" \| "dawn" \| "night" \| "warehouse" \| "forest" \| "apartment" \| "park" \| "lobby" \| "none" | "studio" | HDRI environment preset; "none" uses lights only. |
| environmentIntensity | number | 1 | Brightness of the HDRI. |
| exposure | number | 1 | Tone-mapping exposure. |
| autoRotate | boolean | true | Slowly spins the model when idle. |
| autoRotateSpeed | number | 0.4 | Idle spin speed, rad/s. |
| autoRotateDelay | number | 2 | Seconds of inactivity before the spin starts. |
| dragRotate | boolean | true | Drag to orbit. |
| turntable | boolean | false | Locks pitch to the tilt value and only yaws. |
| zoom | boolean | true | Pinch / ctrl-wheel zoom. |
| minZoom | number | 0.7 | Lower zoom bound. |
| maxZoom | number | 2 | Upper zoom bound. |
| hoverTilt | number | 0.15 | How far the model leans toward the cursor, rad. |
| float | number | 0.3 | Idle floating bob amplitude, 0 disables. |
| shadow | boolean | true | Renders the soft contact shadow. |
| shadowOpacity | number | 0.45 | Contact shadow opacity. |
| intro | "rise" \| "spin" \| "none" | "rise" | Entrance animation. |
| startAngle | number | -30 | Initial yaw in degrees. |
| tilt | number | 10 | Initial (or turntable) pitch in degrees. |
| offsetX | number | 0 | Horizontal shift in half-view fractions. |
| offsetY | number | 0 | Vertical shift in half-view fractions. |
| fit | number | 0.8 | How much of the frame the model fills; smaller is looser. |
| resetOnDoubleClick | boolean | true | Double-click returns to the start pose. |
| className | string | "" | Extra class names for the container. |
| style | CSSProperties | - | Inline styles for the container. |
| onModelLoaded | () => void | - | Called once when the model is staged. |

Ref: `capture(type?)` returns the current frame as a data URL.

## Delivery & validation

- Deliver the complete content of ModelViewer.jsx plus install steps and a usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: a .glb/.gltf/.fbx/.obj URL loads, is framed by `fit` regardless of source scale, and the canvas fades in; drag orbits with fling inertia and pitch clamps at ±65°; turntable mode recentres pitch; pinch and ctrl-wheel zoom stay within min/max and plain scroll passes through; hover tilt follows and eases back; idle spin starts after the delay and stops on interaction; double-click unwinds yaw to the start angle without a long rewind; intro rise/spin/none all render; shadow tracks the model's footprint; environment none/presets switch without a black flash; demand rendering stops when settled and pauses off-screen; reduced motion skips intro, bob and auto-rotate; capture() returns an image; unmount leaves no listeners or observers.
