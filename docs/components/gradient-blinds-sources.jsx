import { API } from "./gradient-blinds.jsx";
import entrySource from "../../src/components/gradient-blinds/GradientBlinds.jsx?raw";
import cssSource from "../../src/components/gradient-blinds/GradientBlinds.css?raw";
import specSource from "../../src/components/gradient-blinds/SPEC.md?raw";

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
        { name: "GradientBlinds.jsx", code: entrySource },
        { name: "GradientBlinds.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GradientBlinds } from "solen-design/react";

<div style={{ position: "relative", height: 420 }}>
  <GradientBlinds
    gradientColors={["#FF9FFC", "#5227FF"]}
    blindCount={16}
    blindMinWidth={60}
    spotlightRadius={0.5}
    shine={0.4}
    sway={0.35}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
