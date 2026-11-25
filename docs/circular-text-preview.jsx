import { createRoot } from "react-dom/client";
import { CircularText } from "../src/react/index.js";

/* 独立预览——三个环：默认加速悬停、疯狂模式小环、可拖拽甩动的大环；
   悬停看变速，抓住第三个环甩一巴掌看惯性。 */

const canvas = { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 64, background: "#101014", color: "#fafafa" };

createRoot(document.getElementById("root")).render(
  <div style={canvas}>
    <CircularText text="Solen Design • Solen Design • " size={220} fontSize={21} spinDuration={18} onHover="speedUp" color="#fafafa" />
    <CircularText text="GO BONKERS · GO BONKERS · " size={150} fontSize={15} spinDuration={26} onHover="goBonkers" color="#a1a1aa" ring={true} />
    <CircularText
      text="GRAB & FLING · GRAB & FLING · "
      size={240}
      fontSize={20}
      spinDuration={30}
      draggable={true}
      color="#fafafa"
      tilt={8}
    />
  </div>,
);
