import { createRoot } from "react-dom/client";
import { RefineFrame } from "../src/react/index.js";

/* The standalone preview — one frame per stage on the dark canvas:
   queued, generating, refining and complete, all mid-resolving. */
const IMG = "./assets/wallpaper-04.jpg";

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 28,
      background: "#101014",
      color: "#f5f5f5",
    }}
  >
    <RefineFrame status="queued" width={240} aspectRatio="4 / 3">
      <img src={IMG} alt="排队中" />
    </RefineFrame>
    <RefineFrame status="generating" width={240} aspectRatio="4 / 3">
      <img src={IMG} alt="生成中" />
    </RefineFrame>
    <RefineFrame status="refining" width={240} aspectRatio="4 / 3">
      <img src={IMG} alt="精修中" />
    </RefineFrame>
    <RefineFrame status="complete" width={240} aspectRatio="4 / 3" hideAfter={0}>
      <img src={IMG} alt="已完成" />
    </RefineFrame>
  </div>,
);
