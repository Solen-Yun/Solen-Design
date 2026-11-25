import { createRoot } from "react-dom/client";
import { Silk } from "../src/react/index.js";

/* The standalone preview — two colourways of the satin on the dark
   canvas: the default mauve weave and a deep teal one. The light follows
   the cursor and clicks drop warp rings in both. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#101014",
    }}
  >
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <Silk speed={5} scale={1} color="#7B7481" sheenColor="#ffffff" />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 260 }}>
      <Silk speed={3} scale={1.6} rotation={0.6} color="#0f4f4a" sheenColor="#9ef0e4" depth={0.7} sheen={0.8} glow={0.5} variation={7} />
    </div>
  </div>,
);
