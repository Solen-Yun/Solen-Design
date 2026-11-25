import { createRoot } from "react-dom/client";
import { GlassIcons } from "../src/react/index.js";

/* The standalone preview — three postures on the dark canvas: tilt plates
   on dark, circle plates, and a light stage with always-on labels. */
const icon = (path) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={path} />
  </svg>
);

const items = [
  { label: "Home", icon: icon("M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5"), color: "blue" },
  { label: "Search", icon: icon("M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zm9 2-3.8-3.8"), color: "teal" },
  { label: "Star", icon: icon("m12 3 2.8 5.9 6.2.8-4.6 4.4 1.2 6.4L12 17.4 6.4 20.5l1.2-6.4L3 9.7l6.2-.8L12 3z"), color: "purple" },
  { label: "Bolt", icon: icon("M13 2 4 14h6l-1 8 9-12h-6l1-8z"), color: "orange" },
  { label: "Heart", icon: icon("M12 20.5 4.7 13a4.7 4.7 0 0 1 6.6-6.6l.7.7.7-.7a4.7 4.7 0 0 1 6.6 6.6L12 20.5z"), color: "red" },
  { label: "Mail", icon: icon("M3 6h18v12H3V6zm0 1 9 6 9-6"), color: "green" },
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 56,
      background: "#101014",
      padding: "48px 24px",
    }}
  >
    <div style={{ background: "radial-gradient(120% 120% at 30% 20%, #2b2438 0%, #101014 60%)", borderRadius: 20, padding: "28px 36px" }}>
      <GlassIcons items={items} plate="tilt" hover="press" size={72} intro={false} />
    </div>
    <div style={{ background: "radial-gradient(120% 120% at 30% 20%, #232a33 0%, #101014 60%)", borderRadius: 20, padding: "28px 36px" }}>
      <GlassIcons items={items} plate="circle" hover="float" labels="always" size={72} intro={false} />
    </div>
    <div style={{ background: "radial-gradient(120% 120% at 30% 20%, #ffffff 0%, #e5e7ee 70%)", borderRadius: 20, padding: "28px 36px" }}>
      <GlassIcons items={items} theme="light" plate="offset" hover="lift" labels="always" size={72} intro={false} />
    </div>
  </div>,
);
