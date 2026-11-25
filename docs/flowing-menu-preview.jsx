import { createRoot } from "react-dom/client";
import { FlowingMenu } from "../src/react/index.js";

/* 液态横幅菜单：左边逐行分段滚动、左右交替方向；右边整块浮层跟随液带；上下扫几行、横向甩一下光标。 */
const items = [
  { text: "设计系统", marquee: "设计系统 Design System", image: "./assets/demo-photos/photo-01.jpg" },
  { text: "动效工坊", marquee: "动效工坊 Motion Lab", image: "./assets/demo-photos/photo-02.jpg" },
  { text: "字体研究", marquee: "字体研究 Type Notes", image: "./assets/demo-photos/photo-03.jpg" },
  { text: "关于我们", marquee: "关于我们 About", meta: "2025" }
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      gap: 32,
      background: "#101014",
      padding: "0 5%",
      alignItems: "stretch",
    }}
  >
    <div style={{ flex: 1, height: "82vh" }}>
      <FlowingMenu items={items} direction="alternate" speed={65} showIndex={true} dimInactive={true} />
    </div>
    <div style={{ flex: 1, height: "82vh" }}>
      <FlowingMenu items={items} carryContent={true} speed={85} stretch={0.85} bandRadius={14} bandInset={4} showArrow={true} activeIndex={1} />
    </div>
  </div>,
);
