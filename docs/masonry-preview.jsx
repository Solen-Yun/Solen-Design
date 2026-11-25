import { createRoot } from "react-dom/client";
import { Masonry } from "../src/react/index.js";

/* The standalone preview — two grids on the dark canvas: a wide
   bounce-heavy grid and a tighter tilted one; drag tiles, click to zoom. */

const items = [
  { id: "a", img: "./assets/demo-photos/photo-01.jpg", alt: "海浪", title: "海浪", width: 800, height: 1000 },
  { id: "b", img: "./assets/demo-photos/photo-02.jpg", alt: "星球", title: "星球", width: 800, height: 560 },
  { id: "c", img: "./assets/demo-photos/photo-03.jpg", alt: "秋叶", title: "秋叶", width: 800, height: 800 },
  { id: "d", img: "./assets/demo-photos/photo-04.jpg", alt: "植物", title: "植物", width: 800, height: 640 },
  { id: "e", img: "./assets/demo-photos/photo-05.jpg", alt: "花朵", title: "花朵", width: 800, height: 1100 },
  { id: "f", img: "./assets/demo-photos/photo-06.jpg", alt: "山峦", title: "山峦", width: 800, height: 520 },
  { id: "g", img: "./assets/demo-photos/photo-07.jpg", alt: "游鱼", title: "游鱼", width: 800, height: 880 },
  { id: "h", img: "./assets/demo-photos/photo-08.jpg", alt: "夜枭", title: "夜枭", width: 800, height: 600 },
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 40,
      background: "#101014",
      padding: "48px 0",
    }}
  >
    <div style={{ width: "min(680px, 92vw)", margin: "0 auto", height: 520, overflowY: "auto" }}>
      <Masonry items={items} columns={3} gap={14} radius={12} duration={0.7} bounce={0.25} animateFrom="center" captions="hover" revealOnScroll={false} />
    </div>
    <div style={{ width: "min(520px, 88vw)", margin: "0 auto", height: 420, overflowY: "auto" }}>
      <Masonry items={items} columns={2} gap={10} radius={8} duration={0.5} bounce={0.08} hoverEffect="tilt" parallax={0.5} captions="always" revealOnScroll={false} />
    </div>
  </div>,
);
