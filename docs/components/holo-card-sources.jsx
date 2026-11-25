import { API } from "./holo-card.jsx";
import entrySource from "../../src/components/holo-card/HoloCard.jsx?raw";
import cssSource from "../../src/components/holo-card/HoloCard.css?raw";
import specSource from "../../src/components/holo-card/SPEC.md?raw";

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
        { name: "HoloCard.jsx", code: entrySource },
        { name: "HoloCard.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { HoloCard } from "solen-design/react";

<HoloCard
  image="/cards/front.jpg"
  backImage="/cards/back.jpg"
  alt="Holo card"
  preset="bursts"
  intensity={0.85}
  scale={1}
  edgeSparkle={0.8}
  frame={4}
  glare={0.5}
  foilColor="#e2e6ec"
  width={320}
  radius={14}
  tiltMax={14}
  hoverScale={1.04}
  idle={true}
  shadow={true}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
