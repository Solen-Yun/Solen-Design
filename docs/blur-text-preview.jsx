import { createRoot } from "react-dom/client";
import { BlurText } from "../src/react/index.js";

/* 独立预览——三种聚焦姿态：默认模糊上入、单字翻转居中错峰、漂移循环；
   大标题逐词聚焦，小注依次收拢。 */

const line = { width: "min(720px, 92vw)", color: "#fafafa" };

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
    }}
  >
    <div style={{ ...line, fontSize: 44, fontWeight: 800 }}>
      <BlurText text="Soft focus resolves into crisp type" delay={160} effect="blur" direction="top" blur={12} distance={60} />
    </div>
    <div style={{ ...line, fontSize: 26, fontWeight: 600, opacity: 0.9 }}>
      <BlurText text="tilt every character into place" delay={60} animateBy="characters" effect="tilt" direction="left" blur={6} distance={34} staggerFrom="center" />
    </div>
    <div style={{ ...line, fontSize: 20, fontWeight: 500, opacity: 0.65 }}>
      <BlurText text="loop it forever, out and back in" delay={90} effect="drift" direction="right" blur={8} distance={44} loop={true} loopDelay={2.4} />
    </div>
  </div>,
);
