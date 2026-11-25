import { createRoot } from "react-dom/client";
import { SlingButton } from "../src/react/index.js";

/* The standalone preview — two slings on the dark canvas: a big neutral one
   and a smaller accent-tinted one; drag either past the arm ring and let go. */
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
      color: "#f5f5f5",
    }}
  >
    <SlingButton size={80} armAt={56} particles={18} />
    <SlingButton size={56} padColor="#fde68a" accentColor="#fbbf24" wellColor="#1c1917" iconColor="#78350f" bandColor="#57534e" />
  </div>,
);
