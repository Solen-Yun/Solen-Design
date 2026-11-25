import { API } from "./dark-veil.jsx";
import entrySource from "../../src/components/dark-veil/DarkVeil.jsx?raw";
import cssSource from "../../src/components/dark-veil/DarkVeil.css?raw";
import specSource from "../../src/components/dark-veil/SPEC.md?raw";

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
        { name: "DarkVeil.jsx", code: entrySource },
        { name: "DarkVeil.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { DarkVeil } from "solen-design/react";

export default function App() {
  return (
    <div style={{ position: "relative", height: "100vh", background: "#0a0a0f" }}>
      <DarkVeil
        color="#6b12ff"
        speed={0.5}
        scale={1}
        flow={1}
        glow={0.4}
        grain={0.03}
        mouseInteraction={true}
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
