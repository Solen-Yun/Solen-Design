import { createRoot } from "react-dom/client";
import { AccordionGallery } from "../src/react/index.js";

/* 独立预览 — 深色画布上摆三种姿态：横向悬停展开、竖向堆叠和
   不置灰、大甩角的横向变体；面板间移动指针或按方向键看展开与视差。 */


const photo = (a, b, shape, label) => ({ image: "./assets/demo-photos/photo-01.jpg", label });

const items = [
  photo("#f59e0b", "#7c2d12", '<circle cx="700" cy="220" r="140" fill="#fde68a" opacity="0.85"/>', "峡谷"),
  photo("#0ea5e9", "#1e3a8a", '<rect x="560" y="760" width="220" height="180" rx="28" fill="#e0f2fe" opacity="0.6"/>', "远山"),
  photo("#8b5cf6", "#4c1d95", '<circle cx="260" cy="300" r="120" fill="#f5d0fe" opacity="0.8"/>', "暮紫"),
  photo("#10b981", "#134e4a", '<circle cx="660" cy="880" r="140" fill="#d1fae5" opacity="0.7"/>', "苔原"),
  photo("#fb7185", "#881337", '<rect x="180" y="760" width="200" height="160" rx="26" fill="#ffedd5" opacity="0.75"/>', "霞色"),
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
    <div style={{ width: "min(860px, 92vw)" }}>
      <AccordionGallery items={items} defaultIndex={2} height={380} trigger="hover" />
    </div>
    <div style={{ width: "min(860px, 92vw)" }}>
      <AccordionGallery items={items} defaultIndex={1} orientation="vertical" height={340} gap={8} tilt={4} />
    </div>
    <div style={{ width: "min(860px, 92vw)" }}>
      <AccordionGallery items={items} defaultIndex={3} grayscale={false} tilt={18} parallax={0.9} accentColor="#fb7185" height={320} trigger="click" />
    </div>
  </div>,
);
