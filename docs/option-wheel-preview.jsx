import { createRoot } from "react-dom/client";
import { OptionWheel } from "../src/react/index.js";

/* 滚轮弧形选择器：左边锚定、无限循环的一只轮，右边镜像的另一只；滚轮、拖拽、方向键都试试。 */
const genres = [
  "Ambient",
  "House",
  "Techno",
  "Jazz",
  "Lo-Fi",
  "Synthwave",
  "Trance",
  "Funk",
  "Disco",
  "Hip-Hop",
  "Chillwave",
  "Drum & Bass"
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      padding: "0 8%",
      background: "radial-gradient(circle at 50% 40%, #26232e 0%, #101014 75%)",
    }}
  >
    <div style={{ width: "46%", height: "70vh" }}>
      <OptionWheel items={genres} defaultSelected={3} side="left" loop tilt={7} fontSize={2.6} />
    </div>
    <div style={{ width: "46%", height: "70vh" }}>
      <OptionWheel items={genres} defaultSelected={9} side="right" tilt={5} curve={1.4} fontSize={2.2} activeColor="#f5c453" textColor="#8a8a93" />
    </div>
  </div>,
);
