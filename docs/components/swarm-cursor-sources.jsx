import { API } from "./swarm-cursor.jsx";
import entrySource from "../../src/components/swarm-cursor/SwarmCursor.jsx?raw";
import cssSource from "../../src/components/swarm-cursor/SwarmCursor.css?raw";
import specSource from "../../src/components/swarm-cursor/SPEC.md?raw";

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
        { name: "SwarmCursor.jsx", code: entrySource },
        { name: "SwarmCursor.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SwarmCursor } from "solen-design/react";

export default function App() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <SwarmCursor count={800} spread={90} clickEffect="burst">
        <nav style={{ display: "flex", gap: 16, justifyContent: "center", paddingTop: "40vh" }}>
          <a href="#">Home</a>
          <a href="#">Work</a>
          <a href="#">About</a>
        </nav>
      </SwarmCursor>
    </div>
  );
}`,
        },
      ],
    },
  ],
  prompt: specSource,
};
