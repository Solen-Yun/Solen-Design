import { API } from "./animated-content.jsx";
import entrySource from "../../src/components/animated-content/AnimatedContent.jsx?raw";
import specSource from "../../src/components/animated-content/SPEC.md?raw";

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
        { name: "AnimatedContent.jsx", code: entrySource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { AnimatedContent } from "solen-design/react";

<AnimatedContent
  direction="vertical"
  distance={100}
  duration={0.8}
  blur={8}
  tilt={10}
  wipe="up"
  stagger={0.08}
  threshold={0.1}
  trigger="scroll"
>
  <h2>滚动到这里的标题</h2>
  <p>进入视口时滑入、变清晰并擦亮。</p>
</AnimatedContent>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
