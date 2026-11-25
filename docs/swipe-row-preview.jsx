import { createRoot } from "react-dom/client";
import { SwipeRow } from "../src/react/index.js";

/* The standalone preview — three rows on the dark canvas: a default
   delete row, a right-direction pair in teal, and a compact no-bounce
   row with its drawer already open. */
const actions = [
  { id: "delete", label: "删除" },
  { id: "pin", label: "置顶" },
  { id: "mute", label: "静音" },
];

const face = (a, b) => `linear-gradient(135deg, ${a}, ${b})`;

const rowStyle = (a, b) => ({
  flex: "none",
  width: 40,
  height: 40,
  borderRadius: 999,
  background: face(a, b),
});

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      background: "#101014",
      padding: 24,
    }}
  >
    <div style={{ width: "100%", maxWidth: 560, display: "grid", gap: 12 }}>
      <SwipeRow actions={actions} label="默认行">
        <span aria-hidden="true" style={rowStyle("#6366f1", "#ec4899")} />
        <strong style={{ fontWeight: 600 }}>默认配置行</strong>
        <span style={{ opacity: 0.55, fontSize: 13 }}>拖到最底松手试试</span>
      </SwipeRow>
      <SwipeRow actions={actions} direction="right" actionColor="#0ea5e9" drawerColor="#1e3a5f" rowColor="#1c2431" label="朝右行">
        <span aria-hidden="true" style={rowStyle("#06b6d4", "#1d4ed8")} />
        <strong style={{ fontWeight: 600 }}>朝右滑的行</strong>
        <span style={{ opacity: 0.55, fontSize: 13 }}>方向与配色可换</span>
      </SwipeRow>
      <SwipeRow actions={actions} open={true} snapBounce={0} actionWidth={72} radius={10} label="已展开行">
        <span aria-hidden="true" style={rowStyle("#f59e0b", "#dc2626")} />
        <strong style={{ fontWeight: 600 }}>抽屉已展开</strong>
        <span style={{ opacity: 0.55, fontSize: 13 }}>点击操作或按 Escape 收回</span>
      </SwipeRow>
    </div>
  </div>,
);
