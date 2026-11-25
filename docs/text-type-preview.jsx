import { createRoot } from "react-dom/client";
import { TextType } from "../src/react/index.js";

/* The standalone preview — a bar cursor typing a single line, a block
   cursor looping through sentences, and a prefix line with human-like
   typos; watch the cursor glide and the mistakes fix themselves. */
createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 56,
      background: "#101014",
      colorScheme: "dark",
      padding: "0 24px",
    }}
  >
    <TextType
      text="设计是把复杂叠进简单的过程。"
      typingSpeed={55}
      cursorStyle="bar"
      cursorColor="#7dd3fc"
      typeEffect="blur"
      style={{ fontSize: 30, fontWeight: 600, color: "#e4e4e7", textAlign: "center" }}
    />
    <TextType
      text={["你好，世界。", "Hello, Typewriter!", "打字机效果 ✦ 逐字浮现"]}
      typingSpeed={45}
      deletingSpeed={25}
      cursorStyle="block"
      textColors={["#e4e4e7", "#7dd3fc", "#ffb03d"]}
      style={{ fontSize: 24, fontWeight: 600, color: "#e4e4e7", textAlign: "center" }}
    />
    <TextType
      text="typing with human mistakes..."
      typingSpeed={38}
      mistakes={0.9}
      prefix="$ "
      prefixColor="#a3e635"
      cursorStyle="underscore"
      style={{ fontSize: 20, fontWeight: 500, color: "#a1a1aa", textAlign: "center" }}
    />
  </div>,
);
