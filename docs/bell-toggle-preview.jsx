import { createRoot } from "react-dom/client";
import { BellToggle } from "../src/react/index.js";

/* The standalone preview — three postures on the dark canvas: the default
   pill, a clapper variant with warm colours, and a large quiet one. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 44,
      background: "#101014",
    }}
  >
    <BellToggle count={3} />
    <BellToggle
      offLabel="提醒我"
      onLabel="已开启提醒"
      background="#3b2a1e"
      color="#ffd9b0"
      onBackground="#f5f5f5"
      onColor="#18181b"
      size="lg"
      clapper={true}
      ringAmplitude={22}
      ringPivot={22}
    />
    <BellToggle
      offLabel="Mute"
      onLabel="Subscribed"
      size="sm"
      radius={16}
      ringAmplitude={12}
      ringPasses={3}
      crossfadeMs={260}
    />
  </div>,
);
