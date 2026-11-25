import { createRoot } from "react-dom/client";
import { Carousel } from "../src/react/index.js";

/* 独立预览 — 深色画布上摆三档姿态：五式里的倾斜与立方各一组、
   浅色平移一组；拖拽甩动、滚轮、方向键、圆点与页码都能试。 */


const cards = (palette) => [
  {
    image: "./assets/demo-photos/photo-01.jpg",
    title: "拂晓",
    description: "暖色渐变卡，底部压暗托住文字。",
    icon: "☀️",
  },
  {
    image: "./assets/demo-photos/photo-02.jpg",
    title: "远洋",
    description: "冷色渐变卡，配一枚毛玻璃角标。",
    icon: "🌊",
  },
  {
    image: "./assets/demo-photos/photo-03.jpg",
    title: "暮紫",
    description: "冷调中的亮斑让画面不至于发闷。",
    icon: "🔮",
  },
  {
    image: "./assets/demo-photos/photo-04.jpg",
    title: "苔原",
    description: "照片卡共享同一套文字排版。",
    icon: "🌿",
  },
  {
    image: "./assets/demo-photos/photo-05.jpg",
    title: "霞色",
    description: "任意 React 内容都能塞进卡片。",
    icon: "🌅",
  },
];

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
      padding: "48px 16px",
      boxSizing: "border-box",
    }}
  >
    <Carousel
      items={cards(["#f59e0b", "#7c2d12", "#0ea5e9", "#1e3a8a", "#8b5cf6", "#4c1d95"])}
      baseWidth={320}
      aspectRatio={1.3}
      effect="tilt"
      indicator="dots"
      arrows={true}
      theme="dark"
    />
    <Carousel
      items={cards(["#0ea5e9", "#1e3a8a", "#10b981", "#134e4a", "#f59e0b", "#7c2d12"])}
      baseWidth={280}
      aspectRatio={1.4}
      effect="cube"
      indicator="counter"
      theme="dark"
      initialIndex={1}
    />
    <Carousel
      items={cards(["#8b5cf6", "#4c1d95", "#fb7185", "#881337", "#0ea5e9", "#1e3a8a"])}
      baseWidth={280}
      aspectRatio={1.35}
      effect="slide"
      indicator="bars"
      theme="light"
      autoplay={true}
      pauseOnHover={true}
      initialIndex={2}
    />
  </div>,
);
