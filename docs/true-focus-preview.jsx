import { createRoot } from "react-dom/client";
import { TrueFocus } from "../src/react/index.js";

/* The standalone preview — the bracket viewfinder walking a long sentence,
   and a highlight-style line below with a spring feel; both auto-advance. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 80,
      background: "#101014",
      color: "#f4f4f5",
    }}
  >
    <div style={{ width: "min(760px, 92vw)", display: "flex", justifyContent: "center" }}>
      <TrueFocus sentence="True Focus walks word by word" blurAmount={6} borderColor="#22c55e" />
    </div>
    <div style={{ width: "min(680px, 92vw)", display: "flex", justifyContent: "center" }}>
      <TrueFocus sentence="Soft highlight mode" focusStyle="highlight" easing="spring" animationDuration={0.4} pauseBetweenAnimations={0.8} />
    </div>
    <p style={{ color: "#52525b", fontSize: 14, letterSpacing: "0.1em", textAlign: "center" }}>
      上面一行括号取景；下面一行高亮色块配弹簧手感。
    </p>
  </div>,
);
