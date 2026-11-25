import { API } from "./sliced-waves.jsx";
import entrySource from "../../src/components/sliced-waves/SlicedWaves.jsx?raw";
import cssSource from "../../src/components/sliced-waves/SlicedWaves.css?raw";
import specSource from "../../src/components/sliced-waves/SPEC.md?raw";

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
        { name: "SlicedWaves.jsx", code: entrySource },
        { name: "SlicedWaves.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SlicedWaves } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420 }}>
  <SlicedWaves
    color1="#ffd9a8"
    color2="#ff5fa2"
    color3="#5b8cff"
    ribbons={3}
    spacing={28}
    amplitude={0.1}
    speed={1}
    perspective={0.45}
    blur={0.6}
    glow={1}
    brightness={1.25}
    position={0.78}
    slices={0}
    mouseInteraction={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
