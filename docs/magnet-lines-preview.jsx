import { createRoot } from "react-dom/client";
import { MagnetLines } from "../src/react/index.js";

/* The standalone preview — three fields on one dark canvas: the default
   orbiting bars, a tilted amber needle grid, and a rainbow arrow field
   with heavy scatter and an idle ghost. */
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
    <div style={{ width: "min(860px, 92vw)", height: 280 }}>
      <MagnetLines spacing={30} idle={true} />
    </div>
    <div style={{ width: "min(860px, 92vw)", height: 260 }}>
      <MagnetLines
        lineColor="#f5a524"
        accentColor="#f43f5e"
        shape="needle"
        spacing={34}
        lineHeight={22}
        tiltX={38}
        tiltY={-12}
        fade={0.45}
        inertia={0.5}
      />
    </div>
    <div style={{ width: "min(860px, 92vw)", height: 240 }}>
      <MagnetLines
        shape="arrow"
        rainbow={true}
        spacing={40}
        lineHeight={24}
        scatter={0.55}
        stretch={0.8}
        edgeFade={0.4}
        idle={true}
      />
    </div>
  </div>,
);
