import { API } from "./pixel-snow.jsx";
import entrySource from "../../src/components/pixel-snow/PixelSnow.jsx?raw";
import cssSource from "../../src/components/pixel-snow/PixelSnow.css?raw";
import specSource from "../../src/components/pixel-snow/SPEC.md?raw";

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
        { name: "PixelSnow.jsx", code: entrySource },
        { name: "PixelSnow.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { PixelSnow } from "solen-design/react";

<div style={{ width: "100%", height: 520, position: "relative" }}>
  <PixelSnow
    color="#ffffff"
    variant="snowflake"
    density={0.5}
    speed={1}
    wind={0.25}
    sway={0.5}
    pixelSize={3}
    depth={0.6}
    glow={0.8}
    twinkle={0.35}
    mouseInteraction
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
