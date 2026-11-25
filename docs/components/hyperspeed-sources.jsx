import { API } from "./hyperspeed.jsx";
import entrySource from "../../src/components/hyperspeed/Hyperspeed.jsx?raw";
import cssSource from "../../src/components/hyperspeed/Hyperspeed.css?raw";
import specSource from "../../src/components/hyperspeed/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom three@^0.180.0",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom three@^0.180.0",
        pnpm: "pnpm add react react-dom three@^0.180.0",
        yarn: "yarn add react react-dom three@^0.180.0",
        bun: "bun add react react-dom three@^0.180.0",
      },
      files: [
        { name: "Hyperspeed.jsx", code: entrySource },
        { name: "Hyperspeed.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Hyperspeed } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 480 }}>
  <Hyperspeed
    theme="dark"
    curve="winding"
    speed={1}
    boost={3}
    density={40}
    glow={0.6}
    reflections={0.5}
    steer={0.35}
    onBoostStart={() => console.log("boost start")}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
