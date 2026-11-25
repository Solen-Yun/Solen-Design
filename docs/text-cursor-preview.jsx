import { createRoot } from "react-dom/client";
import { TextCursor } from "../src/react/index.js";

/* The standalone preview — the whole page is the trail area: emoji stamps
   up top, a word ribbon across the middle; sweep and watch both tails. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      background: "#101014",
    }}
  >
    <div style={{ flex: 1, position: "relative", color: "#fbbf24" }}>
      <TextCursor text="🌊" mode="stamp" spacing={64} maxPoints={10} fontSize={44} hideCursor />
    </div>
    <div style={{ flex: 1, position: "relative", color: "#e4e4e7" }}>
      <TextCursor text="FOLLOW THE RIBBON" mode="ribbon" spacing={20} fontSize={34} fade={0.5} />
    </div>
    <p
      style={{
        position: "absolute",
        bottom: 12,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "#52525b",
        fontSize: 14,
        letterSpacing: "0.1em",
        pointerEvents: "none",
      }}
    >
      上半页盖 emoji 章，下半页是弯折的丝带；停下来看橡皮擦收尾。
    </p>
  </div>,
);
