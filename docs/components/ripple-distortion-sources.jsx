import { API } from "./ripple-distortion.jsx";
import entrySource from "../../src/components/ripple-distortion/RippleDistortion.jsx?raw";
import cssSource from "../../src/components/ripple-distortion/RippleDistortion.css?raw";
import specSource from "../../src/components/ripple-distortion/SPEC.md?raw";

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
        { name: "RippleDistortion.jsx", code: entrySource },
        { name: "RippleDistortion.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { RippleDistortion } from "solen-design/react";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <RippleDistortion
        src="your-photo.jpg"
        brushSize={150}
        strength={0.2}
        swirl={1}
        glint={0.4}
        trigger="hover"
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
