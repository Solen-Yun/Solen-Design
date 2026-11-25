import { createRoot } from "react-dom/client";
import { GooeyNav } from "../src/react/index.js";

/* The standalone preview — the dark-framed bar and the light one side by
   side on the dark canvas; click between items to watch the droplets. */
const items = [
  { label: "首页", href: "#" },
  { label: "组件", href: "#" },
  { label: "风格", href: "#" },
  { label: "文档", href: "#" }
];

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
    }}
  >
    <GooeyNav items={items} initialActiveIndex={0} theme="dark" size="lg" />
    <GooeyNav items={items} initialActiveIndex={2} theme="light" size="md" />
  </div>,
);
