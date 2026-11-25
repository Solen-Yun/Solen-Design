import { API } from "./cursor-grid.jsx";
import entrySource from "../../src/components/cursor-grid/CursorGrid.jsx?raw";
import cssSource from "../../src/components/cursor-grid/CursorGrid.css?raw";
import specSource from "../../src/components/cursor-grid/SPEC.md?raw";

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
        { name: "CursorGrid.jsx", code: entrySource },
        { name: "CursorGrid.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { CursorGrid } from "solen-design/react";

<div style={{ height: "100vh" }}>
  <CursorGrid cellSize={60} radius={140} spotlight={0.6} clickPulse={true}>
    <div style={{ display: "grid", placeItems: "center", height: "100%" }}>
      <h2>内容叠在网格之上</h2>
    </div>
  </CursorGrid>
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
