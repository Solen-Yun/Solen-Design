import { createRoot } from "react-dom/client";
import { GradualBlur } from "../src/react/index.js";

/* 独立预览 — 左边一个底部模糊的迷你滚动窗（滚到尽头自动隐去），
   右边一张顶部化进底色、带色彩罩的卡片。 */

const rows = ["晨雾漫过山谷", "一线天光落在檐角", "风把云推成细浪", "湖面收下整片暮色", "灯火在雾里慢下来", "夜色合上最后一页"];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 56,
      flexWrap: "wrap",
      background: "#101014",
      color: "#e4e4e7",
    }}
  >
    <div style={{ position: "relative", width: 300, height: 380, borderRadius: 16, overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)" }}>
      <div style={{ position: "absolute", inset: 0, overflowY: "auto", background: "#18181b", scrollbarWidth: "none" }}>
        {rows.map((text, index) => (
          <p key={text} style={{ margin: 0, padding: "20px 22px", fontSize: 15, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
            <span style={{ color: "rgba(228,228,231,0.45)", marginRight: 10 }}>{String(index + 1).padStart(2, "0")}</span>
            {text}
          </p>
        ))}
      </div>
      <GradualBlur position="bottom" target="parent" height="5rem" strength={2.4} layers={10} curve="bezier" autoHide={true} />
    </div>
    <div style={{ position: "relative", width: 300, height: 380, borderRadius: 16, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(165deg, #fbbf24 0%, #ea580c 45%, #431407 100%)",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          color: "#fff7ed",
          fontSize: 15,
          letterSpacing: "0.08em",
          paddingBottom: 26,
        }}
      >
        顶端雾化 · 色彩罩
      </div>
      <GradualBlur position="top" target="parent" height="6.5rem" strength={3.2} layers={12} curve="ease-out" tint="#0c0a09" hoverIntensity={1.8} />
    </div>
  </div>,
);
