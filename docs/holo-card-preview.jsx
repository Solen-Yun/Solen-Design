import { createRoot } from "react-dom/client";
import { HoloCard } from "../src/react/index.js";

/* The standalone preview — three foil presets side by side on the dark
   canvas; move the pointer across each card, click to flip. */

const front = "./assets/demo-photos/photo-01.jpg";
const back = "./assets/demo-photos/photo-02.jpg";

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      background: "#101014",
    }}
  >
    <HoloCard image={front} backImage={back} alt="全息闪卡" preset="bursts" width={240} />
    <HoloCard image={front} backImage={back} alt="全息闪卡" preset="shards" width={240} tiltMax={20} />
    <HoloCard image={front} backImage={back} alt="全息闪卡" preset="gold" width={240} foilColor="#f4d9a0" />
  </div>,
);
