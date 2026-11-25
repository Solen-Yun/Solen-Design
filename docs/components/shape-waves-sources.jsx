import { API } from "./shape-waves.jsx";
import entrySource from "../../src/components/shape-waves/ShapeWaves.jsx?raw";
import cssSource from "../../src/components/shape-waves/ShapeWaves.css?raw";
import specSource from "../../src/components/shape-waves/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom vgpu",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom vgpu",
        pnpm: "pnpm add react react-dom vgpu",
        yarn: "yarn add react react-dom vgpu",
        bun: "bun add react react-dom vgpu",
      },
      files: [
        { name: "ShapeWaves.jsx", code: entrySource },
        { name: "ShapeWaves.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ShapeWaves } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420 }}>
  <ShapeWaves
    shapes="mixed"
    cellSize={10}
    dotSize={0.75}
    color="#929292"
    hoverColor="#ffffff"
    backgroundColor="#000000"
    speed={1}
    glow={0.35}
    splashRadius={40}
    splashStrength={0.4}
    interactive={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
