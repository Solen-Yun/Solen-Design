import { API } from "./card-stack-swap.jsx";
import entrySource from "../../src/components/card-stack-swap/CardSwap.jsx?raw";
import cssSource from "../../src/components/card-stack-swap/CardSwap.css?raw";
import specSource from "../../src/components/card-stack-swap/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom @hugeicons/react @hugeicons/core-free-icons",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom @hugeicons/react @hugeicons/core-free-icons",
        pnpm: "pnpm add react react-dom @hugeicons/react @hugeicons/core-free-icons",
        yarn: "yarn add react react-dom @hugeicons/react @hugeicons/core-free-icons",
        bun: "bun add react react-dom @hugeicons/react @hugeicons/core-free-icons",
      },
      files: [
        { name: "CardSwap.jsx", code: entrySource },
        { name: "CardSwap.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { CardStackSwap as CardSwap, CardStackSwap } from "solen-design/react";

const items = [
  { title: "Golden hour", icon: "🌇", image: "…" },
  { title: "Black beach", icon: "🏖️", image: "…" },
  { title: "Steel arches", icon: "🌉", image: "…" },
  { title: "Pink drift", icon: "☁️", image: "…" }
];

<div style={{ width: 560, height: 440 }}>
  <CardSwap
    items={items}
    theme="dark"
    cardDistance={60}
    verticalDistance={70}
    depth={90}
    skewAmount={6}
    visibleCards={4}
    delay={4000}
    autoplay={true}
    pauseOnHover={true}
    draggable={true}
    speed={1}
    bounce={0.35}
    parallax={0.5}
    hoverSpread={0.12}
    dim={0.5}
    cardRadius={18}
    intro={true}
    onChange={(frontIndex) => console.log(frontIndex)}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
