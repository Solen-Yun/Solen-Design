import { createRoot } from "react-dom/client";
import { Magnet } from "../src/react/index.js";

/* 独立预览 — 三种姿态：一排互斥仲裁的磁吸按钮、一张带 3D 倾斜与
   缩放的大卡片、一个只吸纵向的徽标；光标靠近即被拉过去，离开弹回。 */

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 52,
      background: "#101014",
      color: "#e4e4e7",
    }}
  >
    <h2 style={{ margin: 0, fontSize: 32, letterSpacing: "-0.03em" }}>Pull toward the cursor</h2>
    <div style={{ display: "flex", gap: 20 }}>
      {["部署", "预览", "回滚", "归档"].map((label) => (
        <Magnet key={label} padding={110} magnetStrength={2}>
          <button
            type="button"
            style={{
              padding: "12px 26px",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.22)",
              background: "rgba(255,255,255,0.06)",
              color: "#e4e4e7",
              fontSize: 15,
            }}
          >
            {label}
          </button>
        </Magnet>
      ))}
    </div>
    <Magnet padding={150} magnetStrength={2.4} tilt={10} scale={1.08} spring={{ stiffness: 140, damping: 12 }}>
      <div
        style={{
          width: 300,
          padding: "20px 24px",
          borderRadius: 18,
          border: "1px solid rgba(255,255,255,0.14)",
          background: "rgba(255,255,255,0.05)",
          fontSize: 14,
          lineHeight: 1.7,
        }}
      >
        大卡片也磁吸：倾斜面向光标，缩放随拉力淡入，换用更软的弹簧，回弹更悠长。
      </div>
    </Magnet>
    <Magnet padding={90} magnetStrength={1.6} axis="y">
      <div
        style={{
          padding: "9px 18px",
          borderRadius: 999,
          background: "rgba(165,180,252,0.16)",
          border: "1px solid rgba(165,180,252,0.4)",
          color: "#a5b4fc",
          fontSize: 13,
        }}
      >
        只吸纵向
      </div>
    </Magnet>
  </div>,
);
