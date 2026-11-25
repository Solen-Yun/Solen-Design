import { API } from "./liquid-ether.jsx";
import entrySource from "../../src/components/liquid-ether/LiquidEther.jsx?raw";
import cssSource from "../../src/components/liquid-ether/LiquidEther.css?raw";
import specSource from "../../src/components/liquid-ether/SPEC.md?raw";

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
        { name: "LiquidEther.jsx", code: entrySource },
        { name: "LiquidEther.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { LiquidEther } from "solen-design/react";

<div style={{ position: "relative", height: 320 }}>
  <LiquidEther
    colors={["#5227FF", "#FF9FFC", "#B497CF"]}
    mouseForce={20}
    cursorSize={100}
    persistence={0.75}
    resolution={0.5}
    autoDemo={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
