import { createRoot } from "react-dom/client";
import { RotatingText } from "../src/react/index.js";

/* The standalone preview — three poses on the dark canvas: the plain
   slide rotator, the violet flip marker, and a centre-staggered scale
   rotator with blurred entries. */
const SHARED = { fontSize: 44, fontWeight: 800, color: "#f4f4f5" };

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 64,
      background: "#101014",
    }}
  >
    <RotatingText
      texts={["设计更快的界面", "Solen Design", "动效即语言"]}
      effect="slide"
      rotationInterval={2200}
      {...SHARED}
    />
    <RotatingText
      texts={["更快", "更轻", "更准"]}
      effect="flip"
      highlight
      highlightColor="#a855f7"
      rotationInterval={1800}
      style={{ fontSize: 44, fontWeight: 800 }}
    />
    <RotatingText
      texts={["CREATE", "SHIP", "ITERATE"]}
      effect="scale"
      direction="down"
      staggerFrom="center"
      staggerDuration={0.04}
      blur={4}
      rotationInterval={2000}
      {...SHARED}
    />
  </div>,
);
