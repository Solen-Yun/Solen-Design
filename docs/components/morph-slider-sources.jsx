import { API } from "./morph-slider.jsx";
import entrySource from "../../src/components/morph-slider/MorphSlider.jsx?raw";
import cssSource from "../../src/components/morph-slider/MorphSlider.css?raw";
import specSource from "../../src/components/morph-slider/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom ogl gsap",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom ogl gsap",
        pnpm: "pnpm add react react-dom ogl gsap",
        yarn: "yarn add react react-dom ogl gsap",
        bun: "bun add react react-dom ogl gsap",
      },
      files: [
        { name: "MorphSlider.jsx", code: entrySource },
        { name: "MorphSlider.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { MorphSlider } from "solen-design/react";

const items = [
  { image: "/slides/dune.jpg", caption: "Dune" },
  { image: "/slides/ocean.jpg", caption: "Ocean" },
  { image: "/slides/forest.jpg", caption: "Forest" }
];

<MorphSlider
  items={items}
  startIndex={0}
  transition="melt"
  duration={1.1}
  ease="power2.inOut"
  intensity={0.55}
  scale={2.4}
  aberration={0.35}
  drift={0.4}
  autoplay={false}
  autoplayDelay={4}
  loop={true}
  radius={16}
  overlayColor="#000000"
  showCaptions={true}
  showControls={true}
  showIndicators={true}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
