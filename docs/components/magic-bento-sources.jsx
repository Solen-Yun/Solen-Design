import { API } from "./magic-bento.jsx";
import entrySource from "../../src/components/magic-bento/MagicBento.jsx?raw";
import cssSource from "../../src/components/magic-bento/MagicBento.css?raw";
import specSource from "../../src/components/magic-bento/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom @hugeicons/react @hugeicons/core-free-icons",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3",
        pnpm: "pnpm add react react-dom @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3",
        yarn: "yarn add react react-dom @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3",
        bun: "bun add react react-dom @hugeicons/react@^1.1.10 @hugeicons/core-free-icons@^4.3.3",
      },
      files: [
        { name: "MagicBento.jsx", code: entrySource },
        { name: "MagicBento.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { MagicBento } from "solen-design/react";

<MagicBento
  theme="dark"
  glowColor="#c4b5fd"
  columns={4}
  rowHeight={200}
  gap={12}
  radius={20}
  spotlightRadius={300}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableStars={false}
  particleCount={24}
  enableTilt={false}
  enableMagnetism={false}
  clickEffect={true}
  textAutoHide={true}
  intro={true}
  disableAnimations={false}
  onItemClick={(item, index) => console.log(index, item.title)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
