import { API } from "./silk.jsx";
import entrySource from "../../src/components/silk/Silk.jsx?raw";
import cssSource from "../../src/components/silk/Silk.css?raw";
import specSource from "../../src/components/silk/SPEC.md?raw";

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
        { name: "Silk.jsx", code: entrySource },
        { name: "Silk.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Silk } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420 }}>
  <Silk
    speed={5}
    scale={1}
    color="#7B7481"
    sheenColor="#ffffff"
    depth={0.5}
    sheen={0.5}
    glow={0.3}
    mouseInteraction={true}
    clickRipple={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
