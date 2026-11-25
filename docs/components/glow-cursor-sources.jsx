import { API } from "./glow-cursor.jsx";
import entrySource from "../../src/components/glow-cursor/GlowCursor.jsx?raw";
import cssSource from "../../src/components/glow-cursor/GlowCursor.css?raw";
import specSource from "../../src/components/glow-cursor/SPEC.md?raw";

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
        { name: "GlowCursor.jsx", code: entrySource },
        { name: "GlowCursor.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GlowCursor } from "solen-design/react";

export default function App() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <GlowCursor color="#5f8bff" intensity={1.3} trailWidth={3} linger={1.4} glow={1.2} clickBurst />
    </div>
  );
}`,
        },
      ],
    },
  ],
  prompt: specSource,
};
