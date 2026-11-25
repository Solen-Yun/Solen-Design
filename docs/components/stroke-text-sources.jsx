import { API } from "./stroke-text.jsx";
import entrySource from "../../src/components/stroke-text/StrokeText.jsx?raw";
import cssSource from "../../src/components/stroke-text/StrokeText.css?raw";
import specSource from "../../src/components/stroke-text/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom gsap@^3.13.0",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom gsap@^3.13.0",
        pnpm: "pnpm add react react-dom gsap@^3.13.0",
        yarn: "yarn add react react-dom gsap@^3.13.0",
        bun: "bun add react react-dom gsap@^3.13.0",
      },
      files: [
        { name: "StrokeText.jsx", code: entrySource },
        { name: "StrokeText.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { StrokeText } from "solen-design/react";

<StrokeText
  text="Draw Attention"
  strokeColor="#A78BFA"
  fillMode="wipe"
  wipeFrom="left"
  trigger="mount"
  drawDuration={1.6}
  fillDelay={0.2}
  stagger={0.05}
  fontSize={128}
  shadow
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
