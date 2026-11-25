import { createRoot } from "react-dom/client";
import { GradientBlinds } from "../src/react/index.js";

/* The standalone preview — the classic pink/violet wall, a teal wall fanned
   into perspective, and an ink-on-paper wall; the light follows the cursor. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      background: "#101014",
    }}
  >
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 280 }}>
      <GradientBlinds gradientColors={["#FF9FFC", "#5227FF"]} blindCount={18} />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 280 }}>
      <GradientBlinds
        gradientColors={["#99f6e4", "#0f766e"]}
        lightColor="#fef3c7"
        angle={10}
        perspective={0.5}
        blindCount={24}
        gradientSpeed={1.5}
      />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 280, background: "#f4f4f5" }}>
      <GradientBlinds gradientColors={["#1e3fd8", "#5227ff"]} lightMode={true} blindCount={14} />
    </div>
  </div>,
);
