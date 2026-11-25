import { API } from "./border-glow.jsx";
import entrySource from "../../src/components/border-glow/BorderGlow.jsx?raw";
import cssSource from "../../src/components/border-glow/BorderGlow.css?raw";
import specSource from "../../src/components/border-glow/SPEC.md?raw";

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
        { name: "BorderGlow.jsx", code: entrySource },
        { name: "BorderGlow.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { BorderGlow } from "solen-design/react";

<BorderGlow
  backgroundColor="#120F17"
  glowColor="268 90 76"
  colors={["#c084fc", "#f472b6", "#38bdf8"]}
  borderRadius={28}
  glowRadius={40}
  glowIntensity={1.0}
  coneSpread={25}
  edgeSensitivity={30}
  fillOpacity={0.5}
  animated={false}
  style={{ padding: 24 }}
>
  <h3>网格渐变边框</h3>
</BorderGlow>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
