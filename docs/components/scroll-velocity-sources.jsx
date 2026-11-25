import { API } from "./scroll-velocity.jsx";
import entrySource from "../../src/components/scroll-velocity/ScrollVelocity.jsx?raw";
import cssSource from "../../src/components/scroll-velocity/ScrollVelocity.css?raw";
import specSource from "../../src/components/scroll-velocity/SPEC.md?raw";

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
      files: [
        { name: "ScrollVelocity.jsx", code: entrySource },
        { name: "ScrollVelocity.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ScrollVelocity } from "solen-design/react";

<ScrollVelocity
  texts={["滚动加速 SCROLL", "逆行掉头 REVERSE"]}
  velocity={100}
  separator="✦"
  fadeEdges
  outlineAlternate
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
