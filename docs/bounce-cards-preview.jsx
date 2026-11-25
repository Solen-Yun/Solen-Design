import { createRoot } from "react-dom/client";
import { BounceCards } from "../src/react/index.js";

/* 独立预览 — 深色画布上摆三种姿态：默认扇形、上翘弧形加厚框和
   低回弹紧凑扇；悬停看摆正与推开，点击看压扁脉冲。 */


const images = [
  "./assets/demo-photos/photo-01.jpg",
  "./assets/demo-photos/photo-02.jpg",
  "./assets/demo-photos/photo-03.jpg",
  "./assets/demo-photos/photo-04.jpg",
  "./assets/demo-photos/photo-05.jpg",
];

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
    }}
  >
    <BounceCards
      images={images}
      containerWidth={420}
      containerHeight={300}
      cardSize={150}
      spread={90}
      rotation={10}
      animationDelay={0.3}
      onCardClick={(index) => console.log(index)}
    />
    <BounceCards
      images={images}
      containerWidth={420}
      containerHeight={300}
      cardSize={150}
      spread={80}
      arc={-90}
      rotation={12}
      borderWidth={8}
      radius={30}
      bounciness={0.9}
      animationDelay={0.5}
    />
    <BounceCards
      images={images.slice(0, 3)}
      containerWidth={340}
      containerHeight={220}
      cardSize={120}
      spread={70}
      rotation={6}
      bounciness={0.2}
      hoverScale={1.2}
      borderColor="#f5a524"
      animationDelay={0.7}
    />
  </div>,
);
