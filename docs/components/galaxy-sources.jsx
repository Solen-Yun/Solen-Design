import { API } from "./galaxy.jsx";
import entrySource from "../../src/components/galaxy/Galaxy.jsx?raw";
import cssSource from "../../src/components/galaxy/Galaxy.css?raw";
import specSource from "../../src/components/galaxy/SPEC.md?raw";

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
        { name: "Galaxy.jsx", code: entrySource },
        { name: "Galaxy.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Galaxy } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420 }}>
  <Galaxy
    focal={[0.5, 0.5]}
    starSpeed={0.5}
    density={1}
    layers={4}
    glowIntensity={0.3}
    mouseInteraction={true}
    mouseRepulsion={true}
    repulsionStrength={2}
    clickWarp={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
