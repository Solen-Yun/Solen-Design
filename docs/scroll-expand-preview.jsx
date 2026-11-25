import { createRoot } from "react-dom/client";
import { ScrollExpand } from "../src/react/index.js";

/* 独立预览 — 左侧一个内部滚动的完整展开流（标题中段退场、覆盖层
   全幅浮现），右侧一张钉在全幅的姿态卡；两组起始几何与圆角不同。 */


const dusk = "./assets/demo-photos/photo-01.jpg";
const night = "./assets/demo-photos/photo-02.jpg";

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      flexWrap: "wrap",
      background: "#101014",
      color: "#e4e4e7",
    }}
  >
    <ScrollExpand
      src={dusk}
      alt="暮色山景插画"
      title="山与雾"
      scrollHint="向下滚动展开"
      startWidth={46}
      startHeight={62}
      startRadius={28}
      mediaZoom={1.3}
      style={{ width: 380, height: 460, borderRadius: 20 }}
    >
      <strong style={{ fontSize: 22, letterSpacing: "-0.02em" }}>全幅之后</strong>
      <span style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 8 }}>覆盖层内容在全幅时浮现</span>
    </ScrollExpand>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
      <ScrollExpand
        src={night}
        alt="夜色山景插画"
        enabled={false}
        scrollDistance={0.001}
        holdDistance={0}
        overlayScrim={0.5}
        endRadius={28}
        style={{ width: 300, height: 220, borderRadius: 20 }}
      >
        <strong style={{ fontSize: 19, letterSpacing: "-0.02em" }}>钉在全幅的姿态</strong>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginTop: 6 }}>enabled=false 时进度恒为 1</span>
      </ScrollExpand>
      <span style={{ fontSize: 13, color: "rgba(228,228,231,0.55)" }}>左侧滚动看完整旅程 →</span>
    </div>
  </div>,
);
