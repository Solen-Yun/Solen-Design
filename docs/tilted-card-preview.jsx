import { createRoot } from "react-dom/client";
import { default as TiltedCard, TiltedCardLayer } from "../src/components/tilted-card/TiltedCard.jsx";

/* 独立预览 — 深色画布上两张姿态：左卡默认跟随指针、点击翻面；
   右卡开窗口追踪加漂浮，指针在页面任意处都会驱动。 */
const FACE = "./assets/wallpaper-03.jpg";

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 64,
      background: "#101014",
    }}
  >
    <TiltedCard
      imageSrc={FACE}
      altText="夜景插画"
      captionText="点一下翻面"
      containerWidth={280}
      containerHeight={220}
      imageWidth={280}
      imageHeight={220}
      radius={16}
      backContent={
        <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#1c1c22" }}>
          <span style={{ color: "#f4f4f5", fontSize: 14, opacity: 0.7 }}>背面</span>
        </div>
      }
    >
      <TiltedCardLayer depth={40} style={{ display: "flex", alignItems: "flex-end", padding: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#ffffff", textShadow: "0 1px 6px rgba(0,0,0,0.6)" }}>跟随指针</span>
      </TiltedCardLayer>
    </TiltedCard>
    <TiltedCard
      imageSrc={FACE}
      altText="夜景插画"
      captionText="窗口追踪 + 漂浮"
      containerWidth={220}
      containerHeight={176}
      imageWidth={220}
      imageHeight={176}
      radius={14}
      trackWindow
      floating
      rotateAmplitude={10}
    />
  </div>,
);
