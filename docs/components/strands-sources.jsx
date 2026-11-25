import { API } from "./strands.jsx";
import entrySource from "../../src/components/strands/Strands.jsx?raw";
import cssSource from "../../src/components/strands/Strands.css?raw";
import specSource from "../../src/components/strands/SPEC.md?raw";

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
        { name: "Strands.jsx", code: entrySource },
        { name: "Strands.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Strands } from "solen-design/react";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Strands
        energy={0.65}
        colors={["#d95b56", "#ba5046", "#ffa24c", "#ffe0b3", "#93f1ff", "#3569fa", "#193d9b"]}
        interactive
        clickPulse
        intro
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
