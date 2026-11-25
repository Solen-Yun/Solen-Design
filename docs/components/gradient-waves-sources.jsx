import { API } from "./gradient-waves.jsx";
import entrySource from "../../src/components/gradient-waves/GradientWaves.jsx?raw";
import cssSource from "../../src/components/gradient-waves/GradientWaves.css?raw";
import specSource from "../../src/components/gradient-waves/SPEC.md?raw";

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
        { name: "GradientWaves.jsx", code: entrySource },
        { name: "GradientWaves.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GradientWaves } from "solen-design/react";

<div style={{ position: "relative", height: 420 }}>
  <GradientWaves
    horizonColor="#5227FF"
    waveColor="#FF9FFC"
    crestColor="#FFFFFF"
    speed={0.4}
    tilt={64}
    swellOnClick={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
