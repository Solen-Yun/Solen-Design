import { API } from "./falling-text.jsx";
import entrySource from "../../src/components/falling-text/FallingText.jsx?raw";
import cssSource from "../../src/components/falling-text/FallingText.css?raw";
import specSource from "../../src/components/falling-text/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom matter-js",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom matter-js",
        pnpm: "pnpm add react react-dom matter-js",
        yarn: "yarn add react react-dom matter-js",
        bun: "bun add react react-dom matter-js",
      },
      files: [
        { name: "FallingText.jsx", code: entrySource },
        { name: "FallingText.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { FallingText } from "solen-design/react";

<div style={{ height: 360 }}>
  <FallingText
    text="抓住刚体 随手一甩 堆成一座字山"
    highlightWords={["刚体", "字山"]}
    trigger="auto"
    variant="tiles"
    theme="dark"
    gravity={1}
    bounciness={0.2}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
