import { API } from "./liquid-chrome.jsx";
import entrySource from "../../src/components/liquid-chrome/LiquidChrome.jsx?raw";
import cssSource from "../../src/components/liquid-chrome/LiquidChrome.css?raw";
import specSource from "../../src/components/liquid-chrome/SPEC.md?raw";

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
        { name: "LiquidChrome.jsx", code: entrySource },
        { name: "LiquidChrome.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { LiquidChrome } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 480 }}>
  <LiquidChrome
    color="#ffffff"
    speed={0.2}
    amplitude={0.3}
    thickness={1}
    roughness={0.3}
    rippleStrength={1}
    tilt={1}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
