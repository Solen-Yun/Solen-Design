import { createRoot } from "react-dom/client";
import { ScrollFloat } from "../src/react/index.js";

/* The standalone preview — three headings spaced down the page: the
   stretchy baseline float, a bobbing wave with a colour shift, and a
   seeded scatter; scroll to scrub them, scroll back to rewind. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "320vh",
      background: "#101014",
      colorScheme: "dark",
      color: "#e4e4e7",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-around",
      padding: "18vh 8vw",
      boxSizing: "border-box",
    }}
  >
    <ScrollFloat effect="float" order="start" stagger={0.03} stretch={2.6}>
      浮回原位
    </ScrollFloat>
    <ScrollFloat effect="wave" order="center" stagger={0.035} fromColor="#7dd3fc" distance={150}>
      WAVE LINE
    </ScrollFloat>
    <ScrollFloat effect="scatter" order="random" stagger={0.02} animationDuration={1.2}>
      散落漂移归位
    </ScrollFloat>
  </div>,
);
