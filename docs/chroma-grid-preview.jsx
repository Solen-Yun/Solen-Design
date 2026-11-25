import { createRoot } from "react-dom/client";
import { ChromaGrid } from "../src/react/index.js";

/* 独立预览 — 深色画布上的照片墙：三列全尺寸一组、紧凑两列一组，
   指针划过时聚光半径内恢复彩色、光晕与描边同亮，离开后缓缓熄灭。 */


const items = [
  {
    image: "./assets/demo-photos/photo-01.jpg",
    title: "拂晓",
    subtitle: "暖调",
    accent: "#ff8a4c",
  },
  {
    image: "./assets/demo-photos/photo-02.jpg",
    title: "远洋",
    subtitle: "冷调",
    accent: "#7cc4ff",
  },
  {
    image: "./assets/demo-photos/photo-03.jpg",
    title: "暮紫",
    subtitle: "夜色",
    accent: "#a98bff",
  },
  {
    image: "./assets/demo-photos/photo-04.jpg",
    title: "苔原",
    subtitle: "植物",
    accent: "#6ee7b7",
  },
  {
    image: "./assets/demo-photos/photo-05.jpg",
    title: "霞色",
    subtitle: "黄昏",
    accent: "#ff7eb6",
  },
  {
    image: "./assets/demo-photos/photo-06.jpg",
    title: "麦浪",
    subtitle: "田野",
    accent: "#ffd66e",
  },
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
      color: "#f4f4f5",
      padding: "48px 16px",
      boxSizing: "border-box",
    }}
  >
    <div style={{ width: "min(720px, 100%)" }}>
      <ChromaGrid items={items} columns={3} minCardWidth={180} radius={280} theme="dark" />
    </div>
    <div style={{ width: "min(460px, 100%)" }}>
      <ChromaGrid
        items={items.slice(0, 4)}
        columns={4}
        minCardWidth={100}
        gap={10}
        radius={180}
        softness={0.45}
        cardRadius={16}
        showInfo={false}
        theme="dark"
      />
    </div>
  </div>,
);
