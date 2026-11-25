import { API } from "./dot-grid.jsx";
import entrySource from "../../src/components/dot-grid/DotGrid.jsx?raw";
import cssSource from "../../src/components/dot-grid/DotGrid.css?raw";
import specSource from "../../src/components/dot-grid/SPEC.md?raw";

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
        { name: "DotGrid.jsx", code: entrySource },
        { name: "DotGrid.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { DotGrid } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420 }}>
  <DotGrid
    dotSize={5}
    gap={18}
    baseColor="#3a3446"
    activeColor="#ffffff"
    proximity={140}
    bounce={0.6}
    tension={0.4}
    shockStrength={5}
    mouseInteraction={true}
    clickShock={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
