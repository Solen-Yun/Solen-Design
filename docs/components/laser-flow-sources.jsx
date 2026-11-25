import { API } from "./laser-flow.jsx";
import entrySource from "../../src/components/laser-flow/LaserFlow.jsx?raw";
import cssSource from "../../src/components/laser-flow/LaserFlow.css?raw";
import specSource from "../../src/components/laser-flow/SPEC.md?raw";

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
        { name: "LaserFlow.jsx", code: entrySource },
        { name: "LaserFlow.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { useRef } from "react";
import { LaserFlow } from "solen-design/react";

export default function App() {
  const surface = useRef(null);
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
        ref={surface}
        style={{
          position: "absolute",
          inset: "10%",
          borderRadius: 24,
          background: "linear-gradient(135deg, #1b2340, #232b52)"
        }}
      />
      <LaserFlow surfaceRef={surface} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}`,
        },
      ],
    },
  ],
  prompt: specSource,
};
