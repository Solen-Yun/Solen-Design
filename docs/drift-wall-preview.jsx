import { createRoot } from "react-dom/client";
import { DriftWall } from "../src/react/index.js";

/* The standalone preview — one steep fast wall and one flat slow wall on
   the dark canvas; move the pointer to lean them, hover tiles to lift. */

const items = [
  { image: "./assets/demo-photos/photo-01.jpg", title: "海浪" },
  { image: "./assets/demo-photos/photo-02.jpg", title: "星球" },
  { image: "./assets/demo-photos/photo-03.jpg", title: "秋叶" },
  { image: "./assets/demo-photos/photo-04.jpg", title: "植物" },
  { image: "./assets/demo-photos/photo-05.jpg", title: "花朵" },
  { image: "./assets/demo-photos/photo-06.jpg", title: "山峦" },
  { image: "./assets/demo-photos/photo-07.jpg", title: "游鱼" },
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 24,
      background: "#101014",
    }}
  >
    <div style={{ width: "100%", height: "52vh" }}>
      <DriftWall items={items} columns={6} tilt={16} turn={-14} speed={48} dim={0.55} fade={0.6} />
    </div>
    <div style={{ width: "100%", height: "42vh" }}>
      <DriftWall items={items} columns={4} tilt={8} turn={6} roll={0} speed={24} direction="down" variance={0.7} grayscale={true} fade={0.45} />
    </div>
  </div>,
);
