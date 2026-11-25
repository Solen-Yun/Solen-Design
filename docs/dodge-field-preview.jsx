import { createRoot } from "react-dom/client";
import { DodgeField } from "../src/react/index.js";

/* The standalone preview — three chases on one dark canvas: the default
   taunt pill, a horizontal bounce-wall run in amber, and a one-dodge
   quitter that gives up instantly. */
const amber = (
  <DodgeField
    key="amber"
    fieldHeight={200}
    inkColor="#f5a524"
    contrastColor="#20140a"
    reach={96}
    radius={140}
    falloff={2.6}
    axis="x"
    wall="bounce"
    fleeDuration={110}
    returnDuration={520}
    patience={6}
  />
);

const quitter = (
  <DodgeField
    key="quitter"
    fieldHeight={200}
    inkColor="#a1a1aa"
    reach={64}
    radius={110}
    patience={1}
    returnBounce={0.22}
  />
);

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
    <div style={{ width: "100%", maxWidth: 640 }}>
      <DodgeField fieldHeight={200} />
    </div>
    <div style={{ width: "100%", maxWidth: 640 }}>{amber}</div>
    <div style={{ width: "100%", maxWidth: 640 }}>{quitter}</div>
  </div>,
);
