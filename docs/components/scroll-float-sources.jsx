import { API } from "./scroll-float.jsx";
import entrySource from "../../src/components/scroll-float/ScrollFloat.jsx?raw";
import cssSource from "../../src/components/scroll-float/ScrollFloat.css?raw";
import specSource from "../../src/components/scroll-float/SPEC.md?raw";

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
        { name: "ScrollFloat.jsx", code: entrySource },
        { name: "ScrollFloat.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ScrollFloat } from "solen-design/react";

<ScrollFloat
  effect="float"
  splitBy="chars"
  direction="up"
  order="start"
  fromColor="currentColor"
  animationDuration={1}
  ease="back.inOut(2)"
  scrollStart="center bottom+=50%"
  scrollEnd="bottom bottom-=40%"
  stagger={0.03}
  distance={120}
  stretch={2.3}
  smoothing={0}
>
  浮回原位
</ScrollFloat>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
