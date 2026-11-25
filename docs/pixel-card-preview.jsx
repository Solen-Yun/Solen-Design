import { createRoot } from "react-dom/client";
import { PixelCard } from "../src/react/index.js";

/* The standalone preview — three variants lit forever on the dark canvas;
   hover to bring the spotlight in, click for shockwaves. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 44,
      background: "#101014",
    }}
  >
    <PixelCard variant="default" trigger="always" radius={18} style={{ width: 220, height: 300 }} intro={false}>
      <div style={{ textAlign: "center", color: "#f4f4f5" }}>
        <div style={{ fontSize: 40 }}>✦</div>
        <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, letterSpacing: "0.08em" }}>FIELD</div>
      </div>
    </PixelCard>
    <PixelCard variant="blue" trigger="always" shape="circle" radius={18} style={{ width: 220, height: 300 }} intro={false}>
      <div style={{ textAlign: "center", color: "#f4f4f5" }}>
        <div style={{ fontSize: 40 }}>✦</div>
        <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, letterSpacing: "0.08em" }}>DRIFT</div>
      </div>
    </PixelCard>
    <PixelCard variant="pink" trigger="always" shape="diamond" radius={18} spotlight={0.8} style={{ width: 220, height: 300 }} intro={false}>
      <div style={{ textAlign: "center", color: "#f4f4f5" }}>
        <div style={{ fontSize: 40 }}>✦</div>
        <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600, letterSpacing: "0.08em" }}>SPARK</div>
      </div>
    </PixelCard>
  </div>,
);
