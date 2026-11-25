import { API } from "./light-pillar.jsx";
import entrySource from "../../src/components/light-pillar/LightPillar.jsx?raw";
import cssSource from "../../src/components/light-pillar/LightPillar.css?raw";
import specSource from "../../src/components/light-pillar/SPEC.md?raw";

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
        { name: "LightPillar.jsx", code: entrySource },
        { name: "LightPillar.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { LightPillar } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 480 }}>
  <LightPillar
    topColor="#5227FF"
    bottomColor="#FF9FFC"
    intensity={1}
    rotationSpeed={0.3}
    bloom={0.5}
    pillarWidth={3}
    pillarRotation={25}
    clickPulse
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
