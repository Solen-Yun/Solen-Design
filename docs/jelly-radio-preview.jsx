import { createRoot } from "react-dom/client";
import { JellyRadio } from "../src/react/index.js";

/* The standalone preview — a medium row mid-selection and a large row with
   extra jelly, both on the dark canvas; click around in each. */
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
    <JellyRadio items={["Off", "Low", "Medium", "High", "Max"]} defaultValue="Medium" ariaLabel="功率" />
    <JellyRadio
      items={["Cold", "Warm", "Hot"]}
      defaultValue="Warm"
      size="lg"
      swell={0.3}
      jelly={2}
      bounce={0.4}
      ariaLabel="温度"
    />
  </div>,
);
