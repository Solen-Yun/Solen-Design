import { API } from "./grid-scan.jsx";
import entrySource from "../../src/components/grid-scan/GridScan.jsx?raw";
import cssSource from "../../src/components/grid-scan/GridScan.css?raw";
import specSource from "../../src/components/grid-scan/SPEC.md?raw";

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
        { name: "GridScan.jsx", code: entrySource },
        { name: "GridScan.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GridScan } from "solen-design/react";

<div style={{ position: "relative", height: 420 }}>
  <GridScan
    cells={8}
    depth={3}
    scanDirection="forward"
    scanDuration={2.4}
    scanDelay={1.6}
    glow={0.6}
    clickEffect="ping"
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
