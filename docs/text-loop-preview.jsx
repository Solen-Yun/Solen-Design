import { createRoot } from "react-dom/client";
import { TextLoop } from "../src/react/index.js";

/* The standalone preview — a tilted ribbon wave with a crossing tape, a
   circle ring, and an outlined line with edge fading; drag and scroll to
   feel the fling and the boost. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      background: "#101014",
      colorScheme: "dark",
    }}
  >
    <div style={{ width: "100%", color: "#e4e4e7" }}>
      <TextLoop
        text="Solen Design"
        shape="wave"
        speed={90}
        curviness={120}
        tilt={-4}
        fontSize={44}
        cross={true}
        crossAngle={18}
        draggable={true}
        scrollBoost={2}
      />
    </div>
    <div style={{ width: 420, color: "#e4e4e7" }}>
      <TextLoop
        text="滚动的圆环 LOOP"
        shape="circle"
        speed={70}
        fontSize={40}
        ribbonColor="#2f6bff"
        ribbonWidth={70}
        draggable={true}
      />
    </div>
    <div style={{ width: "100%", color: "#e4e4e7" }}>
      <TextLoop
        text="Outline Edge Fade"
        shape="line"
        speed={110}
        fontSize={46}
        ribbon={false}
        outline={true}
        edgeFade={0.5}
        draggable={true}
        scrollBoost={2}
      />
    </div>
  </div>,
);
