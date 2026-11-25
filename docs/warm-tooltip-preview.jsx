import { createRoot } from "react-dom/client";
import { WarmTooltip } from "../src/react/index.js";

/* The standalone preview — a toolbar on the dark canvas: sweep it while warm
   and the same bubble flies between buttons; the isolated one leans. */
const btn = {
  width: 44,
  height: 38,
  border: "1px solid #3f3f46",
  borderRadius: 8,
  background: "#27272a",
  color: "#d4d4d8",
  fontSize: 14,
  cursor: "pointer",
};

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 72,
      background: "#101014",
      color: "#d4d4d8",
    }}
  >
    <div style={{ display: "inline-flex", gap: 8 }}>
      {[
        { label: "加粗", tip: "加粗选中文本", key: "⌘ B" },
        { label: "斜体", tip: "倾斜选中文本", key: "⌘ I" },
        { label: "链接", tip: "插入链接", key: "⌘ K" },
        { label: "代码", tip: "插入代码块", key: "⌘ E" },
      ].map((tool) => (
        <WarmTooltip key={tool.label} content={tool.tip} shortcut={tool.key} side="top" surfaceColor="#f5f5f5" inkColor="#18181b">
          <button type="button" style={btn}>
            {tool.label}
          </button>
        </WarmTooltip>
      ))}
    </div>
    <div style={{ display: "inline-flex", gap: 40 }}>
      <WarmTooltip content="向右弹出的提示" side="right" showFuse={true} delay={300} surfaceColor="#fde68a" inkColor="#422006">
        <button type="button" style={btn}>
          右侧
        </button>
      </WarmTooltip>
      <WarmTooltip content="向下弹出的大号提示" side="bottom" size="lg" radius={12} surfaceColor="#27272a" inkColor="#f5f5f5">
        <button type="button" style={btn}>
          底部
        </button>
      </WarmTooltip>
    </div>
  </div>,
);
