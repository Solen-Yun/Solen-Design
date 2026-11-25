import { createRoot } from "react-dom/client";
import { TextPressure } from "../src/react/index.js";

/* The standalone preview — one word with the stroke echo and an idle pulse,
   one clean word below; move the pointer through both, click for ripples. */
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
      color: "#f4f4f5",
    }}
  >
    <div style={{ width: "min(760px, 92vw)", height: 200 }}>
      <TextPressure text="Pressure" stroke strokeColor="#FF0000" strokeWidth={2} idle="pulse" />
    </div>
    <div style={{ width: "min(680px, 92vw)", height: 160 }}>
      <TextPressure text="Variable" radius={0.65} smoothing={0.7} clickRipple />
    </div>
    <p style={{ color: "#52525b", fontSize: 14, letterSpacing: "0.1em", textAlign: "center" }}>
      上面一条带描边投影并自己脉搏；下面一条纯轴变形，点击试试涟漪。
    </p>
  </div>,
);
