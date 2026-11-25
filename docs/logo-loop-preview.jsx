import { createRoot } from "react-dom/client";
import { LogoLoop } from "../src/react/index.js";

/* 独立预览 — 深色画布上三种姿态：默认直线巡航、带聚焦与指针透镜的波浪、
   微倾的 3D 环；条带可拖拽甩动，悬停暂停。 */

const BRANDS = [
  ["✦", "星澜", "#7dd3fc"],
  ["◐", "弦月", "#f0abfc"],
  ["⬢", "六角", "#86efac"],
  ["☀", "曜日", "#fcd34d"],
  ["❖", "方寸", "#fda4af"],
  ["≋", "波频", "#5eead4"],
  ["✺", "聚光", "#fdba74"],
];

const logos = BRANDS.map(([glyph, name, color]) => ({
  node: (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3em", fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>
      <span aria-hidden="true">{glyph}</span>
      {name}
    </span>
  ),
  title: name,
  hoverColor: color,
}));

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
      color: "#e4e4e7",
    }}
  >
    <div style={{ width: "min(100%, 820px)" }}>
      <LogoLoop logos={logos} speed={120} logoHeight={28} gap={40} ariaLabel="直线跑马灯" />
    </div>
    <div style={{ width: "min(100%, 820px)" }}>
      <LogoLoop logos={logos} speed={90} layout="wave" bend={0.55} focus={0.6} magnify={0.7} logoHeight={30} gap={44} ariaLabel="波浪跑马灯" />
    </div>
    <div style={{ width: "min(100%, 820px)" }}>
      <LogoLoop logos={logos} speed={70} layout="orbit" bend={0.4} tiltY={-14} logoHeight={30} gap={36} ariaLabel="环跑马灯" />
    </div>
  </div>,
);
