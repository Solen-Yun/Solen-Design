import { API } from "./line-waves.jsx";
import entrySource from "../../src/components/line-waves/LineWaves.jsx?raw";
import cssSource from "../../src/components/line-waves/LineWaves.css?raw";
import specSource from "../../src/components/line-waves/SPEC.md?raw";

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
        { name: "LineWaves.jsx", code: entrySource },
        { name: "LineWaves.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { LineWaves } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 480 }}>
  <LineWaves
    color1="#7c5cff"
    color2="#00e0ff"
    color3="#ff4fd8"
    speed={0.3}
    lineCount={72}
    lineWidth={1.3}
    highlight={1}
    warpIntensity={1}
    rotation={-33}
    clickRipple
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
