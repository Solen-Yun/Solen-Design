import { createRoot } from "react-dom/client";
import { PaperCrumple } from "../src/react/index.js";

/* The standalone preview — three sheets with different fold characters:
   one crumpled deep with soft release, one creased, one flat at rest. */
const IMG = "./assets/wallpaper-05.jpg";

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 32,
      background: "#101014",
      color: "#f5f5f5",
    }}
  >
    <PaperCrumple src={IMG} alt="可揉捏的海报一" width={260} height={340} sceneHeight={400} crumpleAmount={0.9} releaseBehavior="restore" />
    <PaperCrumple src={IMG} alt="可揉捏的海报二" width={260} height={340} sceneHeight={400} crumpleAmount={0.7} releaseBehavior="creased" creaseStrength={0.35} foldCount={9} seed={23} />
    <PaperCrumple src={IMG} alt="可揉捏的海报三" width={260} height={340} sceneHeight={400} crumpleAmount={0.5} releaseBehavior="stay" foldCount={12} foldSharpness={0.85} seed={41} />
  </div>,
);
