import { createRoot } from "react-dom/client";
import { GridMotion } from "../src/react/index.js";

/* The standalone preview — the flat drift wall, a 40° leaned-back 3D wall and
   a light mosaic; sweep the cursor to slide rows and light the pool. */
const ITEMS = ["✦", "雾", "◇", "纤维光雾层", "▲", "尘", "●", "网格扭曲显影", "✺", "浪", "■", "颗粒渐变流", "✧", "霜", "◈", "百叶聚光"];

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
      <GridMotion items={ITEMS} rows={4} speed={26} />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 320 }}>
      <GridMotion items={ITEMS} rows={5} tilt={40} angle={-14} speed={14} spotlight={0.75} dim={0.55} />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 280, background: "#e9e9ee" }}>
      <GridMotion items={ITEMS} theme="light" grayscale={true} speed={10} rows={3} />
    </div>
  </div>,
);
