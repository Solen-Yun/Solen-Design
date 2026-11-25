import { createRoot } from "react-dom/client";
import { ASCIIText } from "../src/react/index.js";

/* 独立预览——三块字符浪潮：默认暖色大标题、冷灰块状、小号紫蓝；移动指针看
   平面倾斜与色相漂移，悬停打散、点击看波纹扩散。 */

const PANEL = (width, height) => ({ position: "relative", width, height });

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 56,
      background: "#101014",
    }}
  >
    <div style={PANEL("min(680px, 92vw)", 300)}>
      <ASCIIText text="Solen" asciiFontSize={9} />
    </div>
    <div style={PANEL("min(560px, 92vw)", 220)}>
      <ASCIIText
        text="HEY!"
        colors={["#f4f4f5", "#a1a1aa", "#52525b"]}
        blocks={0.15}
        waves={0.4}
        chroma={0.2}
        hueShift={0.3}
      />
    </div>
    <div style={PANEL("min(420px, 92vw)", 170)}>
      <ASCIIText
        text="ascii"
        asciiFontSize={6}
        textScale={0.85}
        colors={["#7dd3fc", "#818cf8", "#c084fc"]}
        hueShift={0.5}
      />
    </div>
  </div>,
);
