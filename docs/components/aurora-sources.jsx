import { API } from "./aurora.jsx";
import entrySource from "../../src/components/aurora/Aurora.jsx?raw";
import cssSource from "../../src/components/aurora/Aurora.css?raw";
import specSource from "../../src/components/aurora/SPEC.md?raw";

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
        { name: "Aurora.jsx", code: entrySource },
        { name: "Aurora.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Aurora } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: "100vh", background: "#101014" }}>
  <Aurora
    colorStops={["#5227FF", "#7cff67", "#5227FF"]}
    amplitude={1}
    blend={0.5}
    speed={1}
    height={0.45}
    glow={0.6}
    layers={1}
    direction="top"
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
