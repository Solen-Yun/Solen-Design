import { API } from "./crosshair.jsx";
import entrySource from "../../src/components/crosshair/Crosshair.jsx?raw";
import specSource from "../../src/components/crosshair/SPEC.md?raw";

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
        { name: "Crosshair.jsx", code: entrySource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { useRef } from "react";
import { Crosshair } from "solen-design/react";

export default function App() {
  const stageRef = useRef(null);
  return (
    <div ref={stageRef} style={{ position: "relative", height: "100vh" }}>
      <a href="#">锁定的链接</a>
      <button type="button">锁定的按钮</button>
      <Crosshair containerRef={stageRef} color="#ffffff" targetEffect="lock" />
    </div>
  );
}`,
        },
      ],
    },
  ],
  prompt: specSource,
};
