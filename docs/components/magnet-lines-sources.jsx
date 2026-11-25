import { API } from "./magnet-lines.jsx";
import entrySource from "../../src/components/magnet-lines/MagnetLines.jsx?raw";
import cssSource from "../../src/components/magnet-lines/MagnetLines.css?raw";
import specSource from "../../src/components/magnet-lines/SPEC.md?raw";

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
        { name: "MagnetLines.jsx", code: entrySource },
        { name: "MagnetLines.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { MagnetLines } from "solen-design/react";

<div style={{ height: 320 }}>
  <MagnetLines
    spacing={30}
    lineColor="#efefef"
    lineWidth={2}
    lineHeight={18}
    baseAngle={-10}
    mode="orbit"
    radius={200}
    fade={0.65}
    stretch={0.4}
    inertia={0.35}
    ripple={0.3}
    clickPulse={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
