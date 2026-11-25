import { createRoot } from "react-dom/client";
import { CircularCarousel } from "../src/react/index.js";

/* 独立预览 — 深色画布上的三个环体姿态：漂移圆柱、双列环绕广告牌、
   竖向摩天轮；拖拽甩动看惯性吸附，点卡片看它转到正前方。 */


const items = [
  { src: "./assets/demo-photos/photo-01.jpg", alt: "暖色渐变图", title: "拂晓", subtitle: "暖调" },
  { src: "./assets/demo-photos/photo-02.jpg", alt: "冷色渐变图", title: "远洋", subtitle: "冷调" },
  { src: "./assets/demo-photos/photo-03.jpg", alt: "紫色渐变图", title: "暮紫", subtitle: "夜色" },
  { src: "./assets/demo-photos/photo-04.jpg", alt: "绿色渐变图", title: "苔原", subtitle: "植物" },
  { src: "./assets/demo-photos/photo-05.jpg", alt: "红色渐变图", title: "霞色", subtitle: "黄昏" },
  { src: "./assets/demo-photos/photo-06.jpg", alt: "黄色渐变图", title: "麦浪", subtitle: "田野" },
  { src: "./assets/demo-photos/photo-07.jpg", alt: "青色渐变图", title: "浅滩", subtitle: "水域" },
  { src: "./assets/demo-photos/photo-08.jpg", alt: "灰色渐变图", title: "雾岚", subtitle: "灰阶" },
];

const frame = {
  position: "relative",
  width: "min(760px, 100%)",
  height: 340,
};

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
      color: "#f4f4f5",
      padding: "48px 16px",
      boxSizing: "border-box",
    }}
  >
    <div style={frame}>
      <CircularCarousel items={items} preset="cylinder" intro="rise" cardWidth={200} captions={true} onChange={(index) => console.log(index)} />
    </div>
    <div style={frame}>
      <CircularCarousel items={items} preset="orbit" intro="spin" cardWidth={150} autoplay="off" onChange={(index) => console.log(index)} />
    </div>
    <div style={frame}>
      <CircularCarousel items={items} preset="wheel" intro="none" cardWidth={140} autoplay="off" onChange={(index) => console.log(index)} />
    </div>
  </div>,
);
