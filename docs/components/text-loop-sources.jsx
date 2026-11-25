import { API } from "./text-loop.jsx";
import entrySource from "../../src/components/text-loop/TextLoop.jsx?raw";
import cssSource from "../../src/components/text-loop/TextLoop.css?raw";
import specSource from "../../src/components/text-loop/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom gsap",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom gsap",
        pnpm: "pnpm add react react-dom gsap",
        yarn: "yarn add react react-dom gsap",
        bun: "bun add react react-dom gsap",
      },
      files: [
        { name: "TextLoop.jsx", code: entrySource },
        { name: "TextLoop.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { TextLoop } from "solen-design/react";

<TextLoop
  text="Solen Design"
  shape="wave"
  speed={90}
  direction="forward"
  separator="✦"
  curviness={90}
  tilt={0}
  fontSize={46}
  fontWeight={800}
  letterSpacing={2}
  uppercase={true}
  ribbon={true}
  ribbonColor="#5227FF"
  ribbonWidth={86}
  edgeFade={0}
  pauseOnHover={true}
  cross={false}
  crossAngle={16}
  draggable={false}
  scrollBoost={0}
  outline={false}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
