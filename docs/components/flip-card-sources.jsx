import { API } from "./flip-card.jsx";
import entrySource from "../../src/components/flip-card/FlipCard.jsx?raw";
import cssSource from "../../src/components/flip-card/FlipCard.css?raw";
import specSource from "../../src/components/flip-card/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom motion",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom motion",
        pnpm: "pnpm add react react-dom motion",
        yarn: "yarn add react react-dom motion",
        bun: "bun add react react-dom motion",
      },
      files: [
        { name: "FlipCard.jsx", code: entrySource },
        { name: "FlipCard.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { FlipCard } from "solen-design/react";

<FlipCard
  width={300}
  height={400}
  radius={22}
  axis="y"
  tiltMax={12}
  glareOpacity={0.22}
  hoverScale={1.03}
  stiffness={170}
  damping={20}
  front={<div>Front</div>}
  back={<div>Back</div>}
  onFlipChange={(flipped) => console.log(flipped)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
