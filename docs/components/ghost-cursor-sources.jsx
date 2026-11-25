import { API } from "./ghost-cursor.jsx";
import entrySource from "../../src/components/ghost-cursor/GhostCursor.jsx?raw";
import cssSource from "../../src/components/ghost-cursor/GhostCursor.css?raw";
import specSource from "../../src/components/ghost-cursor/SPEC.md?raw";

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
        { name: "GhostCursor.jsx", code: entrySource },
        { name: "GhostCursor.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GhostCursor } from "solen-design/react";

export default function App() {
  return (
    <section style={{ position: "relative", minHeight: "100vh" }}>
      <GhostCursor color="#B497CF" size={80} trailLength={50} intro={true} />
      <div style={{ position: "relative", padding: "25vh 10vw" }}>
        <h1>Move your pointer through the smoke</h1>
      </div>
    </section>
  );
}`,
        },
      ],
    },
  ],
  prompt: specSource,
};
