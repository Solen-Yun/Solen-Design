import { API } from "./fold-text.jsx";
import entrySource from "../../src/components/fold-text/FoldText.jsx?raw";
import cssSource from "../../src/components/fold-text/FoldText.css?raw";
import specSource from "../../src/components/fold-text/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom gsap@^3.13.0 @gsap/react@^2.1.2",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom gsap@^3.13.0 @gsap/react@^2.1.2",
        pnpm: "pnpm add react react-dom gsap@^3.13.0 @gsap/react@^2.1.2",
        yarn: "yarn add react react-dom gsap@^3.13.0 @gsap/react@^2.1.2",
        bun: "bun add react react-dom gsap@^3.13.0 @gsap/react@^2.1.2",
      },
      files: [
        { name: "FoldText.jsx", code: entrySource },
        { name: "FoldText.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { FoldText } from "solen-design/react";

<FoldText
  text="Design unfolds"
  splitBy="char"
  hinge="top"
  foldStyle="paper"
  duration={0.65}
  stagger={0.045}
  foldAngle={92}
  creaseShading={0.55}
  trigger="mount"
  fontSize={80}
  fontWeight={800}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
