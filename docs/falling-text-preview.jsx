import { createRoot } from "react-dom/client";
import { FallingText } from "../src/react/index.js";

/* The standalone preview — two physics pits on the dark canvas: plain
   glyphs collapsing with a strong bounce, and dark-theme tiles that
   drift back home after they settle. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      background: "#101014",
    }}
  >
    <div style={{ width: "min(680px, 92vw)", height: 280 }}>
      <FallingText
        text="抓住刚体 随手一甩 堆成一座字山 Drag Throw Pile"
        highlightWords={["刚体", "字山"]}
        trigger="auto"
        bounciness={0.45}
        scatter={0.7}
        cursorPush={0.8}
        fontSize="1.6rem"
        theme="dark"
      />
    </div>
    <div style={{ width: "min(680px, 92vw)", height: 280 }}>
      <FallingText
        text="瓷砖块 落地 成堆 然后回家 TILES"
        highlightWords={["瓷砖块"]}
        trigger="auto"
        variant="tiles"
        theme="dark"
        accentColor="#ffb454"
        gravity={0.6}
        stagger={0.06}
        restoreDelay={3}
        fontSize="1.4rem"
      />
    </div>
  </div>,
);
