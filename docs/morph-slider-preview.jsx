import { createRoot } from "react-dom/client";
import { MorphSlider } from "../src/react/index.js";

/* The standalone preview — a melt slider and a swirl slider on the dark
   canvas; drag to scrub the morph, use the buttons, dots or arrow keys. */

const items = [
  { image: "./assets/demo-photos/photo-01.jpg", caption: "浪" },
  { image: "./assets/demo-photos/photo-02.jpg", caption: "轨" },
  { image: "./assets/demo-photos/photo-03.jpg", caption: "烬" },
  { image: "./assets/demo-photos/photo-04.jpg", caption: "苔" },
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 40,
      background: "#101014",
    }}
  >
    <div style={{ width: "min(760px, 92vw)", margin: "0 auto", height: "44vh" }}>
      <MorphSlider items={items} transition="melt" duration={1.1} radius={20} />
    </div>
    <div style={{ width: "min(560px, 86vw)", margin: "0 auto", height: "34vh" }}>
      <MorphSlider items={items} transition="swirl" duration={1.4} intensity={0.8} aberration={0.6} radius={14} showControls={false} />
    </div>
  </div>,
);
