import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Counter } from "../src/react/index.js";

/* The standalone preview — a countdown card whose value cycles every few
   seconds, so the roll, the stagger and the tile look keep demonstrating
   without any input. */
const VALUES = [1284, 9413, 207, 36520, 8];

const TILE = {
  background: "#f4f4f5",
  borderRadius: 14,
  padding: "10px 6px",
  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)",
};

createRoot(document.getElementById("root")).render(<Preview />);

function Preview() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((value) => (value + 1) % VALUES.length), 2600);
    return () => clearInterval(timer);
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          background: "#ffffff",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          borderRadius: 24,
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.08)",
          padding: "40px 56px",
        }}
      >
        <Counter value={VALUES[index]} fontSize={64} fontWeight={700} digitStyle={TILE} />
      </div>
    </div>
  );
}
