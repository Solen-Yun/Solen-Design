import { createRoot } from "react-dom/client";
import { CircularGallery } from "../src/react/index.js";

/* 独立预览 — 深色画布上摆三种姿态：正弧度、零弧度直排和灰度底态；
   拖拽甩动看涟漪吸附，点卡片放大再按 Escape 收回。 */


const photo = (a, b, shape, text) => ({
  image: "./assets/demo-photos/photo-01.jpg",
  text,
  description: `${text}——内置渐变占位图，精确素材以代码内嵌为准。`,
});

const items = [
  photo("#f59e0b", "#7c2d12", '<circle cx="620" cy="140" r="110" fill="#fde68a" opacity="0.85"/>', "拂晓"),
  photo("#0ea5e9", "#1e3a8a", '<rect x="500" y="320" width="200" height="160" rx="28" fill="#e0f2fe" opacity="0.7"/>', "远洋"),
  photo("#8b5cf6", "#4c1d95", '<circle cx="200" cy="160" r="100" fill="#f5d0fe" opacity="0.8"/>', "暮紫"),
  photo("#10b981", "#134e4a", '<circle cx="600" cy="430" r="120" fill="#d1fae5" opacity="0.75"/>', "苔原"),
  photo("#fb7185", "#881337", '<rect x="150" y="350" width="170" height="140" rx="26" fill="#ffedd5" opacity="0.8"/>', "霞色"),
  photo("#facc15", "#854d0e", '<circle cx="400" cy="260" r="150" fill="#fef9c3" opacity="0.55"/>', "麦浪"),
];

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
    <div style={{ width: "100%", height: 280 }}>
      <CircularGallery items={items} bend={3} intro={false} />
    </div>
    <div style={{ width: "100%", height: 220 }}>
      <CircularGallery items={items} bend={0} itemSize={0.8} gap={0.2} intro={false} />
    </div>
    <div style={{ width: "100%", height: 220 }}>
      <CircularGallery items={items} bend={-3} grayscale={true} itemSize={0.7} textColor="#e2e8f0" intro={false} />
    </div>
  </div>,
);
