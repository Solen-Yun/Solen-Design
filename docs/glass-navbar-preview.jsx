import { createRoot } from "react-dom/client";
import { GlassNavbar } from "../src/react/index.js";

/* The standalone preview — the bar pinned to the window over a long fake
   page, so scrolling the page drives the shrink behavior for real. */
const rows = Array.from({ length: 14 }, (_, i) => ({
  height: [120, 180, 96, 220, 140, 84, 190, 110, 150, 96, 170, 130, 108, 160][i],
  tint: i % 2 === 0 ? "#1d1f27" : "#171921",
}));

createRoot(document.getElementById("root")).render(
  <div style={{ background: "#101014", minHeight: "100vh", colorScheme: "dark" }}>
    <GlassNavbar brand="Solenio" items={["首页", "产品", "解决方案", "文档", "博客", "关于"]} />
    <div style={{ padding: "24px 24px 48px", display: "grid", gap: 16, maxWidth: 760, margin: "0 auto" }}>
      {rows.map((row, i) => (
        <div key={i} style={{ height: row.height, borderRadius: 14, background: row.tint }} />
      ))}
    </div>
  </div>,
);
