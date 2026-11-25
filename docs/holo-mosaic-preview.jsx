import { createRoot } from "react-dom/client";
import { HoloMosaic } from "../src/react/index.js";

/* The standalone preview — full spectrum, a cool pearl wall and the ASCII
   mural; sweep to refract the sweep, click to flip tiles in a ring. */
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
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 300 }}>
      <HoloMosaic spectrum="full" />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 300 }}>
      <HoloMosaic spectrum="pearl" color="#1c2430" metalColor="#f1f5f9" tileSize={1.4} variation={5} />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 300, background: "#f4f4f5" }}>
      <HoloMosaic lightMode={true} filter="ascii" spectrum="warm" tileSize={1.2} filterSize={0.8} />
    </div>
  </div>,
);
