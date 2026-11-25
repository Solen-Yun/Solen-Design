import { createRoot } from "react-dom/client";
import { SplitFlapText } from "../src/react/index.js";

/* The standalone preview — the classic cabinet board and the flat minimal
   board on the dark canvas; watch the cascade direction differ per board. */
const FLIGHT = ["GATE A12", "BOARDING", "FINAL CALL", "DEPARTED"];
const WEATHER = ["SOL 03:47", "WIND 12KT", "QNH 1013", "RWY 27L"];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 64,
      background: "#101014",
    }}
  >
    <SplitFlapText words={FLIGHT} order="left" fontSize={52} depth={0.5} glare={0.2} />
    <SplitFlapText words={WEATHER} order="center" fontSize={40} tileStyle="minimal" />
    <p style={{ color: "#52525b", fontSize: 14, letterSpacing: "0.1em", textAlign: "center" }}>
      两块牌板各翻各的：上为机箱材质，下为扁平遮罩。
    </p>
  </div>,
);
