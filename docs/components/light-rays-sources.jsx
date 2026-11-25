import { API } from "./light-rays.jsx";
import entrySource from "../../src/components/light-rays/LightRays.jsx?raw";
import cssSource from "../../src/components/light-rays/LightRays.css?raw";
import specSource from "../../src/components/light-rays/SPEC.md?raw";

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
        { name: "LightRays.jsx", code: entrySource },
        { name: "LightRays.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { LightRays } from "solen-design/react";

<div style={{ width: "100%", height: 600, position: "relative" }}>
  <LightRays
    raysOrigin="top-center"
    raysColor="#ffffff"
    raysSpeed={1}
    lightSpread={0.5}
    rayLength={3}
    glow={0.6}
    haze={0.25}
    followMouse
    mouseInfluence={0.1}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
