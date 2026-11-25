import { createRoot } from "react-dom/client";
import { DecayCard } from "../src/react/index.js";

/* 独立预览 — 深色画布上摆三张姿态：默认窗口跟踪、card 跟踪加色散、
   置灰高颗粒变体；快速甩动指针看撕裂，停下看愈合。 */

const image = "./assets/wallpaper-07.jpg";

const image2 = "./assets/wallpaper-09.jpg";

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      flexWrap: "wrap",
      background: "#101014",
    }}
  >
    <DecayCard image={image} width={300} height={400} scope="window" />
    <DecayCard image={image2} width={300} height={400} scope="card" chroma={0.8} hoverDecay={0.25} pattern={19} travel={80} tilt={16} />
    <DecayCard image={image} width={300} height={400} grayscale={true} grain={0.8} detail={7} pattern={33} flow={0.6} idle={0.15} />
  </div>,
);
