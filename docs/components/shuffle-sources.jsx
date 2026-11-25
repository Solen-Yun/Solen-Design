import { API } from "./shuffle.jsx";
import entrySource from "../../src/components/shuffle/Shuffle.jsx?raw";
import cssSource from "../../src/components/shuffle/Shuffle.css?raw";
import specSource from "../../src/components/shuffle/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom gsap @gsap/react",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom gsap @gsap/react",
        pnpm: "pnpm add react react-dom gsap @gsap/react",
        yarn: "yarn add react react-dom gsap @gsap/react",
        bun: "bun add react react-dom gsap @gsap/react",
      },
      files: [
        { name: "Shuffle.jsx", code: entrySource },
        { name: "Shuffle.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Shuffle } from "solen-design/react";

<Shuffle
  text="Shuffle!"
  shuffleDirection="right"
  duration={0.35}
  ease="power3.out"
  threshold={0.1}
  rootMargin="-100px"
  tag="p"
  textAlign="center"
  shuffleTimes={1}
  animationMode="evenodd"
  loop={false}
  loopDelay={0}
  stagger={0.03}
  scrambleCharset=""
  triggerOnce={true}
  respectReducedMotion={true}
  triggerOnHover={true}
  effect="slide"
  hoverRadius={0}
  motionBlur={false}
  onShuffleComplete={() => console.log("settled")}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
