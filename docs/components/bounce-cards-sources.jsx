import { API } from "./bounce-cards.jsx";
import entrySource from "../../src/components/bounce-cards/BounceCards.jsx?raw";
import cssSource from "../../src/components/bounce-cards/BounceCards.css?raw";
import specSource from "../../src/components/bounce-cards/SPEC.md?raw";

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
        { name: "BounceCards.jsx", code: entrySource },
        { name: "BounceCards.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { BounceCards } from "solen-design/react";

const images = [
  "/photos/one.jpg",
  "/photos/two.jpg",
  { src: "/photos/three.jpg", alt: "Third card" },
  "/photos/four.jpg",
  "/photos/five.jpg"
];

<BounceCards
  images={images}
  containerWidth={400}
  containerHeight={400}
  cardSize={200}
  spread={85}
  rotation={10}
  arc={0}
  animationDelay={0.5}
  animationStagger={0.06}
  bounciness={0.6}
  enableHover={true}
  pushDistance={160}
  hoverScale={1.06}
  borderWidth={5}
  borderColor="#ffffff"
  radius={25}
  shadow={true}
  onCardClick={(index) => console.log(index)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
