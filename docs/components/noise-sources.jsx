import { API } from "./noise.jsx";
import entrySource from "../../src/components/noise/Noise.jsx?raw";
import cssSource from "../../src/components/noise/Noise.css?raw";
import specSource from "../../src/components/noise/SPEC.md?raw";

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
        { name: "Noise.jsx", code: entrySource },
        { name: "Noise.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Noise } from "solen-design/react";

export default function App() {
  return (
    <div style={{ position: "relative" }}>
      <h1>我的页面</h1>
      <p>整页覆盖一层 35mm 胶片颗粒。</p>
      <Noise
        fixed
        opacity={0.2}
        size={1}
        fps={24}
        blendMode="overlay"
        contrast={0.6}
        dust={0.3}
        scratches={0.15}
        zIndex={50}
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
