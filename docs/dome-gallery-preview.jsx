import { createRoot } from "react-dom/client";
import { DomeGallery } from "../src/react/index.js";

/* The standalone preview — the same dome at two sizes and image styles on
   the dark canvas; drag to spin, click a tile to enlarge it. */

const images = [
  { src: "./assets/demo-photos/photo-01.jpg", alt: "海浪" },
  { src: "./assets/demo-photos/photo-02.jpg", alt: "星球" },
  { src: "./assets/demo-photos/photo-03.jpg", alt: "秋叶" },
  { src: "./assets/demo-photos/photo-04.jpg", alt: "植物" },
  { src: "./assets/demo-photos/photo-05.jpg", alt: "花朵" },
  { src: "./assets/demo-photos/photo-06.jpg", alt: "山峦" },
];

createRoot(document.getElementById("root")).render(
  <div style={{ width: "100vw", height: "100vh", background: "#101014" }}>
    <div style={{ width: "100vw", height: "55vh" }}>
      <DomeGallery images={images} fit={0.5} grayscale={true} />
    </div>
    <div style={{ width: "100vw", height: "45vh" }}>
      <DomeGallery images={images} fit={0.6} grayscale={false} segments={25} maxVerticalRotationDeg={10} />
    </div>
  </div>,
);
