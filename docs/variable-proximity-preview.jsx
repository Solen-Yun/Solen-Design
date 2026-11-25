import { createRoot } from "react-dom/client";
import { VariableProximity } from "../src/react/index.js";

/* The standalone preview — a tinted rising line under an idle wave, and a
   plain weight-only line below; sweep the pointer across both headings. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 72,
      background: "#101014",
      color: "#f4f4f5",
    }}
  >
    <VariableProximity
      label="Weight flows to the pointer"
      radius={110}
      falloff="gaussian"
      smoothing={0.35}
      fromColor="#52525b"
      toColor="#fafafa"
      scale={1.15}
      lift={0.12}
      idleWave
      fontSize={56}
    />
    <VariableProximity
      label="Proximity"
      radius={80}
      falloff="linear"
      fontSize={80}
    />
    <p style={{ color: "#52525b", fontSize: 14, letterSpacing: "0.1em", textAlign: "center" }}>
      上面一条染色上浮并带待机波浪；下面一条只动字重。
    </p>
  </div>,
);
