import { API } from "./beams.jsx";
import entrySource from "../../src/components/beams/Beams.jsx?raw";
import cssSource from "../../src/components/beams/Beams.css?raw";
import specSource from "../../src/components/beams/SPEC.md?raw";

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
        { name: "Beams.jsx", code: entrySource },
        { name: "Beams.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Beams } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: "100vh", background: "#0a0a0d" }}>
  <Beams
    color="#ffffff"
    beamWidth={140}
    rotation={30}
    speed={1}
    waveLength={233}
    sharpness={0.6}
    glow={0.6}
    brightness={1.6}
    grain={0.35}
    mouseInteraction={true}
    intro={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
