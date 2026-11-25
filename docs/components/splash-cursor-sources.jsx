import { API } from "./splash-cursor.jsx";
import entrySource from "../../src/components/splash-cursor/SplashCursor.jsx?raw";
import cssSource from "../../src/components/splash-cursor/SplashCursor.css?raw";
import specSource from "../../src/components/splash-cursor/SPEC.md?raw";

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
        { name: "SplashCursor.jsx", code: entrySource },
        { name: "SplashCursor.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SplashCursor } from "solen-design/react";

export default function App() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <h1>整页流体墨水</h1>
      <p>划动光标搅出漩涡，点击炸出泼溅。</p>
      <SplashCursor
        theme="dark"
        rainbow={true}
        swirl={3}
        trail={1}
        glow={0.4}
        quality="high"
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
