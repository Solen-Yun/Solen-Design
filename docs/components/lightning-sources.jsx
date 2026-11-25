import { API } from "./lightning.jsx";
import entrySource from "../../src/components/lightning/Lightning.jsx?raw";
import cssSource from "../../src/components/lightning/Lightning.css?raw";
import specSource from "../../src/components/lightning/SPEC.md?raw";

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
        { name: "Lightning.jsx", code: entrySource },
        { name: "Lightning.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Lightning } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 480 }}>
  <Lightning
    color="#4d6bff"
    bolts={1}
    branches={0.5}
    flicker={0.6}
    glow={1}
    mouseStrength={1}
    clickStrike
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
