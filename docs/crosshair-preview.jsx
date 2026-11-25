import { createRoot } from "react-dom/client";
import { Crosshair } from "../src/react/index.js";

/* 独立预览 — 全窗瞄准十字：移动光标看坐标标签与跟随滞后，
   悬停按钮和链接看角框锁定与宽 × 高测量，点击激起脉冲。 */

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 28,
      background: "#101014",
      color: "#e4e4e7",
    }}
  >
    <h2 style={{ margin: 0, fontSize: 34, letterSpacing: "-0.03em" }}>Lock onto the target</h2>
    <div style={{ display: "flex", gap: 16 }}>
      {["部署", "预览", "回滚"].map((label) => (
        <button
          key={label}
          type="button"
          style={{
            padding: "12px 28px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.22)",
            background: "rgba(255,255,255,0.06)",
            color: "#e4e4e7",
            fontSize: 15,
          }}
        >
          {label}
        </button>
      ))}
    </div>
    <div style={{ display: "flex", gap: 22, fontSize: 15 }}>
      {["文档", "更新日志", "状态"].map((label) => (
        <a key={label} href="#" onClick={(event) => event.preventDefault()} style={{ color: "#a5b4fc", textDecoration: "none" }}>
          {label}
        </a>
      ))}
    </div>
    <div
      data-crosshair-target
      style={{
        width: 320,
        padding: "16px 20px",
        borderRadius: 14,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.05)",
        fontSize: 14,
        lineHeight: 1.7,
      }}
    >
      带 data-crosshair-target 的卡片同样可被锁定。
    </div>
    <Crosshair color="#ffffff" targetEffect="lock" clickPulse={true} />
  </div>,
);
