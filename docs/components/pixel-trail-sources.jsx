import { API } from "./pixel-trail.jsx";
import entrySource from "../../src/components/pixel-trail/PixelTrail.jsx?raw";
import cssSource from "../../src/components/pixel-trail/PixelTrail.css?raw";
import specSource from "../../src/components/pixel-trail/SPEC.md?raw";

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
        { name: "PixelTrail.jsx", code: entrySource },
        { name: "PixelTrail.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { PixelTrail } from "solen-design/react";

export default function App() {
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", background: "#101014" }}>
      <PixelTrail
        gridSize={40}
        maxAge={250}
        gooeyFilter={{ strength: 2 }}
        color="#ffffff"
        clickBurst={true}
      />
      <div style={{ position: "relative", padding: "30vh 10vw" }}>
        <h1>Drag through the pixel goo</h1>
      </div>
    </div>
  );
}`,
        },
      ],
    },
  ],
  prompt: specSource,
};
