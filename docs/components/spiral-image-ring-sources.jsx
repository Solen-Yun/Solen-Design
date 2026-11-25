import { API } from "./spiral-image-ring.jsx";
import entrySource from "../../src/components/spiral-image-ring/InfiniteSpiral.jsx?raw";
import cssSource from "../../src/components/spiral-image-ring/InfiniteSpiral.css?raw";
import specSource from "../../src/components/spiral-image-ring/SPEC.md?raw";

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
        { name: "InfiniteSpiral.jsx", code: entrySource },
        { name: "InfiniteSpiral.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SpiralImageRing as InfiniteSpiral, SpiralImageRing } from "solen-design/react";

const items = [
  "/photos/one.jpg",
  "/photos/two.jpg",
  { src: "/photos/three.jpg", alt: "第三张", href: "/gallery/three" }
];

<InfiniteSpiral
  items={items}
  speed={0.55}
  direction="up"
  animationMode="auto"
  radius={170}
  cardWidth={100}
  cardHeight={100}
  verticalSpacing={60}
  perspective={1000}
  cardsPerTurn={7}
  rotation={0}
  cardTilt={0}
  cardRadius={10}
  centerScale={1.2}
  edgeFade={0.3}
  edgeBlur={6}
  pauseOnHover={true}
  imageFit="cover"
  grayscale={0}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
