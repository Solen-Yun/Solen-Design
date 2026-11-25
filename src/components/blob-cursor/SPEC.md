Implement the "BlobCursor" component from zero: a liquid-metal blob that chases the cursor. It is a single continuous body of goo — a rounded head stretched by motion, an elastic tail it drags behind it, droplets it sheds and sucks back in — rendered as a true 3D surface (a heightfield dome with real depth and shading) in four finishes: chrome, jelly, pearl or flat ink. Hovering interactive elements swells it; clicking bursts it into droplets that regroup. Full specification follows; it must not depend on external pages, videos, images, font files, or off-the-shelf effect components beyond the declared 3D dependency.

## Structure & rendering

- React + CSS + a single declared dependency, three@^0.180.0, used strictly through its public API (WebGLRenderer, Scene, OrthographicCamera, MeshPhysicalMaterial with onBeforeCompile shader patching, InstancedMesh, VSM shadow map, PMREM environment from its procedurally generated room environment). Two files only: BlobCursor.jsx and BlobCursor.css. No other dependency; no iframe. If WebGL is unavailable the component renders nothing.
- Root is a `<div class="blob-cursor">` (plus any className, inline style): position absolute, inset 0, overflow hidden, pointer-events none — an overlay that fills its positioned host. The renderer's canvas (class blob-cursor-canvas, aria-hidden, block, 100% x 100%) is appended into it. Renderer: alpha true, premultipliedAlpha true, antialias true, clear color transparent, sRGB output, ACES filmic tone mapping (exposure 1), pixel ratio min(devicePixelRatio, 2).
- Scene: an orthographic camera looking down -Z (frustum = host size in px), a PMREM-baked indoor room environment rotated (-0.9, 0.35, 0) for reflections, one directional key light (intensity 1.4) with a 2048 VSM shadow map (radius 14, 20 blur samples) aimed perpendicular to the host, and a ground plane with a ShadowMaterial at opacity 0.22 (visible only when shadow is on).
- The blob is a single 1x1 plane mesh, scaled each frame to the bounding box of the goo and positioned at its centre; droplets are a separate InstancedMesh of 96 spheres (32x24), scaled to ellipsoids along their velocity. Blob and droplets both cast shadows; the blob's custom depth material runs the same SDF test so shadows follow the goo silhouette.

## The goo field (shader)

- The blob's material patches in an SDF field evaluated per fragment: up to 48 parts, merged by polynomial smooth-min. Parts come in three groups: 8 head circles (radius ~0.7 x body radius, blend 0.6 x radius) whose offsets and sizes sculpt the blob's silhouette; a trail tube of capsule segments (up to 16) reparametrised along the tail's arc length with thickness tapering from head to tip; and free/merging droplets with their own radii and blend strengths that shrink to 0 as they merge in. The head group and the tube merge through an extra joint blend (0.2–0.6 x radius by goo).
- The surface is not flat: from the 2D distance field the shader ray-marches the dome height in 8 secant steps (dome depth up to blobTop, scaled by depth 0.3–1), writes gl_FragDepth from the height (true 3D relief, correct against the droplets), and builds the normal from the height gradient (divided by lift) feeding the standard PBR lighting. Edges are antialiased with fwidth; fragments outside the field discard.
- Materials: "chrome" — metalness 1, roughness 0.3→0.04 by shine, envMapIntensity 0.9→1.3; "jelly" — roughness 0.5→0.18, clearcoat 1 (0.25→0.02 roughness), envMapIntensity 0.5→0.9; "pearl" — metalness 0.35, roughness 0.4→0.1, clearcoat 1, iridescence 1 (IOR 1.75, thickness 240–820nm), envMapIntensity 1.15; "ink" — flat unlit MeshBasicMaterial in the colour. Tint = the color prop (invalid strings fall back to white).
- The root's mixBlendMode is set to the blend prop: normal / difference / exclusion / multiply / screen / overlay.

## Simulation

- Pointer tracking on window (pointermove passive, pointerdown/up/cancel, pointerout to the void, window blur). Touch drags count as pointer moves only while pressed. The anchor is a spring chasing the pointer (stiffness 1200→160 by lag, damping 0.9 x critical); 8 core balls spring toward offsets sculpted around the anchor (core stiffness 900→260 by lag, bounce damping 0.95→0.4 by wobble); a 16-link chain trails behind with stiff links (30000→1500 by stretch, damping 2*sqrt(k) x 0.95→0.65 by wobble). All bodies integrate in 240Hz sub-steps.
- Morph: when morph > 0 the core targets deform continuously — a 2-lobe bend (cos(2(angle - bendAngle))) and a 3-lobe fold whose angles precess over time at morphSpeed (clock advances 4 x morphSpeed^1.5 per second); the silhouette squashes by the strain it accumulates. morph 0 is a clean round blob.
- Swell: a spring on the body radius — hovering an interactive element (a, button, input, select, textarea, label, summary, [role="button"], [data-blob-grow]) targets 1.3x, resting 1x, pressed 0.86x, released 1x; pressing adds -2 impulse, releasing +1.2; wobble lowers the damping so it sloshes.
- Mass & droplets: the blob carries a volume (mass). Click burst: core balls get a random radial kick (4–9 x radius, scaled by wobble), and if splash is on, splashCount droplets fly outward in a ring (speed 320–1600 by splashSpeed, radius 0.12–0.42 x body by splashSize, slight angle jitter, inheriting a fraction of the anchor velocity); the blob's mass drops by the droplets' volume (clamped so it keeps at least 20%) with a 0.28s wait before regrowth. Drip (drip > 0): when the cursor rushes (speed above 600px/s), small droplets (0.07–0.17 x body) shed from the tail tip, each subtracting its volume. Droplets fly with drag 0.6, gravity splashGravity * 2200, live 30s max (drips 2.5–4s), despawn outside the host; when a droplet touches the core or tail (and it is not still opening) it starts sinking: it pulls toward the anchor over 0.14s, transfers its volume back into the mass, and kicks the core with its momentum. Mass regrows toward 1 at rate 0.9–6 by regrow. Droplet volume maps to radius by cube root, so the blob visibly slims and fattens.
- Merging: droplets still near the body (within release = radius + blend) render as SDF parts blending into the blob with strength eased by distance; free droplets far away render as stretched spheres (elongation by speed, capped 1.6, squashed volume-preserving on the other axes, stretched toward their velocity).
- prefers-reduced-motion: no burst, no drip, no morph clock; the anchor's spring stiffens to 2400 so the blob rides the pointer almost directly, still stretching and squishing on contact.
- The frame loop sleeps after 0.4s of calm (all velocities and mass deltas below thresholds and no breathing morph); it wakes on any pointer event, resize, prop change or unmount-time cleanup. Same-page instances are independent.

## Interaction & lifecycle

- hideCursor (default true) sets the host parent's cursor to none, restoring the previous value on change/unmount. Hover detection reads event.target.closest each move.
- ResizeObserver triggers a pending re-size of camera frustum, shadow frustum and ground plane on the next frame. Unmount: cancel the frame, restore the cursor, disconnect observers, remove listeners, dispose geometries, materials, environment and renderer, and remove the canvas. All settings apply live through a ref (materials rebuilt in place).

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| material | "chrome" \| "jelly" \| "pearl" \| "ink" | "chrome" | Surface finish of the blob and droplets. |
| color | string | "#3B82F6" | Base colour (invalid values fall back to white). |
| size | number | 140 | Body diameter in px, 12–400. |
| morph | number | 0 | How far the silhouette breathes into lobes, 0–1. |
| morphSpeed | number | 0.4 | Tempo of the morphing, 0–1. |
| depth | number | 1 | Dome height of the 3D surface, 0–1. |
| trail | number | 16 | Elastic tail segments, 0–16. |
| lag | number | 0.55 | How lazily the blob chases the pointer, 0–1. |
| goo | number | 1 | How readily parts melt together (blend radii), 0–1. |
| stretch | number | 0.6 | Link softness of the tail, 0–1. |
| wobble | number | 1 | Slosh and bounce on contacts, 0–1. |
| drip | number | 0 | Droplets shed at high cursor speed, 0–1. |
| splash | boolean | true | Clicking bursts droplets out of the blob. |
| splashCount | number | 6 | Droplets per burst, 1–32. |
| splashSpeed | number | 0.5 | Burst speed, 0–1. |
| splashSize | number | 0.5 | Droplet size, 0–1. |
| splashGravity | number | 0 | Downward pull on airborne droplets, 0–1. |
| regrow | number | 0.5 | How fast lost volume regrows, 0–1. |
| shine | number | 1 | Polish of the reflective finishes, 0–1. |
| shadow | boolean | false | Casts a soft shadow onto a ground plane. |
| blend | string | "normal" | Root mix-blend-mode: normal / difference / exclusion / multiply / screen / overlay. |
| hideCursor | boolean | true | Hides the host's native cursor. |
| className | string | "" | Extra class names for the root. |
| style | CSSProperties | - | Inline styles for the root. |

## Delivery & validation

- Deliver the complete content of BlobCursor.jsx and BlobCursor.css plus install steps (including the 3D dependency) and the usage example; no ellipses, no "fill in the core yourself" placeholders.
- Validate: the blob rides the pointer with a lagging elastic tail that snaps back; fast movement stretches and fattens it, stops slosh it; clicking bursts droplets that slim the body, fly, fall or merge back and the volume regrows; hovering buttons swells it; drip sheds droplets at speed; material finishes chrome/jelly/pearl/ink all render distinctly; morph adds living lobes without breaking the silhouette; goo from 0 to 1 changes how bead-like the parts read; shadow casts a soft blob-shaped shadow; blend modes composite over varied backdrops; reduced motion keeps a stiff but still squishy follower with no bursts; the loop sleeps when calm; unmount restores the cursor and releases every GPU object; multiple hosts run independently; 375 / 768 / 1440 wide hosts without overflow.
