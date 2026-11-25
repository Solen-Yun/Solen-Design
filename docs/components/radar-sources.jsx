import { API } from "./radar.jsx";
import entrySource from "../../src/components/radar/Radar.jsx?raw";
import cssSource from "../../src/components/radar/Radar.css?raw";
import specSource from "../../src/components/radar/SPEC.md?raw";

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
        { name: "Radar.jsx", code: entrySource },
        { name: "Radar.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Radar } from "solen-design/react";

<div style={{ width: "100%", height: 520, position: "relative" }}>
  <Radar
    color="#3ef09a"
    mode="sweep"
    speed={1}
    trail={0.35}
    scale={0.9}
    ringCount={6}
    spokeCount={12}
    ticks
    targets={6}
    clutter={0.35}
    glow={1}
    gridOpacity={1}
    lineWidth={1}
    tilt={0}
    mouseInteraction
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
