import { createRoot } from "react-dom/client";
import { ShinyText } from "../src/react/index.js";

/* The standalone preview — a chrome headline with trailing bands and glow,
   a quiet body line, and a pointer-following sheen; move the mouse over the
   third line to steer the light. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 56,
      background: "#101014",
      colorScheme: "dark",
    }}
  >
    <ShinyText
      text="LIGHT SWEEPS ACROSS"
      color="#8f8fa3"
      shineColor="#ffffff"
      speed={3}
      bands={2}
      glow={0.5}
      style={{ fontSize: 52, fontWeight: 800, letterSpacing: "0.06em" }}
    />
    <ShinyText
      text="一道柔光周期性扫过这行字"
      color="#52525b"
      shineColor="#e4e4e7"
      speed={4.5}
      delay={1}
      style={{ fontSize: 22, fontWeight: 500, letterSpacing: "0.12em" }}
    />
    <ShinyText
      text="跟着指针走 FOLLOW THE POINTER"
      color="#3f3f46"
      shineColor="#7dd3fc"
      speed={2.5}
      shineWidth={30}
      followPointer={true}
      yoyo={false}
      trigger="loop"
      style={{ fontSize: 26, fontWeight: 700, letterSpacing: "0.08em" }}
    />
  </div>,
);
