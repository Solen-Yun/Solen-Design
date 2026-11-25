import { API } from "./floating-lines.jsx";
import entrySource from "../../src/components/floating-lines/FloatingLines.jsx?raw";
import cssSource from "../../src/components/floating-lines/FloatingLines.css?raw";
import specSource from "../../src/components/floating-lines/SPEC.md?raw";

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
        { name: "FloatingLines.jsx", code: entrySource },
        { name: "FloatingLines.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { FloatingLines } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420 }}>
  <FloatingLines
    linesGradient={["#e945f5", "#ffffff"]}
    lineCount={10}
    lineDistance={6}
    amplitude={1}
    glow={1}
    depthOfField={0.5}
    interactive={true}
    bendStrength={-0.5}
    parallax={true}
    clickSwirl={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
