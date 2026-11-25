import { API } from "./pixel-card.jsx";
import entrySource from "../../src/components/pixel-card/PixelCard.jsx?raw";
import cssSource from "../../src/components/pixel-card/PixelCard.css?raw";
import specSource from "../../src/components/pixel-card/SPEC.md?raw";

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
        { name: "PixelCard.jsx", code: entrySource },
        { name: "PixelCard.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { PixelCard } from "solen-design/react";

<PixelCard
  variant="blue"
  gap={10}
  speed={25}
  pixelSize={2}
  shape="square"
  origin="center"
  revealDuration={600}
  spotlight={0.5}
  glow={0.5}
  opacity={1}
  fade={0}
  trigger="hover"
  clickPulse={true}
  intro={true}
  introDelay={0}
  theme="dark"
  radius={24}
>
  <div style={{ color: "#f4f4f5" }}>Your content</div>
</PixelCard>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
