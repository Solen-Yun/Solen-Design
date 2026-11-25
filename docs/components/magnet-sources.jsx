import { API } from "./magnet.jsx";
import entrySource from "../../src/components/magnet/Magnet.jsx?raw";
import specSource from "../../src/components/magnet/SPEC.md?raw";

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
      files: [{ name: "Magnet.jsx", code: entrySource }],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Magnet } from "solen-design/react";

<Magnet
  padding={120}
  magnetStrength={2}
  tilt={8}
  scale={1.1}
  spring={{ stiffness: 200, damping: 14 }}
  onActiveChange={(active) => console.log(active)}
>
  <button>吸过来</button>
</Magnet>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
