import { API } from "./counter.jsx";
import entrySource from "../../src/components/counter/Counter.jsx?raw";
import cssSource from "../../src/components/counter/Counter.css?raw";
import specSource from "../../src/components/counter/SPEC.md?raw";

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
        { name: "Counter.jsx", code: entrySource },
        { name: "Counter.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Counter } from "solen-design/react";

<Counter
  value={1284}
  fontSize={80}
  fontWeight={600}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
