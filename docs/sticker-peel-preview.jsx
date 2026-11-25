import { createRoot } from "react-dom/client";
import { StickerPeel } from "../src/react/index.js";

/* 贴纸撕揭：左上亮面星星贴纸，右上哑面圆形贴纸，中间全息镭射大贴纸；
   每张贴纸都可以抓起来撕边、甩动、抛掷。 */
createRoot(document.getElementById("root")).render(
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#101014" }}>
    <div style={{ position: "relative", flex: 1, minHeight: 220, overflow: "hidden" }}>
      <StickerPeel imageSrc={"./assets/demo-photos/photo-01.jpg"} width={120} rotate={-10} finish="gloss" />
    </div>
    <div style={{ position: "relative", flex: 1, minHeight: 220, overflow: "hidden" }}>
      <StickerPeel imageSrc={"./assets/demo-photos/photo-02.jpg"} width={110} rotate={8} finish="matte" backColor="#52525b" intro={false} initialPosition={{ x: 120, y: 0 }} />
    </div>
    <div style={{ position: "relative", flex: 1.4, minHeight: 260, overflow: "hidden" }}>
      <StickerPeel imageSrc={"./assets/demo-photos/photo-03.jpg"} width={150} rotate={-6} finish="holo" lightingIntensity={0.7} intro={false} />
    </div>
  </div>,
);
