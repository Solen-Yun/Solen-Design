import { API } from "./soft-aurora.jsx";
import entrySource from "../../src/components/soft-aurora/SoftAurora.jsx?raw";
import cssSource from "../../src/components/soft-aurora/SoftAurora.css?raw";
import specSource from "../../src/components/soft-aurora/SPEC.md?raw";

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
        { name: "SoftAurora.jsx", code: entrySource },
        { name: "SoftAurora.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SoftAurora } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420 }}>
  <SoftAurora
    speed={0.6}
    scale={1.5}
    brightness={1.0}
    color1="#f7f7f7"
    color2="#e100ff"
    noiseFrequency={2.5}
    bandHeight={0.5}
    bandSpread={1.0}
    spectrum={1}
    enableMouseInteraction={true}
    mouseInfluence={0.25}
    clickPulse={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
