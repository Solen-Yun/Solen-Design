import { API } from "./pattern-waves.jsx";
import entrySource from "../../src/components/pattern-waves/PatternWaves.jsx?raw";
import cssSource from "../../src/components/pattern-waves/PatternWaves.css?raw";
import specSource from "../../src/components/pattern-waves/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom ogl@^1.0.11",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom ogl@^1.0.11",
        pnpm: "pnpm add react react-dom ogl@^1.0.11",
        yarn: "yarn add react react-dom ogl@^1.0.11",
        bun: "bun add react react-dom ogl@^1.0.11",
      },
      files: [
        { name: "PatternWaves.jsx", code: entrySource },
        { name: "PatternWaves.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { PatternWaves } from "solen-design/react";

<div style={{ position: "relative", height: 340 }}>
  <PatternWaves
    preset="silk"
    pattern="dot"
    wave="silk"
    spacing={9}
    markSize={0.95}
    depth={0.95}
    shine={0.8}
    color="#ffffff"
    fade="edges"
    interactive={true}
    cursorSize={50}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
