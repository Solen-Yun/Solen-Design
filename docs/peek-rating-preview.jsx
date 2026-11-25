import { createRoot } from "react-dom/client";
import { PeekRating } from "../src/react/index.js";

/* The standalone preview — star, heart and bolt rows on the dark canvas;
   hover each row to watch the wave rise, click to commit. */
const labels = ["很糟", "一般", "还行", "不错", "超棒"];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      background: "#101014",
      color: "#f5f5f5",
    }}
  >
    <PeekRating defaultValue={3} shape="star" size={32} activeColor="#f5b400" labels={labels} />
    <PeekRating defaultValue={4} shape="heart" size={28} activeColor="#ff4d6d" labels={labels} />
    <PeekRating defaultValue={2} shape="bolt" size={28} activeColor="#7fd8ff" labels={labels} />
  </div>,
);
