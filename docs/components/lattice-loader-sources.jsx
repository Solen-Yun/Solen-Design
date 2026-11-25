import { API } from "./lattice-loader.jsx";
import entrySource from "../../src/components/lattice-loader/LatticeLoader.jsx?raw";
import cssSource from "../../src/components/lattice-loader/LatticeLoader.css?raw";
import specSource from "../../src/components/lattice-loader/SPEC.md?raw";

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
        { name: "LatticeLoader.jsx", code: entrySource },
        { name: "LatticeLoader.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { LatticeLoader } from "solen-design/react";

<LatticeLoader
  status="working"
  pattern="orbit"
  grid={3}
  color="currentColor"
  cellSize={6}
  gap={2}
  fontSize={14}
  step={90}
  glow={false}
  showTimer={true}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
