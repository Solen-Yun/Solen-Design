import { API } from "./lightfall.jsx";
import entrySource from "../../src/components/lightfall/Lightfall.jsx?raw";
import cssSource from "../../src/components/lightfall/Lightfall.css?raw";
import specSource from "../../src/components/lightfall/SPEC.md?raw";

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
        { name: "Lightfall.jsx", code: entrySource },
        { name: "Lightfall.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Lightfall } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 480 }}>
  <Lightfall
    colors={["#ffffff"]}
    speed={0.3}
    streakCount={2}
    streakLength={1}
    density={0.6}
    twinkle={0.3}
    bloom={0.35}
    holdToWarp
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
