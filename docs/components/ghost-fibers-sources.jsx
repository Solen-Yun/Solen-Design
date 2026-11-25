import { API } from "./ghost-fibers.jsx";
import entrySource from "../../src/components/ghost-fibers/GhostFibers.jsx?raw";
import cssSource from "../../src/components/ghost-fibers/GhostFibers.css?raw";
import specSource from "../../src/components/ghost-fibers/SPEC.md?raw";

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
        { name: "GhostFibers.jsx", code: entrySource },
        { name: "GhostFibers.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GhostFibers } from "solen-design/react";

<div style={{ position: "relative", height: 420 }}>
  <GhostFibers
    glowColor="#8b5cf6"
    gradient="depth"
    fiberStyle="dots"
    hoverEffect="focus"
    pulseOnClick={true}
    speed={0.5}
    glow={0.8}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
