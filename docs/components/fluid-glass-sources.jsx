import { API } from "./fluid-glass.jsx";
import entrySource from "../../src/components/fluid-glass/FluidGlass.jsx?raw";
import cssSource from "../../src/components/fluid-glass/FluidGlass.css?raw";
import specSource from "../../src/components/fluid-glass/SPEC.md?raw";

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
        { name: "FluidGlass.jsx", code: entrySource },
        { name: "FluidGlass.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { FluidGlass } from "solen-design/react";

<div style={{ position: "relative", height: "100vh" }}>
  <FluidGlass
    text="Look closer."
    shape="torus"
    shapes={["torus", "lens", "blob", "cube", "pill", "prism", "diamond"]}
    size={260}
    refraction={1}
    dispersion={0.35}
    reflection={1}
    frost={0}
    color="#ffffff"
    tint={0}
    shadow={0.5}
    elevation={0.4}
    interaction="follow"
    smoothness={0.5}
    wobble={0.5}
    spin={0.3}
    idle={true}
    morphOnClick={true}
    onShapeChange={(shape) => console.log(shape)}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
