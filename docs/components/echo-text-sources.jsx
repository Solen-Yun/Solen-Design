import { API } from "./echo-text.jsx";
import entrySource from "../../src/components/echo-text/EchoText.jsx?raw";
import cssSource from "../../src/components/echo-text/EchoText.css?raw";
import specSource from "../../src/components/echo-text/SPEC.md?raw";

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
        { name: "EchoText.jsx", code: entrySource },
        { name: "EchoText.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { EchoText } from "solen-design/react";

<EchoText
  text="残影回声"
  echoes={12}
  offset={36}
  direction="right"
  tint="#7dd3fc"
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
