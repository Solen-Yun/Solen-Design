import { API } from "./gradual-blur.jsx";
import entrySource from "../../src/components/gradual-blur/GradualBlur.jsx?raw";
import cssSource from "../../src/components/gradual-blur/GradualBlur.css?raw";
import specSource from "../../src/components/gradual-blur/SPEC.md?raw";

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
        { name: "GradualBlur.jsx", code: entrySource },
        { name: "GradualBlur.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GradualBlur } from "solen-design/react";

<div style={{ position: "relative" }}>
  <div style={{ overflowY: "auto", height: 480 }}>
    {/* 长列表内容 */}
  </div>
  <GradualBlur
    position="bottom"
    target="parent"
    height="6rem"
    strength={2}
    layers={8}
    curve="linear"
    exponential={true}
    autoHide={true}
    hoverIntensity={1.6}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
