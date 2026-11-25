import { API } from "./halftone-reveal.jsx";
import entrySource from "../../src/components/halftone-reveal/HalftoneReveal.jsx?raw";
import cssSource from "../../src/components/halftone-reveal/HalftoneReveal.css?raw";
import specSource from "../../src/components/halftone-reveal/SPEC.md?raw";

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
        { name: "HalftoneReveal.jsx", code: entrySource },
        { name: "HalftoneReveal.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { HalftoneReveal } from "solen-design/react";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <HalftoneReveal
        src="your-photo.jpg"
        mode="color"
        shape="dot"
        cellSize={6}
        angle={45}
        revealRadius={160}
        clickBurst
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
