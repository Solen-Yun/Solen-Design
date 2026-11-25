import { createRoot } from "react-dom/client";
import { default as InfiniteSpiral } from "../src/components/spiral-image-ring/InfiniteSpiral.jsx";

/* 独立预览 — 深色画布上两条环带：左环自动向上盘旋、悬停暂停；
   右环随页面滚动走、更大更疏，看同一套参数的两种姿态。 */
const ITEMS = ["./assets/wallpaper-01.jpg", "./assets/wallpaper-02.jpg", "./assets/wallpaper-03.jpg", "./assets/wallpaper-04.jpg", "./assets/wallpaper-05.jpg", "./assets/wallpaper-06.jpg", "./assets/wallpaper-07.jpg", "./assets/wallpaper-08.jpg"].map((src, index) => ({ src, alt: `主题图 ${index + 1}`, id: `photo-${index}` }));

createRoot(document.getElementById("root")).render(
  <div style={{ minHeight: "100vh", background: "#101014", padding: "40px 0" }}>
    <div style={{ height: 360 }}>
      <InfiniteSpiral items={ITEMS} cardWidth={100} cardHeight={100} />
    </div>
    <div style={{ height: 420 }}>
      <InfiniteSpiral
        items={ITEMS}
        animationMode="scroll"
        speed={0.8}
        direction="down"
        cardWidth={130}
        cardHeight={130}
        radius={210}
        verticalSpacing={90}
        cardsPerTurn={9}
        centerScale={1.1}
        edgeBlur={5}
      />
    </div>
  </div>,
);
