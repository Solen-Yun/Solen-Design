import { createRoot } from "react-dom/client";
import { StarBorder } from "../src/react/index.js";

/* 独立预览 — 深色画布上三种姿态：默认巡航药丸、反向增亮的描边卡片、
   常开星光星尘的多星按钮；悬停看加圈，点击看双向光脉冲。 */

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 44,
      background: "#101014",
    }}
  >
    <StarBorder theme="dark" color="#ffffff" duration={4} radius={999} hover="lap" clickPulse={true}>
      默认药丸
    </StarBorder>
    <StarBorder
      as="div"
      theme="dark"
      color="#7dd3fc"
      trailColor="#38bdf8"
      duration={6}
      radius={20}
      stars={2}
      glow={0.9}
      hover="brighten"
      style={{ padding: "22px 28px", maxWidth: 420, fontSize: 13, lineHeight: 1.7, color: "#e4e4e7" }}
    >
      逆时针双星卡片：方向取反、光晕拉满，悬停整体增亮。
    </StarBorder>
    <StarBorder theme="dark" color="#fde68a" duration={3} stars={3} sparkle={true} glow={0.8} radius={999} hover="none">
      三星光尘按钮
    </StarBorder>
  </div>,
);
