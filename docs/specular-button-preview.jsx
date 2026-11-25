import { createRoot } from "react-dom/client";
import { SpecularButton } from "../src/react/index.js";

/* The standalone preview — the solid dark button and the clear-glass one
   on a dark canvas; the light follows the cursor anywhere on the page. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 28,
      background: "#101014",
    }}
  >
    <SpecularButton
      size="lg"
      tint="#18181b"
      tintOpacity={1}
      textColor="#fafafa"
      lineColor="#ffffff"
      baseColor="#3f3f46"
      followMouse
      proximity={250}
      onClick={() => console.log("clicked")}
    >
      Get Started
    </SpecularButton>
    <SpecularButton
      size="lg"
      tint="#ffffff"
      tintOpacity={0.04}
      blur={6}
      lineColor="#ffffff"
      baseColor="#525252"
      followMouse
      proximity={250}
    >
      Learn More
    </SpecularButton>
  </div>,
);
