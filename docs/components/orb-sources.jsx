import { API } from "./orb.jsx";
import entrySource from "../../src/components/orb/Orb.jsx?raw";
import cssSource from "../../src/components/orb/Orb.css?raw";
import specSource from "../../src/components/orb/SPEC.md?raw";

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
        { name: "Orb.jsx", code: entrySource },
        { name: "Orb.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Orb } from "solen-design/react";

<div style={{ position: "relative", height: 340 }}>
  <Orb
    colors={["#9c43fe", "#4cc2e9", "#101499"]}
    size={1}
    glow={1}
    wobble={1}
    hoverIntensity={1}
    clickPulse={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
