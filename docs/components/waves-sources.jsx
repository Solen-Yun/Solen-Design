import { API } from "./waves.jsx";
import entrySource from "../../src/components/waves/Waves.jsx?raw";
import cssSource from "../../src/components/waves/Waves.css?raw";
import specSource from "../../src/components/waves/SPEC.md?raw";

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
        { name: "Waves.jsx", code: entrySource },
        { name: "Waves.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Waves } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420 }}>
  <div style={{ position: "absolute", inset: 0 }}>
    <Waves
      lineColor="#ffffff"
      accentColor="#ff5fa2"
      spacing={10}
      lineWidth={1}
      amplitude={32}
      scale={1}
      twist={1}
      speed={1}
      mouseRadius={175}
      mouseStrength={1}
      bounce={0.5}
      returnDuration={1.4}
      clickRipple={true}
    />
  </div>
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
