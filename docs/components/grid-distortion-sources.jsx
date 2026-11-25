import { API } from "./grid-distortion.jsx";
import entrySource from "../../src/components/grid-distortion/GridDistortion.jsx?raw";
import cssSource from "../../src/components/grid-distortion/GridDistortion.css?raw";
import specSource from "../../src/components/grid-distortion/SPEC.md?raw";

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
        { name: "GridDistortion.jsx", code: entrySource },
        { name: "GridDistortion.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GridDistortion } from "solen-design/react";

<div style={{ position: "relative", height: 420 }}>
  <GridDistortion
    imageSrc="/cover.jpg"
    grid={15}
    radius={0.18}
    strength={0.15}
    relaxation={0.96}
    mode="drag"
    clickRipple={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
