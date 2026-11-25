import { createRoot } from "react-dom/client";
import { EchoText } from "../src/react/index.js";

/* The standalone preview — three poses on the dark canvas: the pointer
   trail in cyan, an outline smear drifting on its own in amber, and a
   magenta entrance converging from the diagonal. */
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
    <EchoText text="回声" echoes={12} offset={34} direction="right" tint="#7dd3fc" trail="pointer" fontSize="4.5rem" />
    <EchoText text="DRIFT" echoes={14} offset={30} direction="down" echoStyle="outline" tint="#ffb454" trail="auto" fontSize="4.5rem" />
    <EchoText text="残影" echoes={10} offset={40} direction="diagonal" tint="#f0abfc" mode="entrance" duration={1400} fontSize="4.5rem" />
  </div>,
);
