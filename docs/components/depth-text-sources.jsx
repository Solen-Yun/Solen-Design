import { API } from "./depth-text.jsx";
import entrySource from "../../src/components/depth-text/DepthText.jsx?raw";
import cssSource from "../../src/components/depth-text/DepthText.css?raw";
import specSource from "../../src/components/depth-text/SPEC.md?raw";

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
        { name: "DepthText.jsx", code: entrySource },
        { name: "DepthText.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { DepthText } from "solen-design/react";

<DepthText
  text="Elevate"
  layers={34}
  depth={2.4}
  tilt={7.5}
  smoothing={0.14}
  perspective={900}
  autoOrbit={true}
  orbitSpeed={0.35}
  hoverPush={0}
  depthColor="#7c3aed"
  faceColor="currentColor"
  shadow={true}
  intro={true}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
