import { API } from "./crystalized-ball.jsx";
import entrySource from "../../src/components/crystalized-ball/CrystalizedBall.jsx?raw";
import cssSource from "../../src/components/crystalized-ball/CrystalizedBall.css?raw";
import specSource from "../../src/components/crystalized-ball/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom ogl@^1.0.11",
        pnpm: "pnpm add react react-dom ogl@^1.0.11",
        yarn: "yarn add react react-dom ogl@^1.0.11",
        bun: "bun add react react-dom ogl@^1.0.11",
      },
      files: [
        { name: "CrystalizedBall.jsx", code: entrySource },
        { name: "CrystalizedBall.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { CrystalizedBall } from "solen-design/react";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <CrystalizedBall
        preset="plasma"
        theme="dark"
        size={0.7}
        particleCount={15000}
        motion="rise"
        interactive={true}
        hoverStrength={0.7}
        intro={true}
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
