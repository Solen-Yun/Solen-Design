import { createRoot } from "react-dom/client";
import { RubberSegment } from "../src/react/index.js";

/* The standalone preview — two rubber segmented controls on the dark canvas:
   a large period picker and a small icon-friendly one; drag and flick both. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      background: "#101014",
    }}
  >
    <RubberSegment items={["日", "周", "月", "年"]} defaultValue="月" size="lg" />
    <RubberSegment items={["列表", "看板", "表格"]} defaultValue="看板" size="md" />
    <RubberSegment items={["A", "B", "C"]} defaultValue="B" size="sm" />
  </div>,
);
