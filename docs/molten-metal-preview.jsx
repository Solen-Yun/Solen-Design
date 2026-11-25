import { createRoot } from "react-dom/client";
import { MoltenMetal } from "../src/react/index.js";

/* The standalone preview — three melts on one dark canvas: the default
   violet-pink filaments, a five-colour ember ramp with heavy turbulence,
   and a frost field inlaid on an opaque slate panel. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 32,
      background: "#101014",
    }}
  >
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 280 }}>
      <MoltenMetal />
    </div>
    <div style={{ position: "relative", width: "min(860px, 92vw)", height: 240 }}>
      <MoltenMetal
        colors={["#7f1d1d", "#f5a524", "#f43f5e", "#fde68a"]}
        coreColor="#fffbeb"
        colorMode="ember"
        speed={0.5}
        scale={5}
        detail={5}
        turbulence={0.45}
        swirl={1.6}
      />
    </div>
    <div
      style={{
        position: "relative",
        width: "min(860px, 92vw)",
        height: 220,
        background: "#27272a",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <MoltenMetal
        colors={["#0ea5e9", "#a5f3fc"]}
        coreColor="#ffffff"
        colorMode="frost"
        lightMode={false}
        backgroundColor="#27272a"
        speed={0.25}
        scale={3}
        thickness={0.6}
        haze={0.4}
      />
    </div>
  </div>,
);
