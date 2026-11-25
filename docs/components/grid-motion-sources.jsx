import { API } from "./grid-motion.jsx";
import entrySource from "../../src/components/grid-motion/GridMotion.jsx?raw";
import cssSource from "../../src/components/grid-motion/GridMotion.css?raw";
import specSource from "../../src/components/grid-motion/SPEC.md?raw";

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
        { name: "GridMotion.jsx", code: entrySource },
        { name: "GridMotion.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GridMotion } from "solen-design/react";

const items = ["✦", "雾", "◇", "尘", "▲", "浪", "●", "霜"];

<div style={{ position: "relative", height: 420 }}>
  <GridMotion
    items={items}
    rows={4}
    angle={-12}
    speed={24}
    parallax={0.5}
    spotlight={0.6}
    dim={0.35}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
