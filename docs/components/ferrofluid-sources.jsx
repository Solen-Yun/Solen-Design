import { API } from "./ferrofluid.jsx";
import entrySource from "../../src/components/ferrofluid/Ferrofluid.jsx?raw";
import cssSource from "../../src/components/ferrofluid/Ferrofluid.css?raw";
import specSource from "../../src/components/ferrofluid/SPEC.md?raw";

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
        { name: "Ferrofluid.jsx", code: entrySource },
        { name: "Ferrofluid.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Ferrofluid } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420 }}>
  <Ferrofluid
    colors={["#ffffff", "#cfe8ff"]}
    speed={0.5}
    scale={1.6}
    spikeHeight={1}
    sharpness={2.5}
    tilt={48}
    magnetism={1}
    mouseStrength={1}
    mouseRadius={0.22}
    mouseInteraction={true}
    clickPulse={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
