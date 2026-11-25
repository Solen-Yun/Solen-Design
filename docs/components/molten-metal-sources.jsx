import { API } from "./molten-metal.jsx";
import entrySource from "../../src/components/molten-metal/MoltenMetal.jsx?raw";
import cssSource from "../../src/components/molten-metal/MoltenMetal.css?raw";
import specSource from "../../src/components/molten-metal/SPEC.md?raw";

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
        { name: "MoltenMetal.jsx", code: entrySource },
        { name: "MoltenMetal.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { MoltenMetal } from "solen-design/react";

<div style={{ position: "relative", height: 320 }}>
  <MoltenMetal
    colors={["#5227FF", "#FF9FFC"]}
    coreColor="#FFFFFF"
    speed={0.35}
    scale={4}
    detail={3}
    glow={1.6}
    thickness={1}
    mouseStrength={0.5}
    flareOnClick={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
