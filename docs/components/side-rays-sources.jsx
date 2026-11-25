import { API } from "./side-rays.jsx";
import entrySource from "../../src/components/side-rays/SideRays.jsx?raw";
import cssSource from "../../src/components/side-rays/SideRays.css?raw";
import specSource from "../../src/components/side-rays/SPEC.md?raw";

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
        { name: "SideRays.jsx", code: entrySource },
        { name: "SideRays.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SideRays } from "solen-design/react";

<div style={{ width: "100%", height: 600, position: "relative" }}>
  <SideRays
    rayColor1="#FFC46B"
    rayColor2="#96c8ff"
    origin="top-right"
    speed={2.5}
    intensity={2}
    spread={2}
    density={5}
    followMouse={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
