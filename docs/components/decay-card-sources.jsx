import { API } from "./decay-card.jsx";
import entrySource from "../../src/components/decay-card/DecayCard.jsx?raw";
import cssSource from "../../src/components/decay-card/DecayCard.css?raw";
import specSource from "../../src/components/decay-card/SPEC.md?raw";

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
        { name: "DecayCard.jsx", code: entrySource },
        { name: "DecayCard.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { DecayCard } from "solen-design/react";

<DecayCard
  image="/photos/ridge.jpg"
  width={300}
  height={400}
  intensity={0.5}
  sensitivity={0.5}
  hoverDecay={0.05}
  recovery={0.6}
  grain={0.25}
  detail={5}
  pattern={4}
  idle={0.35}
  flow={0}
  chroma={0}
  travel={50}
  tilt={10}
  scope="window"
  radius={0}
  grayscale={false}
>
  <p>Sweep the pointer to tear the photo</p>
</DecayCard>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
