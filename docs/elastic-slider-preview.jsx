import { createRoot } from "react-dom/client";
import { ElasticSlider } from "../src/react/index.js";

/* 橡胶拉伸滑块：横向带刻度的一条、竖向带把手的一条；往两端拖过头再松手，滚轮顶到底试试拒绝弹跳。 */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 56,
      background: "radial-gradient(circle at 50% 40%, #2e2b38 0%, #101014 75%)",
      color: "#e7e7ec",
      flexWrap: "wrap",
    }}
  >
    <ElasticSlider defaultValue={78} rangeColor="#f5c453" ticks={true} valuePosition="bubble" />
    <ElasticSlider defaultValue={22} rangeColor="#7fc8c0" thumb={true} wheel={true} />
    <ElasticSlider orientation="vertical" defaultValue={45} rangeColor="#e06c8a" ticks={true} thumb={true} />
  </div>,
);
