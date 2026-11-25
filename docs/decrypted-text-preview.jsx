import { createRoot } from "react-dom/client";
import { DecryptedText } from "../src/react/index.js";

/* 独立预览——三种解密姿态：青色着色乱码标题、渐显段落、翻面小字；
   悬停第一行可重新打散解密。 */

const stage = { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 72, background: "#101014", color: "#e4e4e7" };

createRoot(document.getElementById("root")).render(
  <div style={stage}>
    <div style={{ fontSize: 48, fontWeight: 800 }}>
      <DecryptedText text="ACCESS GRANTED" animateOn="hover" effect="scramble" speed={40} maxIterations={10} scrambleColor="#22d3ee" />
    </div>
    <div style={{ width: "min(560px, 92vw)", fontSize: 20, fontWeight: 500, opacity: 0.9 }}>
      <DecryptedText
        text="Every character cycles the pool before it locks."
        animateOn="view"
        effect="fade"
        speed={36}
        maxIterations={14}
      />
    </div>
    <div style={{ fontSize: 16, fontWeight: 600, opacity: 0.65 }}>
      <DecryptedText
        text="flip · flip · decrypt"
        animateOn="view"
        effect="flip"
        speed={30}
        maxIterations={6}
        sequential={true}
      />
    </div>
  </div>,
);
