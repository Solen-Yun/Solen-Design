import { createRoot } from "react-dom/client";
import { default as FluidGlass } from "../src/components/fluid-glass/FluidGlass.jsx";

/* 独立预览 — 深色画布上两块玻璃：左环面跟随指针、点击熔变形状；
   右边透镜磨砂加染色，固定锚在右上，靠 position 摆位。 */
createRoot(document.getElementById("root")).render(
  <div style={{ position: "relative", minHeight: "100vh", background: "radial-gradient(circle at 70% 25%, #3b2f63 0%, transparent 55%), linear-gradient(160deg, #191722, #101014)", overflow: "hidden" }}>
    <FluidGlass text="Look closer." shape="torus" size={240} />
    <FluidGlass
      text="frost"
      shape="lens"
      size={170}
      position={[0.78, 0.3]}
      interaction="static"
      frost={0.6}
      color="#9dd6ff"
      tint={0.5}
      dispersion={0.15}
      spin={0}
      idle={false}
      intro={false}
    />
  </div>,
);
