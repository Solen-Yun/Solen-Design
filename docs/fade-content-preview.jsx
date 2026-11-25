import { createRoot } from "react-dom/client";
import { FadeContent } from "../src/react/index.js";

/* 独立预览 — 深色画布上三种揭示姿态：对焦显影的大标题、雾化显影的照片块、
   像素块溶解加子项 stagger；挂载即播，刷新页面重看。 */

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 64,
      background: "#101014",
      color: "#e4e4e7",
    }}
  >
    <FadeContent trigger="mount" effect="focus" duration={1.4} blur={6}>
      <h2 style={{ margin: 0, fontSize: 44, letterSpacing: "-0.04em" }}>Develop into focus</h2>
    </FadeContent>

    <FadeContent trigger="mount" effect="mist" duration={1.6} delay={0.4}>
      <div style={{ width: 320, height: 190, borderRadius: 16, background: "linear-gradient(160deg, #38bdf8, #1d4ed8 55%, #172554)", boxShadow: "0 20px 60px rgba(0,0,0,0.45)" }} />
    </FadeContent>

    <FadeContent trigger="mount" effect="pixel" duration={1.2} delay={0.9} stagger={0.16} initialOpacity={0.15}>
      {[
        { key: "壹", background: "linear-gradient(160deg, #fbbf24, #f97316)" },
        { key: "贰", background: "linear-gradient(160deg, #a3e635, #15803d)" },
        { key: "叁", background: "linear-gradient(160deg, #ec4899, #be185d)" },
      ].map((tile) => (
        <div
          key={tile.key}
          style={{
            width: 88,
            height: 112,
            borderRadius: 12,
            background: tile.background,
            color: "#ffffff",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 10,
            fontSize: 14,
          }}
        >
          {tile.key}
        </div>
      ))}
    </FadeContent>
  </div>,
);
