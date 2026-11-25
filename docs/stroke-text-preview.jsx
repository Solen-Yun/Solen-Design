import { createRoot } from "react-dom/client";
import { StrokeText } from "../src/react/index.js";

/* The standalone preview — three poses on the dark canvas: the hero wipe
   with a lifting shadow, the dotted ants ring, and the hover-replay one. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 72,
      background: "#101014",
      color: "#f4f4f5",
    }}
  >
    <div style={{ width: "min(880px, 92vw)" }}>
      <StrokeText text="Draw Attention" fontSize={120} trigger="mount" shadow />
    </div>
    <div style={{ width: "min(720px, 92vw)", color: "#a1a1aa" }}>
      <StrokeText text="MARCHING OUTLINE" fontSize={64} strokeColor="#67E8F9" strokeStyle="dotted" dashLength={12} marching fillMode="none" />
    </div>
    <div style={{ width: "min(640px, 92vw)", color: "#e4e4e7" }}>
      <StrokeText text="Hover to redraw" fontSize={56} strokeColor="#F0ABFC" trigger="hover" hoverRedraw />
    </div>
    <p style={{ color: "#52525b", fontSize: 14, letterSpacing: "0.1em", textAlign: "center" }}>
      中间一条沿轮廓跑蚂蚁线；下面一条悬停重描。
    </p>
  </div>,
);
