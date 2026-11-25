import { createRoot } from "react-dom/client";
import { Stack } from "../src/react/index.js";

/* The standalone preview — four pile postures side by side on the dark
   canvas; drag the top card or press it to send it to the back. */
function Card({ hue, emoji, label }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: "100%",
        height: "100%",
        background: `linear-gradient(150deg, hsl(${hue}, 85%, 72%), hsl(${(hue + 30) % 360}, 70%, 42%))`,
        color: "#ffffff",
        fontSize: 34,
      }}
    >
      <span aria-hidden="true">{emoji}</span>
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.85 }}>
        {label}
      </span>
    </div>
  );
}

const SEEDS = { fan: 0, cascade: 1, deck: 2, pile: 3 };

const makeCards = (layout) =>
  Array.from({ length: 5 }, (_, index) => {
    const seed = SEEDS[layout] ?? 0;
    return (
      <Card
        key={`${layout}-${index}`}
        hue={(seed * 60 + index * 47) % 360}
        emoji={["🌙", "🌊", "🍒", "🌿", "🍋"][index]}
        label={["Moon", "Wave", "Cherry", "Leaf", "Lemon"][index]}
      />
    );
  });

function Cell({ layout, title, spread, depth, size, sendToBackOnClick }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ width: size, height: size, position: "relative" }}>
        <Stack
          cards={makeCards(layout)}
          layout={layout}
          spread={spread}
          depth={depth}
          radius={16}
          tilt={35}
          threshold={80}
          sendToBackOnClick={sendToBackOnClick}
        />
      </div>
      <span style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, letterSpacing: "0.12em" }}>{title}</span>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: 56,
      background: "#101014",
      padding: "48px 24px",
    }}
  >
    <Cell layout="fan" title="扇形 · 拖甩试试" spread={0.5} depth={0.5} size={220} sendToBackOnClick />
    <Cell layout="cascade" title="斜叠" spread={0.5} depth={0.5} size={220} sendToBackOnClick />
    <Cell layout="deck" title="层叠" spread={0.5} depth={0.5} size={220} sendToBackOnClick />
    <Cell layout="pile" title="乱堆" spread={0.6} depth={0.4} size={220} sendToBackOnClick />
  </div>,
);
