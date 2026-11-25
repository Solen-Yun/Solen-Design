import { createRoot } from "react-dom/client";
import { default as MagicBento } from "../src/components/magic-bento/MagicBento.jsx";

/* 独立预览 — 深色画布上默认六卡网格：指针贴着网格巡游看边框流光，
   点卡片看光波扩散与卡内动画重播。 */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#101014",
      padding: "48px 24px",
    }}
  >
    <div style={{ width: "min(920px, 100%)" }}>
      <MagicBento glowColor="#c4b5fd" />
    </div>
  </div>,
);
