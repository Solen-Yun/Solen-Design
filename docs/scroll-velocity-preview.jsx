import { createRoot } from "react-dom/client";
import { ScrollVelocity } from "../src/react/index.js";

/* The standalone preview — two rows on the dark canvas crawling in
   opposite directions with outline alternation and edge fading; scroll
   the page to feel the velocity coupling, or drag the rows directly. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "160vh",
      paddingTop: "40vh",
      background: "#101014",
    }}
  >
    <ScrollVelocity
      texts={["滚动加速 SCROLL FASTER", "逆行掉头 REVERSE REVERSE"]}
      velocity={90}
      separator="✦"
      fadeEdges
      outlineAlternate
      draggable
      skewWithVelocity={12}
      color="#e4e4e7"
      fontSize={56}
      fontWeight={800}
    />
    <p
      style={{
        marginTop: 48,
        textAlign: "center",
        color: "#52525b",
        fontSize: 14,
        letterSpacing: "0.1em",
      }}
    >
      上下滚动页面，看速度耦合；抓住条带可以直接甩。
    </p>
  </div>,
);
