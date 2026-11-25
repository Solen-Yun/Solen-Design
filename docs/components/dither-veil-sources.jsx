import { API } from "./dither-veil.jsx";
import entrySource from "../../src/components/dither-veil/DitherVeil.jsx?raw";
import cssSource from "../../src/components/dither-veil/DitherVeil.css?raw";
import specSource from "../../src/components/dither-veil/SPEC.md?raw";

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
        { name: "DitherVeil.jsx", code: entrySource },
        { name: "DitherVeil.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { DitherVeil } from "solen-design/react";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <DitherVeil
        src="your-photo.jpg"
        pattern="floyd"
        pixelSize={2}
        revealRadius={200}
        linger={1}
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
