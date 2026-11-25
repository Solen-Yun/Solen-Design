import { API } from "./curved-loop.jsx";
import entrySource from "../../src/components/curved-loop/CurvedLoop.jsx?raw";
import cssSource from "../../src/components/curved-loop/CurvedLoop.css?raw";
import specSource from "../../src/components/curved-loop/SPEC.md?raw";

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
        { name: "CurvedLoop.jsx", code: entrySource },
        { name: "CurvedLoop.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { CurvedLoop } from "solen-design/react";

<CurvedLoop
  marqueeText="Be ✦ Creative ✦ With ✦ Solen ✦ Design ✦"
  shape="arc"
  speed={2}
  curveAmount={400}
  direction="left"
  fontSize={96}
  fontWeight={700}
  letterSpacing={0}
  separator=""
  outline={false}
  scrollBoost={0}
  edgeFade={0}
  interactive={true}
  pauseOnHover={false}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
