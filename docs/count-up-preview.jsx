import { createRoot } from "react-dom/client";
import { CountUp } from "../src/react/index.js";

/* 独立预览——三种计数姿态：滚轮逐位错峰、compact 缩写、弹簧过冲；
   悬停可重播。 */

const wrap = { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 64, background: "#101014", color: "#fafafa" };

createRoot(document.getElementById("root")).render(
  <div style={wrap}>
    <CountUp
      to={98.6}
      from={0}
      mode="roll"
      easing="spring"
      duration={2.6}
      decimals={1}
      style={{ fontSize: 72, fontWeight: 800 }}
    />
    <CountUp
      to={9421376}
      from={0}
      duration={2.2}
      format="compact"
      separator=","
      style={{ fontSize: 48, fontWeight: 700, opacity: 0.9 }}
    />
    <CountUp
      to={2026}
      from={1990}
      mode="roll"
      duration={2}
      style={{ fontSize: 36, fontWeight: 600, opacity: 0.7 }}
      replayOnHover={true}
    />
  </div>,
);
