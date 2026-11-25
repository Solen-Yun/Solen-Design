import { createRoot } from "react-dom/client";
import { GridDistortion } from "../src/react/index.js";

/* The standalone preview — one inline dusk artwork in three moods: blocky
   drag, liquid smear with chroma fringe, and a fine swirl grid. */
const SCENE = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="640">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#2b1a4e"/>
      <stop offset="0.45" stop-color="#7c3aed"/>
      <stop offset="0.78" stop-color="#f472b6"/>
      <stop offset="1" stop-color="#fde68a"/>
    </linearGradient>
    <radialGradient id="sun" cx="0.68" cy="0.32" r="0.28">
      <stop offset="0" stop-color="#fff7ed"/>
      <stop offset="0.55" stop-color="#fdba74" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#fdba74" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="960" height="640" fill="url(#sky)"/>
  <rect width="960" height="640" fill="url(#sun)"/>
  <circle cx="653" cy="205" r="74" fill="#fff7ed"/>
  <path d="M0 470 L240 380 L430 452 L620 368 L810 448 L960 400 L960 640 L0 640 Z" fill="#1e1040" opacity="0.85"/>
  <path d="M0 540 L200 480 L420 540 L640 472 L840 536 L960 500 L960 640 L0 640 Z" fill="#120a28"/>
</svg>`,
);
const IMAGE = `./assets/demo-photos/photo-01.jpg`;

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      background: "#101014",
    }}
  >
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 280 }}>
      <GridDistortion imageSrc={IMAGE} grid={14} mode="drag" strength={0.18} />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 280 }}>
      <GridDistortion imageSrc={IMAGE} grid={26} mode="push" softness={0.85} chroma={0.8} strength={0.22} />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 280 }}>
      <GridDistortion imageSrc={IMAGE} grid={40} mode="swirl" radius={0.12} strength={0.2} idle={0.5} />
    </div>
  </div>,
);
