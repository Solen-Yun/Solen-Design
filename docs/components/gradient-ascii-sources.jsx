import { API } from "./gradient-ascii.jsx";
import entrySource from "../../src/components/gradient-ascii/GradientASCII.jsx?raw";
import cssSource from "../../src/components/gradient-ascii/GradientASCII.css?raw";
import specSource from "../../src/components/gradient-ascii/SPEC.md?raw";

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
        { name: "GradientASCII.jsx", code: entrySource },
        { name: "GradientASCII.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GradientASCII } from "solen-design/react";

<div style={{ position: "relative", height: 420 }}>
  <GradientASCII
    shape="horizon"
    cellSize={18}
    density={0.8}
    clickEffect="wave"
    scrambleRadius={0.1}
    glow={0.2}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
