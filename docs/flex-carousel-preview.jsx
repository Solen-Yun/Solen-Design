import { createRoot } from "react-dom/client";
import { FlexCarousel } from "../src/react/index.js";

/* The standalone preview — the liquid lens and the vortex preset side by
   side on the dark canvas; drag or flick the rows, click the center card. */

const items = [
  { src: "./assets/demo-photos/photo-01.jpg", alt: "海浪", title: "海浪" },
  { src: "./assets/demo-photos/photo-02.jpg", alt: "星球", title: "星球" },
  { src: "./assets/demo-photos/photo-03.jpg", alt: "秋叶", title: "秋叶" },
  { src: "./assets/demo-photos/photo-04.jpg", alt: "植物", title: "植物" },
  { src: "./assets/demo-photos/photo-05.jpg", alt: "花朵", title: "花朵" },
  { src: "./assets/demo-photos/photo-06.jpg", alt: "山峦", title: "山峦" },
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
    <div style={{ width: "100%", height: "46vh" }}>
      <FlexCarousel items={items} preset="liquid" intro="rise" cardHeight={0.5} gap={14} radius={8} />
    </div>
    <div style={{ width: "100%", height: "42vh" }}>
      <FlexCarousel items={items} preset="vortex" intro="spin" cardHeight={0.42} gap={10} radius={0} dispersion={0.6} liquid={0.5} />
    </div>
  </div>,
);
