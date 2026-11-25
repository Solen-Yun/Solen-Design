import { createRoot } from "react-dom/client";
import { ScrollReveal } from "../src/react/index.js";

/* The standalone preview — three headings spaced down the page: a masked
   char rise that straightens the block, a blurred word fade with a colour
   wash, and a flipped line; scroll to scrub them, scroll back to rewind. */
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
    <ScrollReveal effect="rise" splitBy="chars" stagger={0.03} baseRotation={4}>
      显影从模糊里醒来
    </ScrollReveal>
    <ScrollReveal effect="fade" splitBy="words" stagger={0.08} highlightColor="#7dd3fc" smoothing={0.8}>
      每一个词依次落在焦点上，高光扫过又回落
    </ScrollReveal>
    <ScrollReveal effect="flip" splitBy="words" stagger={0.05} mode="enter" duration={0.9}>
      翻过身来的这一行只播放一次
    </ScrollReveal>
  </div>,
);
