import { API } from "./blur-text.jsx";
import entrySource from "../../src/components/blur-text/BlurText.jsx?raw";
import specSource from "../../src/components/blur-text/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom motion",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom motion",
        pnpm: "pnpm add react react-dom motion",
        yarn: "yarn add react react-dom motion",
        bun: "bun add react react-dom motion",
      },
      files: [{ name: "BlurText.jsx", code: entrySource }],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { BlurText } from "solen-design/react";

<BlurText
  text="Blurring the line between noise and words"
  delay={200}
  animateBy="words"
  direction="top"
  effect="blur"
  blur={10}
  distance={50}
  staggerFrom="start"
  trigger="view"
  stepDuration={0.35}
  onAnimationComplete={() => console.log("settled")}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
