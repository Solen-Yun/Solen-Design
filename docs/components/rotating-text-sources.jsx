import { API } from "./rotating-text.jsx";
import entrySource from "../../src/components/rotating-text/RotatingText.jsx?raw";
import cssSource from "../../src/components/rotating-text/RotatingText.css?raw";
import specSource from "../../src/components/rotating-text/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom motion",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom motion",
        pnpm: "pnpm add react react-dom motion",
        yarn: "yarn add react react-dom motion",
        bun: "bun add react react-dom motion",
      },
      files: [
        { name: "RotatingText.jsx", code: entrySource },
        { name: "RotatingText.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { RotatingText } from "solen-design/react";

<RotatingText
  texts={["设计更快的界面", "Solen Design", "动效即语言"]}
  effect="flip"
  direction="up"
  staggerDuration={0.03}
  rotationInterval={2200}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
