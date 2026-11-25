import { API } from "./particle-text.jsx";
import entrySource from "../../src/components/particle-text/ParticleText.jsx?raw";
import cssSource from "../../src/components/particle-text/ParticleText.css?raw";
import specSource from "../../src/components/particle-text/SPEC.md?raw";

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
        { name: "ParticleText.jsx", code: entrySource },
        { name: "ParticleText.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ParticleText } from "solen-design/react";

<div style={{ height: 400, color: "#f4f4f5" }}>
  <ParticleText
    text="Solen"
    intro="gather"
    particleSize={2}
    density={4}
    highlightColor="#ff5a36"
    clickBurst
    pointerRepel={40}
    repelRadius={120}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
