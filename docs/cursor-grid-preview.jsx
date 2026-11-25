import { createRoot } from "react-dom/client";
import { CursorGrid } from "../src/react/index.js";

/* 独立预览 — 深色画布上三种网格姿态：默认实线网格叠标题、圆角瓦片加间隙、
   圆点网格加环境闪烁；移动光标点亮格子并点击发波。 */

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      background: "#101014",
    }}
  >
    <div style={{ width: "min(100%, 1100px)", height: "34vh" }}>
      <CursorGrid cellSize={56}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", color: "#e4e4e7", fontSize: 34, letterSpacing: "-0.02em" }}>
          Cells wake behind the cursor
        </div>
      </CursorGrid>
    </div>
    <div style={{ width: "min(100%, 1100px)", height: "30vh" }}>
      <CursorGrid cellSize={64} cellRadius={10} cellGap={6} fillOpacity={0.1} spotlight={0.35} />
    </div>
    <div style={{ width: "min(100%, 1100px)", height: "26vh" }}>
      <CursorGrid cellSize={44} gridStyle="dots" ambient={0.35} spotlight={0.8} gridOpacity={0.16} />
    </div>
  </div>,
);
