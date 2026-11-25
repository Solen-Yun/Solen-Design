import { API } from "./grainient.jsx";
import entrySource from "../../src/components/grainient/Grainient.jsx?raw";
import cssSource from "../../src/components/grainient/Grainient.css?raw";
import specSource from "../../src/components/grainient/SPEC.md?raw";

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
        { name: "Grainient.jsx", code: entrySource },
        { name: "Grainient.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Grainient } from "solen-design/react";

<div style={{ position: "relative", height: 420 }}>
  <Grainient
    type="linear"
    angle={55}
    flow={0.8}
    silk={0.35}
    grainAmount={0.08}
    grainSize={1.2}
    clickSwirl={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
