import { API } from "./cubes.jsx";
import entrySource from "../../src/components/cubes/Cubes.jsx?raw";
import cssSource from "../../src/components/cubes/Cubes.css?raw";
import specSource from "../../src/components/cubes/SPEC.md?raw";

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
        { name: "Cubes.jsx", code: entrySource },
        { name: "Cubes.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Cubes } from "solen-design/react";

<div style={{ width: "100%", height: 420 }}>
  <Cubes
    gridSize={10}
    maxAngle={45}
    radius={3}
    speed={1}
    bounce={0.4}
    edgeStyle="solid"
    rippleOnClick={true}
    autoAnimate={true}
    intro={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
