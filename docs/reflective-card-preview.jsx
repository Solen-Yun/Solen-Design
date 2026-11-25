import { createRoot } from "react-dom/client";
import { default as ReflectiveCard } from "../src/components/reflective-card/ReflectiveCard.jsx";

/* 独立预览 — 深色画布上两张金属卡：左卡默认深色排版，右卡换浅色、
   染色金属与更粗的拉丝；在卡面上移动指针看反射偏摆。 */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      background: "#101014",
    }}
  >
    <ReflectiveCard height={440} intro={false} />
    <ReflectiveCard
      theme="light"
      tint="#f2d9b0"
      roughness={0.55}
      blurStrength={9}
      grayscale={0.4}
      height={400}
      name="Ivy Chen"
      role="Hardware Lead"
      intro={false}
    />
  </div>,
);
