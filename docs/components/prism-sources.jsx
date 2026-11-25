import { API } from "./prism.jsx";
import entrySource from "../../src/components/prism/Prism.jsx?raw";
import cssSource from "../../src/components/prism/Prism.css?raw";
import specSource from "../../src/components/prism/SPEC.md?raw";

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
        { name: "Prism.jsx", code: entrySource },
        { name: "Prism.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Prism } from "solen-design/react";

<div style={{ width: "100%", height: 520, position: "relative" }}>
  <Prism
    height={3.5}
    baseWidth={5.5}
    animationType="rotate"
    glow={1}
    scale={3.6}
    hueShift={0}
    colorFrequency={1}
    saturation={1.5}
    timeScale={0.5}
    interactive
    hoverStrength={2}
    inertia={0.05}
    resolution={0.5}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
