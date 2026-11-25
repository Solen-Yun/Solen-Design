import { API } from "./pixel-swap.jsx";
import entrySource from "../../src/components/pixel-swap/PixelSwap.jsx?raw";
import cssSource from "../../src/components/pixel-swap/PixelSwap.css?raw";
import specSource from "../../src/components/pixel-swap/SPEC.md?raw";

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
        { name: "PixelSwap.jsx", code: entrySource },
        { name: "PixelSwap.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { PixelSwap } from "solen-design/react";

<PixelSwap
  pattern="pointer"
  pixelSize={48}
  pixelRadius={18}
  pixelSpin={90}
  duration={400}
  pixelDuration={350}
  bounce={0.4}
  trigger="hover"
  aspectRatio="16 / 10"
  onComplete={(active) => console.log("settled on", active ? "second" : "first")}
  firstContent={<div style={{ background: "#312e81" }} />}
  secondContent={<div style={{ background: "#0f766e" }} />}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
