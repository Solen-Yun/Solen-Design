import { API } from "./pixel-transition.jsx";
import entrySource from "../../src/components/pixel-transition/PixelTransition.jsx?raw";
import cssSource from "../../src/components/pixel-transition/PixelTransition.css?raw";
import specSource from "../../src/components/pixel-transition/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom",
        pnpm: "pnpm add react react-dom",
        yarn: "yarn add react react-dom",
        bun: "bun add react react-dom",
      },
      files: [
        { name: "PixelTransition.jsx", code: entrySource },
        { name: "PixelTransition.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { PixelTransition } from "solen-design/react";

<PixelTransition
  gridSize={10}
  pixelColor="#ffffff"
  mosaic={0}
  animationStepDuration={0.4}
  pattern="random"
  pixelAnimation="pop"
  pixelShape="square"
  trigger="hover"
  aspectRatio="100%"
  firstContent={
    <div style={{ background: "linear-gradient(140deg, #6366f1, #a855f7)" }} />
  }
  secondContent={
    <div style={{ background: "linear-gradient(140deg, #0f172a, #155e75)" }} />
  }
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
