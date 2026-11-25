import { API } from "./shape-blur.jsx";
import entrySource from "../../src/components/shape-blur/ShapeBlur.jsx?raw";
import cssSource from "../../src/components/shape-blur/ShapeBlur.css?raw";
import specSource from "../../src/components/shape-blur/SPEC.md?raw";

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
        { name: "ShapeBlur.jsx", code: entrySource },
        { name: "ShapeBlur.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ShapeBlur } from "solen-design/react";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ShapeBlur
        shape="polygon"
        sides={6}
        thickness={2}
        blur={16}
        color="#ffffff"
        lensSize={0.3}
        chroma={0.3}
      >
        <span>Your content sits above the lens</span>
      </ShapeBlur>
    </div>
  );
}`,
        },
      ],
    },
  ],
  prompt: specSource,
};
