import { API } from "./faulty-terminal.jsx";
import entrySource from "../../src/components/faulty-terminal/FaultyTerminal.jsx?raw";
import cssSource from "../../src/components/faulty-terminal/FaultyTerminal.css?raw";
import specSource from "../../src/components/faulty-terminal/SPEC.md?raw";

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
        { name: "FaultyTerminal.jsx", code: entrySource },
        { name: "FaultyTerminal.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { FaultyTerminal } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 420 }}>
  <FaultyTerminal
    tint="#5dff9e"
    glyphs="blocks"
    timeScale={0.3}
    scanlineIntensity={0.3}
    persistence={0.5}
    glow={0.5}
    mouseReact={true}
    clickEffect="glitch"
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
