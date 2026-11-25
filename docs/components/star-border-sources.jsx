import { API } from "./star-border.jsx";
import entrySource from "../../src/components/star-border/StarBorder.jsx?raw";
import cssSource from "../../src/components/star-border/StarBorder.css?raw";
import specSource from "../../src/components/star-border/SPEC.md?raw";

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
        { name: "StarBorder.jsx", code: entrySource },
        { name: "StarBorder.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { StarBorder } from "solen-design/react";

<StarBorder
  color="#ffffff"
  duration={4}
  thickness={1}
  radius={12}
  trailLength={0.3}
  stars={1}
  glow={0.6}
  sparkle={true}
  direction="clockwise"
  hover="lap"
  clickPulse={true}
  theme="dark"
  onClick={() => console.log("clicked")}
>
  开始探索
</StarBorder>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
