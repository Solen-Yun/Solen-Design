import { API } from "./blob-cursor.jsx";
import entrySource from "../../src/components/blob-cursor/BlobCursor.jsx?raw";
import cssSource from "../../src/components/blob-cursor/BlobCursor.css?raw";
import specSource from "../../src/components/blob-cursor/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom three@^0.180.0",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom three@^0.180.0",
        pnpm: "pnpm add react react-dom three@^0.180.0",
        yarn: "yarn add react react-dom three@^0.180.0",
        bun: "bun add react react-dom three@^0.180.0",
      },
      files: [
        { name: "BlobCursor.jsx", code: entrySource },
        { name: "BlobCursor.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { BlobCursor } from "solen-design/react";

export default function App() {
  return (
    <section style={{ position: "relative", minHeight: "100vh" }}>
      <BlobCursor material="chrome" color="#3B82F6" size={140} trail={16} shadow={false} />
      <div style={{ position: "relative", padding: "30vh 10vw" }}>
        <h1>Chase the liquid metal</h1>
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
