import { createRoot } from "react-dom/client";
import { TearTicket } from "../src/react/index.js";

/* The standalone preview — a wide horizontal ticket and a stub-on-bottom
   vertical one on the dark canvas; grab either stub and tear it off. */
const body = (
  <div
    style={{
      height: "100%",
      boxSizing: "border-box",
      padding: "24px 28px",
      borderRadius: 12,
      background: "linear-gradient(135deg, #4338ca 0%, #7c3aed 45%, #db2777 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      gap: 6,
    }}
  >
    <strong style={{ fontSize: 22, letterSpacing: "0.04em" }}>SOLEN · LIVE</strong>
    <span style={{ fontSize: 13, opacity: 0.8 }}>2026-11-21 19:30 · 东侧剧场</span>
    <span style={{ fontSize: 13, opacity: 0.8 }}>12 排 7 号 · 凭票入场</span>
  </div>
);
const stubLabel = (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
    <span style={{ fontSize: 13, letterSpacing: "0.35em", opacity: 0.65, writingMode: "vertical-rl" }}>SOLEN · 副券</span>
  </div>
);

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
      color: "#f5f5f5",
    }}
  >
    <TearTicket width={460} height={250} stubSize={140} roughness={2} ariaLabel="撕下副券" stub={stubLabel}>
      {body}
    </TearTicket>
    <TearTicket
      width={340}
      height={300}
      stubSize={110}
      orientation="vertical"
      holes={14}
      stretch={44}
      background="#1c1917"
      color="#fde68a"
      ariaLabel="撕下副券"
      stub={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
          <span style={{ fontSize: 13, letterSpacing: "0.35em", opacity: 0.65 }}>SOLEN · 副券</span>
        </div>
      }
    >
      <div style={{ display: "grid", placeItems: "center", height: "100%", fontSize: 15, opacity: 0.85 }}>向下撕开这张票</div>
    </TearTicket>
  </div>,
);
