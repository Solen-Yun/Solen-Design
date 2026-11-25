import { API } from "./iridescence.jsx";
import entrySource from "../../src/components/iridescence/Iridescence.jsx?raw";
import cssSource from "../../src/components/iridescence/Iridescence.css?raw";
import specSource from "../../src/components/iridescence/SPEC.md?raw";

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
        { name: "Iridescence.jsx", code: entrySource },
        { name: "Iridescence.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Iridescence } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 480 }}>
  <Iridescence
    color="#ffffff"
    speed={1}
    scale={1}
    detail={8}
    stir={0.5}
    sheen={0.3}
    clickSwirl
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
