import { createRoot } from "react-dom/client";
import { BlobCursor } from "../src/react/index.js";

/* 液态金属光标：上方的铬面液珠追着光标跑、点击爆出液滴再聚拢；
   下方珍珠虹彩一档带投影和更懒的迟滞，悬停按钮看液珠膨胀。 */
createRoot(document.getElementById("root")).render(
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: 40, background: "#101014" }}>
    <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
      <BlobCursor color="#cfe4ff" size={150} trail={16} />
    </div>
    <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
      <BlobCursor material="pearl" color="#ffd9ec" size={110} trail={8} lag={0.7} shadow={true} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 24, gap: 12 }}>
        <div className="view-tabs"><button type="button">膨胀我</button></div>
        <div className="view-tabs"><button type="button">也膨胀</button></div>
      </div>
    </div>
  </div>,
);
