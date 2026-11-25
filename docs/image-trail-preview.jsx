import { createRoot } from "react-dom/client";
import { ImageTrail } from "../src/react/index.js";

/* 独立预览 — 整页拖尾：旋转、大小浮动与惯性漂移全开，随意画圈
   看六张内联画作沿路径轮播投放，离场时顺方向滑行淡出。 */


const items = [
  "./assets/demo-photos/photo-01.jpg",
  "./assets/demo-photos/photo-02.jpg",
  "./assets/demo-photos/photo-03.jpg",
  "./assets/demo-photos/photo-04.jpg",
  "./assets/demo-photos/photo-05.jpg",
  "./assets/demo-photos/photo-06.jpg",
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#101014",
      color: "#e4e4e7",
      overflow: "hidden",
    }}
  >
    <div style={{ textAlign: "center", pointerEvents: "none" }}>
      <h2 style={{ margin: 0, fontSize: 40, letterSpacing: "-0.03em" }}>Draw with images</h2>
      <p style={{ margin: "10px 0 0", fontSize: 15, color: "rgba(228,228,231,0.6)" }}>移动鼠标，画作沿路径轮播投放</p>
    </div>
    <div style={{ position: "absolute", inset: 0 }}>
      <ImageTrail
        items={items}
        size={190}
        threshold={90}
        lifetime={0.55}
        rotation={12}
        sizeVariance={0.6}
        drift={0.5}
        tilt={6}
        zoom={1.15}
        flash={0.25}
      />
    </div>
  </div>,
);
