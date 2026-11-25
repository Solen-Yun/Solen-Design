import { API } from "./topography.jsx";
import entrySource from "../../src/components/topography/Topography.jsx?raw";
import cssSource from "../../src/components/topography/Topography.css?raw";
import specSource from "../../src/components/topography/SPEC.md?raw";

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
        { name: "Topography.jsx", code: entrySource },
        { name: "Topography.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Topography } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420 }}>
  <Topography
    color="#4f7cff"
    lineCount={22}
    lineWidth={1.2}
    majorLines={true}
    elevation={1}
    tilt={32}
    speed={0.25}
    direction="forward"
    morph={0.2}
    glow={0.6}
    depthOfField={0.4}
    fog={0.35}
    hoverEffect="lift"
    clickEffect="pulse"
    mouseInteraction={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
