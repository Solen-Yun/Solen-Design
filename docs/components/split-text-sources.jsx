import { API } from "./split-text.jsx";
import entrySource from "../../src/components/split-text/SplitText.jsx?raw";
import specSource from "../../src/components/split-text/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom gsap@^3.13.0 @gsap/react@^2.1.2",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom gsap@^3.13.0 @gsap/react@^2.1.2",
        pnpm: "pnpm add react react-dom gsap@^3.13.0 @gsap/react@^2.1.2",
        yarn: "yarn add react react-dom gsap@^3.13.0 @gsap/react@^2.1.2",
        bun: "bun add react react-dom gsap@^3.13.0 @gsap/react@^2.1.2",
      },
      files: [{ name: "SplitText.jsx", code: entrySource }],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SplitText } from "solen-design/react";

<SplitText
  text="Type that lands letter by letter"
  splitType="chars"
  effect="rise"
  trigger="view"
  delay={50}
  duration={1.25}
  mask={false}
  hoverEffect="lift"
  onLetterAnimationComplete={() => console.log("revealed")}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
