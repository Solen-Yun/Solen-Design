import { API } from "./flux-lines.jsx";
import entrySource from "../../src/components/flux-lines/FluxLines.jsx?raw";
import cssSource from "../../src/components/flux-lines/FluxLines.css?raw";
import specSource from "../../src/components/flux-lines/SPEC.md?raw";

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
        { name: "FluxLines.jsx", code: entrySource },
        { name: "FluxLines.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { FluxLines } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420 }}>
  <FluxLines
    colors={["#ffffff", "#9fd8ff", "#3b6cff"]}
    speed={0.5}
    scale={1.6}
    glow={2}
    mouseStrength={1}
    mouseRadius={0.35}
    mouseInteraction={true}
    clickSwirl={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
