import { API } from "./particles.jsx";
import entrySource from "../../src/components/particles/Particles.jsx?raw";
import cssSource from "../../src/components/particles/Particles.css?raw";
import specSource from "../../src/components/particles/SPEC.md?raw";

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
        { name: "Particles.jsx", code: entrySource },
        { name: "Particles.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Particles } from "solen-design/react";

<div style={{ position: "relative", height: 320 }}>
  <Particles
    particleCount={200}
    particleSpread={10}
    speed={0.1}
    particleColors={["#ffffff"]}
    particleBaseSize={100}
    sizeRandomness={1}
    cameraDistance={20}
    shape="circle"
    glow={0.5}
    twinkle={0.3}
    hoverEffect="parallax"
    clickBurst={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
