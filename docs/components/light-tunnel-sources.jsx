import { API } from "./light-tunnel.jsx";
import entrySource from "../../src/components/light-tunnel/LightTunnel.jsx?raw";
import cssSource from "../../src/components/light-tunnel/LightTunnel.css?raw";
import specSource from "../../src/components/light-tunnel/SPEC.md?raw";

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
        { name: "LightTunnel.jsx", code: entrySource },
        { name: "LightTunnel.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { LightTunnel } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 480 }}>
  <LightTunnel
    cableColor="#8892b0"
    pulseColor="#8be9fd"
    cableCount={56}
    thickness={0.35}
    pulseSpeed={2}
    pulseDensity={0.5}
    flowDirection="inward"
    clickSurge
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
