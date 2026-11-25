import { createRoot } from "react-dom/client";
import { StaggeredMenu } from "../src/react/index.js";

/* The standalone preview — two relative stages on the dark canvas, one
   opening from the right, one from the left; press the word button to run
   the staggered choreography. */
const items = [
  { label: "首页", link: "#", ariaLabel: "首页" },
  { label: "组件", link: "#", ariaLabel: "组件" },
  { label: "风格", link: "#", ariaLabel: "风格" },
  { label: "文档", link: "#", ariaLabel: "文档" },
];
const socials = [
  { label: "Email", link: "#" },
  { label: "Blog", link: "#" },
];

function Stage({ position, colors, accent, children }) {
  return (
    <div
      style={{
        position: "relative",
        width: "min(720px, 92vw)",
        height: 320,
        overflow: "hidden",
        borderRadius: 18,
        background: "#18181b",
        boxShadow: "0 24px 60px -30px rgba(0, 0, 0, 0.9)",
      }}
    >
      {children}
      <span
        style={{
          position: "absolute",
          left: position === "left" ? 24 : "auto",
          right: position === "right" ? 24 : "auto",
          top: "50%",
          color: "rgba(255, 255, 255, 0.35)",
          fontSize: 14,
          letterSpacing: "0.1em",
        }}
      >
        {position === "right" ? "从右侧滑入" : "从左侧滑入"}
      </span>
    </div>
  );
}

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
    <Stage position="right" colors={["#B497CF", "#5227FF"]} accent="#5227FF">
      <StaggeredMenu
        items={items}
        socialItems={socials}
        position="right"
        colors={["#B497CF", "#5227FF"]}
        accentColor="#5227FF"
        menuButtonColor="#ffffff"
        openMenuButtonColor="#18181b"
      />
    </Stage>
    <Stage position="left" colors={["#5227FF", "#B497CF"]} accent="#B497CF">
      <StaggeredMenu
        items={items}
        socialItems={socials}
        position="left"
        colors={["#5227FF", "#B497CF"]}
        accentColor="#B497CF"
        menuButtonColor="#ffffff"
        openMenuButtonColor="#18181b"
        displayItemNumbering={false}
      />
    </Stage>
  </div>,
);
