import { createRoot } from "react-dom/client";
import { WarpText } from "../src/react/index.js";

/* 独立预览 — 深色画布上并排三种透镜姿态：默认凸起、漩涡加色散、收缩加折射；
   移动指针穿过标题看字形弯折，点击激起冲击波。 */

const poses = [
  { key: "bulge", props: { text: "Bend the moment", color: "#e4e4e7" } },
  { key: "swirl", props: { text: "Swirl the light", color: "#e4e4e7", lens: "swirl", chromatic: 0.5, refraction: 0.03 } },
  { key: "pinch", props: { text: "Pinch the glass", color: "#e4e4e7", lens: "pinch", pointerInfluence: 0.5 } },
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      background: "#101014",
    }}
  >
    {poses.map(({ key, props }) => (
      <div key={key} style={{ width: "min(100%, 1100px)", height: "38vh" }}>
        <WarpText {...props} />
      </div>
    ))}
  </div>,
);
