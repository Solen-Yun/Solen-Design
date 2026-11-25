import { API } from "./plasma-wave.jsx";
import entrySource from "../../src/components/plasma-wave/PlasmaWave.jsx?raw";
import cssSource from "../../src/components/plasma-wave/PlasmaWave.css?raw";
import specSource from "../../src/components/plasma-wave/SPEC.md?raw";

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
        { name: "PlasmaWave.jsx", code: entrySource },
        { name: "PlasmaWave.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { PlasmaWave } from "solen-design/react";

<div style={{ width: "100%", height: 520, position: "relative" }}>
  <PlasmaWave
    colors={["#A855F7", "#06B6D4"]}
    speed={1}
    speed1={0.05}
    speed2={0.05}
    dir2={1}
    bend1={1}
    bend2={0.5}
    thickness={0.3}
    brightness={1}
    glow={1}
    core={0.6}
    mouseInteraction
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
