import { API } from "./color-bends.jsx";
import entrySource from "../../src/components/color-bends/ColorBends.jsx?raw";
import cssSource from "../../src/components/color-bends/ColorBends.css?raw";
import specSource from "../../src/components/color-bends/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom three@^0.180.0",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom three@^0.180.0",
        pnpm: "pnpm add react react-dom three@^0.180.0",
        yarn: "yarn add react react-dom three@^0.180.0",
        bun: "bun add react react-dom three@^0.180.0",
      },
      files: [
        { name: "ColorBends.jsx", code: entrySource },
        { name: "ColorBends.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ColorBends } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: "100vh" }}>
  <ColorBends
    colors={["#774aa8", "#c873ea", "#4f77ff"]}
    rotation={90}
    speed={0.2}
    scale={1}
    frequency={1}
    warpStrength={1}
    mouseInfluence={1}
    parallax={0.5}
    noise={0.15}
    iterations={1}
    intensity={1.5}
    bandWidth={6}
    transparent={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
