import { API } from "./spotlight-card.jsx";
import entrySource from "../../src/components/spotlight-card/SpotlightCard.jsx?raw";
import cssSource from "../../src/components/spotlight-card/SpotlightCard.css?raw";
import specSource from "../../src/components/spotlight-card/SPEC.md?raw";

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
        { name: "SpotlightCard.jsx", code: entrySource },
        { name: "SpotlightCard.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SpotlightCard } from "solen-design/react";

<SpotlightCard
  theme="dark"
  spotlightColor="#ffffff"
  intensity={0.15}
  spotlightSize={240}
  softness={0.7}
  shape="circle"
  borderGlow={0.6}
  proximity={80}
  smoothing={0.3}
  ambient={false}
  flare={true}
  grain={0}
>
  <h3>聚光卡片</h3>
</SpotlightCard>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
