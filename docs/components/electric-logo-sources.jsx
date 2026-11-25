import { API } from "./electric-logo.jsx";
import entrySource from "../../src/components/electric-logo/ElectricLogo.jsx?raw";
import cssSource from "../../src/components/electric-logo/ElectricLogo.css?raw";
import specSource from "../../src/components/electric-logo/SPEC.md?raw";

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
        { name: "ElectricLogo.jsx", code: entrySource },
        { name: "ElectricLogo.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ElectricLogo } from "solen-design/react";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ElectricLogo
        src="your-logo.svg"
        color="#ecc7ff"
        glowColor="#ad6dff"
        strands={4}
        arcs={1}
        interactive
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
