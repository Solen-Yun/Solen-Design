import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ThoughtLine } from "../src/react/index.js";

/* The standalone preview — a live line that works then folds, a settled
   one, and a dot-glyph variant, all on the dark canvas. */
const STEPS = ["解析问题结构", "检索相关组件模式", "权衡动效与可读性", "整理结论"];

function LoopingLine() {
  const [round, setRound] = useState(0);
  const [working, setWorking] = useState(true);
  useEffect(() => {
    if (!working) {
      const id = setTimeout(() => setRound((r) => r + 1), 3600);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [working]);
  useEffect(() => {
    setWorking(true);
  }, [round]);
  return (
    <ThoughtLine
      key={round}
      label="Thinking…"
      steps={STEPS}
      working={working}
      settleAfter={7}
      showTimer={true}
      onSettle={() => setWorking(false)}
    />
  );
}

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
    <LoopingLine />
    <ThoughtLine label="Thinking…" glyph="dot" steps={STEPS.slice(0, 2)} working={false} showTimer={true} />
    <ThoughtLine label="Searching the web" glyph="sparkle" working={true} shimmerDuration={1.2} />
  </div>,
);
