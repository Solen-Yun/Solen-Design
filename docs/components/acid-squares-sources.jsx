import { API } from "./acid-squares.jsx";
import entrySource from "../../src/components/acid-squares/AcidSquares.jsx?raw";
import cssSource from "../../src/components/acid-squares/AcidSquares.css?raw";
import specSource from "../../src/components/acid-squares/SPEC.md?raw";

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
        { name: "AcidSquares.jsx", code: entrySource },
        { name: "AcidSquares.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { AcidSquares } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: "100vh" }}>
  <AcidSquares
    color="#120f17"
    accentColor="#ff4fb8"
    secondaryColor="#3b6bff"
    tileSize={1}
    gap={0.12}
    rotation={35}
    speed={0.6}
    lighting="split"
    hoverEffect="press"
    pulseOnClick={true}
    intro={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
