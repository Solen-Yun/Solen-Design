import { API } from "./shape-grid.jsx";
import entrySource from "../../src/components/shape-grid/ShapeGrid.jsx?raw";
import cssSource from "../../src/components/shape-grid/ShapeGrid.css?raw";
import specSource from "../../src/components/shape-grid/SPEC.md?raw";

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
        { name: "ShapeGrid.jsx", code: entrySource },
        { name: "ShapeGrid.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ShapeGrid } from "solen-design/react";

<div style={{ width: "100%", height: 520, position: "relative" }}>
  <ShapeGrid
    shape="square"
    cellSize={40}
    lineWidth={1}
    direction="diagonal"
    speed={0.5}
    lineColor="#2a2734"
    hoverColor="#ffffff"
    fillOpacity={0.15}
    rainbow={false}
    tiltX={0}
    tiltY={0}
    radius={1.5}
    trail={0.6}
    glow={0.35}
    twinkle={0}
    clickCascade
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
