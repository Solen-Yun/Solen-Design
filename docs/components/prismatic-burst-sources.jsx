import { API } from "./prismatic-burst.jsx";
import entrySource from "../../src/components/prismatic-burst/PrismaticBurst.jsx?raw";
import cssSource from "../../src/components/prismatic-burst/PrismaticBurst.css?raw";
import specSource from "../../src/components/prismatic-burst/SPEC.md?raw";

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
        { name: "PrismaticBurst.jsx", code: entrySource },
        { name: "PrismaticBurst.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { PrismaticBurst } from "solen-design/react";

<div style={{ width: "100%", height: 520, position: "relative" }}>
  <PrismaticBurst
    intensity={2}
    speed={0.5}
    animationType="rotate3d"
    rayCount={0}
    rayWidth={1}
    zoom={1}
    twist={0}
    flow={0}
    centerFade={1}
    grain={0.8}
    glow={0}
    mouseStrength={0.5}
    hoverDampness={0.25}
    mouseInteraction
    clickBurst
    quality="high"
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
