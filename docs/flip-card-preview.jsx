import { createRoot } from "react-dom/client";
import { FlipCard } from "../src/react/index.js";

/* The standalone preview — a horizontal-axis card beside a vertical-axis
   one, both on the dark canvas; click, drag or flick either of them. */
function Face({ emoji, title, lines }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        padding: 24,
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: 40, lineHeight: 1 }} aria-hidden="true">
        {emoji}
      </span>
      <span style={{ fontSize: 16, fontWeight: 600 }}>{title}</span>
      <span style={{ fontSize: 12, opacity: 0.62, lineHeight: 1.5 }}>{lines}</span>
    </div>
  );
}

const front = <Face emoji="🌙" title="夜面" lines="单击、回车或拖拽翻面。" />;
const back = <Face emoji="☀️" title="昼面" lines="再翻一次就回去了。" />;

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      background: "#101014",
    }}
  >
    <FlipCard width={250} height={330} front={front} back={back} ariaLabel="夜面卡片" />
    <FlipCard width={250} height={330} axis="x" front={back} back={front} ariaLabel="昼面卡片" />
  </div>,
);
