import { createRoot } from "react-dom/client";
import { Orb } from "../src/react/index.js";

/* The standalone preview — three orbs on one dark canvas: the default
   violet-blue breather, a tilted cyan one with a long comet tail, and a
   small ember that leans toward the pointer. */
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
    <div style={{ position: "relative", width: 340, height: 340 }}>
      <Orb />
    </div>
    <div style={{ position: "relative", width: 300, height: 300 }}>
      <Orb
        colors={["#4cc2e9", "#9c43fe", "#03101d"]}
        trail={2.6}
        highlight={1.4}
        tiltX={22}
        tiltY={-14}
      />
    </div>
    <div style={{ position: "relative", width: 240, height: 240 }}>
      <Orb
        colors={["#f5a524", "#f43f5e", "#20090a"]}
        size={1.4}
        glow={1.6}
        hoverIntensity={1.6}
      />
    </div>
  </div>,
);
