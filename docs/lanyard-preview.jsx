import { createRoot } from "react-dom/client";
import { Lanyard } from "../src/react/index.js";

/* 工牌吊绳：左边织带吊着一块正反双面的工牌，右边换成镭射面 + 金色金属件；拖拽、甩动、点击翻面随便玩。 */
const front = "./assets/demo-photos/photo-01.jpg";
const back = "./assets/demo-photos/photo-02.jpg";

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 32,
      background: "#101014",
      flexWrap: "wrap",
    }}
  >
    <div style={{ width: 420, height: 520 }}>
      <Lanyard frontImage={front} backImage={back} strapImage={strap()} />
    </div>
    <div style={{ width: 420, height: 520 }}>
      <Lanyard frontImage={back} backImage={front} finish="holographic" metal="gold" anchor="right" breeze={0.7} elasticity={0.8} />
    </div>
  </div>,
);
