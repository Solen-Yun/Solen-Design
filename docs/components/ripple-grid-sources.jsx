import { API } from "./ripple-grid.jsx";
import entrySource from "../../src/components/ripple-grid/RippleGrid.jsx?raw";
import cssSource from "../../src/components/ripple-grid/RippleGrid.css?raw";
import specSource from "../../src/components/ripple-grid/SPEC.md?raw";

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
        { name: "RippleGrid.jsx", code: entrySource },
        { name: "RippleGrid.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { RippleGrid } from "solen-design/react";

<div style={{ width: "100%", height: 520, position: "relative" }}>
  <RippleGrid
    color="#ffffff"
    variant="lines"
    cellSize={48}
    lineWidth={1}
    glow={0.6}
    rippleStrength={1}
    rippleSpeed={1}
    rippleSize={1}
    autoRipple="center"
    rippleInterval={2.6}
    tilt={0}
    rotation={0}
    mouseInteraction
    clickRipple
    fade={0.5}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
