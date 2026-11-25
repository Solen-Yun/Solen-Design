import { API } from "./gradient-text.jsx";
import entrySource from "../../src/components/gradient-text/GradientText.jsx?raw";
import cssSource from "../../src/components/gradient-text/GradientText.css?raw";
import specSource from "../../src/components/gradient-text/SPEC.md?raw";

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
        { name: "GradientText.jsx", code: entrySource },
        { name: "GradientText.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GradientText } from "solen-design/react";

<GradientText
  colors={["#5227FF", "#FF9FFC", "#B497CF"]}
  variant="flow"
  animationSpeed={8}
  scale={3}
  glow={0.6}
  followPointer
>
  Gradient flow
</GradientText>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
