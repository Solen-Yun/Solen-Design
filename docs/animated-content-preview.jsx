import { createRoot } from "react-dom/client";
import { AnimatedContent } from "../src/react/index.js";

/* 独立预览 — 深色画布上三种入场姿态：竖直滑入加模糊倾斜、水平反向加中心擦亮、
   子元素逐个 stagger；挂载即播，刷新页面重看。 */

const tile = (label, background) => (
  <div
    key={label}
    style={{
      width: 96,
      height: 120,
      borderRadius: 14,
      background,
      color: "#ffffff",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      paddingBottom: 12,
      fontSize: 14,
      letterSpacing: "0.08em",
    }}
  >
    {label}
  </div>
);

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
      color: "#e4e4e7",
    }}
  >
    <AnimatedContent trigger="mount" direction="vertical" distance={120} duration={1.1} blur={14} tilt={18}>
      <h2 style={{ margin: 0, fontSize: 44, letterSpacing: "-0.04em" }}>Scroll into motion</h2>
    </AnimatedContent>

    <AnimatedContent trigger="mount" direction="horizontal" reverse duration={1} wipe="center" initialOpacity={0}>
      <p style={{ margin: 0, maxWidth: 480, lineHeight: 1.7, fontSize: 15, opacity: 0.9 }}>
        滑入、模糊、缩放、倾斜与擦亮遮罩在一条时间线里完成；完成后内联变换被清除，元素回到干净的静态样式。
      </p>
    </AnimatedContent>

    <AnimatedContent trigger="mount" direction="vertical" reverse distance={80} stagger={0.14} duration={0.7}>
      {[tile("壹", "linear-gradient(135deg, #6366f1, #8b5cf6)"), tile("贰", "linear-gradient(135deg, #0ea5e9, #22d3ee)"), tile("叁", "linear-gradient(135deg, #f59e0b, #f97316)")]}
    </AnimatedContent>
  </div>,
);
