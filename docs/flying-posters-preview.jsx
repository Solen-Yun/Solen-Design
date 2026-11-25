import { createRoot } from "react-dom/client";
import { FlyingPosters } from "../src/react/index.js";

/* The standalone preview — a slow auto-drifting column and a twin-column
   alternating wall on the dark canvas; drag or wheel them, click a poster. */

const items = [
  { image: "./assets/demo-photos/photo-01.jpg" },
  { image: "./assets/demo-photos/photo-02.jpg" },
  { image: "./assets/demo-photos/photo-03.jpg" },
  { image: "./assets/demo-photos/photo-04.jpg" },
  { image: "./assets/demo-photos/photo-05.jpg" },
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
    <div style={{ width: "100%", height: "46vh" }}>
      <FlyingPosters items={items} planeWidth={280} planeHeight={280} speed={1} distortion={4} shading={0.45} fade={0.3} radius={16} />
    </div>
    <div style={{ width: "100%", height: "42vh" }}>
      <FlyingPosters items={items} planeWidth={220} planeHeight={220} columns={2} speed={-1.4} axis="horizontal" rotation={160} distortion={6} lean={0.8} fade={0.4} radius={10} />
    </div>
  </div>,
);
