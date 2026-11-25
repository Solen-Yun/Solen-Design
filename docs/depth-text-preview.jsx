import { createRoot } from "react-dom/client";
import { DepthText } from "../src/react/index.js";

/* 独立预览——三块立体字：默认紫色挤出、渐变描边青色、粉色漂浮小字；
   移动指针看转向，悬停第一块压住看深度缩回。 */

const canvas = { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 72, background: "#101014", color: "#fafafa" };

createRoot(document.getElementById("root")).render(
  <div style={canvas}>
    <DepthText text="Elevate" depthColor="#7c3aed" hoverPush={0.5} />
    <DepthText
      text="Dimension"
      depthColor="#22d3ee"
      gradientDepth={true}
      outline={true}
      layers={26}
      tilt={9}
      fontSize="clamp(2.4rem, 8vw, 5rem)"
    />
    <DepthText
      text="float"
      depthColor="#ec4899"
      layers={18}
      depth={1.8}
      float={true}
      hoverPush={0}
      fontSize="clamp(1.8rem, 5vw, 3rem)"
    />
  </div>,
);
