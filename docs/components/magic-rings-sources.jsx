import { API } from "./magic-rings.jsx";
import entrySource from "../../src/components/magic-rings/MagicRings.jsx?raw";
import cssSource from "../../src/components/magic-rings/MagicRings.css?raw";
import specSource from "../../src/components/magic-rings/SPEC.md?raw";

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
        { name: "MagicRings.jsx", code: entrySource },
        { name: "MagicRings.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { MagicRings } from "solen-design/react";

<div style={{ position: "relative", height: 340 }}>
  <MagicRings
    color="#A855F7"
    colorTwo="#6366F1"
    ringCount={6}
    motion="pulse"
    speed={1}
    lineThickness={2}
    glow={1}
    baseRadius={0.35}
    radiusStep={0.1}
    expansion={0.1}
    taper={1.5}
    hoverScale={1.2}
    clickBurst={true}
    theme="dark"
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
