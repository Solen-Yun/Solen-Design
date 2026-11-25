import { createRoot } from "react-dom/client";
import { ElectricBorder } from "../src/react/index.js";

/* 电弧边框：上方青色电流框住一张卡片；中间紫色高锯齿 + 双色辉光；
   下方亮色主题的墨线渲染，配一张浅色卡片。 */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 56,
      background: "#101014",
    }}
  >
    <ElectricBorder color="#7df9ff" glowColor="#7df9ff" borderRadius={24} style={{ width: 340 }}>
      <div style={{ borderRadius: 24, padding: "40px 32px", background: "#17171d", textAlign: "center" }}>
        <p style={{ margin: 0, color: "#f4f4f5", fontSize: 15, fontWeight: 700, letterSpacing: 2 }}>HIGH VOLTAGE</p>
      </div>
    </ElectricBorder>
    <ElectricBorder color="#c084fc" glowColor="#f0abfc" chaos={1.2} spread={1} strands={4} arcs={2} flicker={0.8} borderRadius={16} style={{ width: 300 }} intro={false}>
      <div style={{ borderRadius: 16, padding: "32px 28px", background: "#17171d", textAlign: "center" }}>
        <p style={{ margin: 0, color: "#e4e4e7", fontSize: 14 }}>CHAOS MODE</p>
      </div>
    </ElectricBorder>
    <div style={{ background: "#f4f4f5", padding: 24, borderRadius: 28 }}>
      <ElectricBorder theme="light" color="#27272a" glowColor="#7df9ff" borderRadius={20} style={{ width: 280 }} intro={false}>
        <div style={{ borderRadius: 20, padding: "30px 26px", background: "#ffffff", textAlign: "center" }}>
          <p style={{ margin: 0, color: "#18181b", fontSize: 14, fontWeight: 700 }}>LIGHT INK</p>
        </div>
      </ElectricBorder>
    </div>
  </div>,
);
