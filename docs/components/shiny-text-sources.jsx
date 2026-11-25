import { API } from "./shiny-text.jsx";
import entrySource from "../../src/components/shiny-text/ShinyText.jsx?raw";
import cssSource from "../../src/components/shiny-text/ShinyText.css?raw";
import specSource from "../../src/components/shiny-text/SPEC.md?raw";

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
        { name: "ShinyText.jsx", code: entrySource },
        { name: "ShinyText.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ShinyText } from "solen-design/react";

<ShinyText
  text="Shiny Text"
  color="#b5b5b5"
  shineColor="#ffffff"
  speed={2}
  delay={0}
  angle={120}
  shineWidth={40}
  softness={0.8}
  bands={1}
  glow={0}
  direction="left"
  easing="smooth"
  trigger="loop"
  yoyo={false}
  followPointer={false}
  pauseOnHover={false}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
