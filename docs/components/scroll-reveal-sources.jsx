import { API } from "./scroll-reveal.jsx";
import entrySource from "../../src/components/scroll-reveal/ScrollReveal.jsx?raw";
import cssSource from "../../src/components/scroll-reveal/ScrollReveal.css?raw";
import specSource from "../../src/components/scroll-reveal/SPEC.md?raw";

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
        { name: "ScrollReveal.jsx", code: entrySource },
        { name: "ScrollReveal.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ScrollReveal } from "solen-design/react";

<ScrollReveal
  effect="rise"
  splitBy="chars"
  mode="scrub"
  enableBlur={true}
  baseOpacity={0.1}
  baseRotation={3}
  blurStrength={4}
  baseOffset={0}
  stagger={0.05}
  smoothing={0}
  duration={0.8}
  highlightColor=""
  rotationEnd="bottom bottom"
  wordAnimationEnd="bottom bottom"
>
  文字从模糊中显影
</ScrollReveal>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
