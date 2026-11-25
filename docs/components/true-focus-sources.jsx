import { API } from "./true-focus.jsx";
import entrySource from "../../src/components/true-focus/TrueFocus.jsx?raw";
import cssSource from "../../src/components/true-focus/TrueFocus.css?raw";
import specSource from "../../src/components/true-focus/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom motion@^12.23.12",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom motion@^12.23.12",
        pnpm: "pnpm add react react-dom motion@^12.23.12",
        yarn: "yarn add react react-dom motion@^12.23.12",
        bun: "bun add react react-dom motion@^12.23.12",
      },
      files: [
        { name: "TrueFocus.jsx", code: entrySource },
        { name: "TrueFocus.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { TrueFocus } from "solen-design/react";

<TrueFocus
  sentence="True Focus"
  focusStyle="brackets"
  order="sequential"
  easing="smooth"
  blurAmount={5}
  animationDuration={0.5}
  pauseBetweenAnimations={1}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
