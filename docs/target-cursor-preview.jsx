import { createRoot } from "react-dom/client";
import { TargetCursor } from "../src/react/index.js";

/* 独立预览 — 整页作用域的角框准星：游荡时旋转跟随，悬停按钮、链接
   与带标签的卡片看吸附、圆角贴合与标签浮出，点击看收紧。 */

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 30,
      background: "#101014",
      color: "#e4e4e7",
    }}
  >
    <h2 style={{ margin: 0, fontSize: 34, letterSpacing: "-0.03em" }}>Lock on target</h2>
    <div style={{ display: "flex", gap: 16 }}>
      {["部署", "预览", "回滚"].map((label) => (
        <button
          key={label}
          type="button"
          className="cursor-target"
          data-cursor-label={label}
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
        <a key={label} href="#" onClick={(event) => event.preventDefault()} className="cursor-target" style={{ color: "#a5b4fc", textDecoration: "none" }}>
          {label}
        </a>
      ))}
    </div>
    <div
      className="cursor-target"
      data-cursor-label="宽高自适应"
      style={{
        width: 330,
        padding: "16px 20px",
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.05)",
        fontSize: 14,
        lineHeight: 1.7,
      }}
    >
      角框吸到这张卡片上时圆角会贴合成 18px，宽度也随盒子拉开。
    </div>
    <TargetCursor />
  </div>,
);
