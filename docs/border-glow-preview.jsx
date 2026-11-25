import { createRoot } from "react-dom/client";
import { default as BorderGlow } from "../src/components/border-glow/BorderGlow.jsx";

/* 独立预览 — 深色画布上两张卡：左卡等指针来点亮，右卡开自动扫边；
   绕着边框移动指针，看光锥转向与外圈辉光。 */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      background: "#0a0810",
    }}
  >
    <BorderGlow backgroundColor="#120F17" style={{ width: 320, padding: 24 }}>
      <h3 style={{ margin: 0, fontSize: 16, color: "#f4f4f5" }}>指向性辉光边框</h3>
      <p style={{ margin: "10px 0 0", fontSize: 13, lineHeight: 1.5, color: "#f4f4f5", opacity: 0.65 }}>
        把指针贴到边框附近，光锥会朝你转过来。
      </p>
    </BorderGlow>
    <BorderGlow
      backgroundColor="#120F17"
      glowColor="190 85 70"
      colors={["#34d399", "#22d3ee", "#818cf8"]}
      animated
      style={{ width: 260, height: 200, padding: 20 }}
    >
      <p style={{ margin: 0, fontSize: 13, color: "#f4f4f5", opacity: 0.65 }}>自动扫边</p>
    </BorderGlow>
  </div>,
);
