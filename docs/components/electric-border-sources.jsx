import { API } from "./electric-border.jsx";
import entrySource from "../../src/components/electric-border/ElectricBorder.jsx?raw";
import cssSource from "../../src/components/electric-border/ElectricBorder.css?raw";
import specSource from "../../src/components/electric-border/SPEC.md?raw";

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
        { name: "ElectricBorder.jsx", code: entrySource },
        { name: "ElectricBorder.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ElectricBorder } from "solen-design/react";

export default function App() {
  return (
    <ElectricBorder
      color="#7df9ff"
      borderRadius={24}
      thickness={1.5}
      strands={3}
      glow={0.6}
      arcs={1}
      style={{ width: 360 }}
    >
      <div style={{ borderRadius: 24, padding: "36px 32px", background: "#17171d" }}>
        <h2 style={{ margin: 0, color: "#f4f4f5" }}>Your content here</h2>
      </div>
    </ElectricBorder>
  );
}`,
        },
      ],
    },
  ],
  prompt: specSource,
};
