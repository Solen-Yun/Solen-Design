import { createRoot } from "react-dom/client";
import { Grainient } from "../src/react/index.js";

/* The standalone preview — the ember linear flow, a violet radial bloom and
   a paper-tinted variant; stir them with the cursor, click for vortices. */
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
      <Grainient type="linear" angle={55} />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 300 }}>
      <Grainient
        type="radial"
        colors={["#1e1b4b", "#5227ff", "#c4b5fd"]}
        variation={9}
        bands={2}
        grainSize={2.4}
      />
    </div>
    <div style={{ position: "relative", width: "min(880px, 92vw)", height: 300 }}>
      <Grainient colors={["#9a3412", "#f97316", "#fed7aa"]} lightMode={true} angle={110} />
    </div>
  </div>,
);
