import { API } from "./text-type.jsx";
import entrySource from "../../src/components/text-type/TextType.jsx?raw";
import cssSource from "../../src/components/text-type/TextType.css?raw";
import specSource from "../../src/components/text-type/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom gsap",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom gsap",
        pnpm: "pnpm add react react-dom gsap",
        yarn: "yarn add react react-dom gsap",
        bun: "bun add react react-dom gsap",
      },
      files: [
        { name: "TextType.jsx", code: entrySource },
        { name: "TextType.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { TextType } from "solen-design/react";

<TextType
  text={["你好，世界。", "Hello, World!"]}
  typingSpeed={50}
  initialDelay={0}
  pauseDuration={2000}
  deletingSpeed={30}
  deleteMode="backspace"
  loop={true}
  showCursor={true}
  hideCursorWhileTyping={false}
  cursorStyle="bar"
  cursorColor="currentColor"
  cursorBlinkDuration={0.5}
  cursorGlide={true}
  typeEffect="fade"
  mistakes={0}
  onSentenceComplete={(sentence, index) => console.log(index, sentence)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
