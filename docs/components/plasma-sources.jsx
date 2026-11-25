import { API } from "./plasma.jsx";
import entrySource from "../../src/components/plasma/Plasma.jsx?raw";
import cssSource from "../../src/components/plasma/Plasma.css?raw";
import specSource from "../../src/components/plasma/SPEC.md?raw";

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
        { name: "Plasma.jsx", code: entrySource },
        { name: "Plasma.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Plasma } from "solen-design/react";

<div style={{ width: "100%", height: 520, position: "relative" }}>
  <Plasma
    color="#a6a3b8"
    speed={1}
    direction="forward"
    scale={1}
    twist={1}
    wave={1}
    softness={0.5}
    shine={1}
    brightness={1}
    grain={0.04}
    quality={0.75}
    mouseInteractive
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
