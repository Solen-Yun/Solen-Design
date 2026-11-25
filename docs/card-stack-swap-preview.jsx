import { createRoot } from "react-dom/client";
import { default as CardSwap } from "../src/components/card-stack-swap/CardSwap.jsx";

/* 立体卡片轮换堆：深浅两套主题的卡片堆并排轮换，拖住最前一张甩出去也能换位。 */
const items = [
  { title: "Golden hour", icon: "🌇", image: "./assets/demo-photos/photo-01.jpg" },
  { title: "Black beach", icon: "🏖️", image: "./assets/demo-photos/photo-02.jpg" },
  { title: "Steel arches", icon: "🌉", image: "./assets/demo-photos/photo-03.jpg" },
  { title: "Pink drift", icon: "☁️", image: "./assets/demo-photos/photo-04.jpg" }
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
    <div style={{ width: 520, height: 420 }}>
      <CardSwap items={items} theme="dark" delay={2800} bounce={0.35} />
    </div>
    <div style={{ width: 480, height: 380 }}>
      <CardSwap items={items} theme="light" delay={3600} cardDistance={48} verticalDistance={56} depth={70} skewAmount={4} />
    </div>
  </div>,
);
