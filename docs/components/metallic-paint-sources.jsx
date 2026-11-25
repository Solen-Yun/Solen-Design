import { API } from "./metallic-paint.jsx";
import entrySource from "../../src/components/metallic-paint/MetallicPaint.jsx?raw";
import cssSource from "../../src/components/metallic-paint/MetallicPaint.css?raw";
import specSource from "../../src/components/metallic-paint/SPEC.md?raw";

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
        { name: "MetallicPaint.jsx", code: entrySource },
        { name: "MetallicPaint.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { MetallicPaint } from "solen-design/react";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MetallicPaint
        text="SOLEN"
        color="#ffffff"
        density={2}
        dispersion={0.3}
        edgeBend={0.6}
        mouseTilt={0.5}
        intro
      />
    </div>
  );
}`,
        },
      ],
    },
  ],
  prompt: specSource,
};
