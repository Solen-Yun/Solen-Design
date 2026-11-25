import { createRoot } from "react-dom/client";
import { DepthCarousel } from "../src/react/index.js";

/* 独立预览 — 深色画布上摆三种姿态：默认向右轨道、向左镜像加自动播放、
   窄卡浅景深变体；拖拽甩动看惯性吸附，方向键与圆点都能聚焦。 */


const items = [
  { image: "./assets/demo-photos/photo-01.jpg", alt: "拂晓" },
  { image: "./assets/demo-photos/photo-02.jpg", alt: "远洋" },
  { image: "./assets/demo-photos/photo-03.jpg", alt: "暮紫" },
  { image: "./assets/demo-photos/photo-04.jpg", alt: "苔原" },
  { image: "./assets/demo-photos/photo-05.jpg", alt: "霞色" },
  { image: "./assets/demo-photos/photo-06.jpg", alt: "麦浪" },
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 32,
      background: "#101014",
    }}
  >
    <div style={{ width: "100%", height: 420 }}>
      <DepthCarousel items={items} duration={700} />
    </div>
    <div style={{ width: "100%", height: 340 }}>
      <DepthCarousel
        items={items}
        cardWidth={240}
        cardHeight={300}
        tiltDirection="left"
        depth={300}
        autoplay={true}
        autoplayDelay={2600}
        falloff={0.3}
        duration={600}
      />
    </div>
    <div style={{ width: "100%", height: 260 }}>
      <DepthCarousel
        items={items}
        cardWidth={170}
        cardHeight={215}
        radius={10}
        depth={150}
        spread={50}
        tilt={14}
        visibleCards={5}
        falloff={0.16}
        blur={3}
        showControls={false}
      />
    </div>
  </div>,
);
