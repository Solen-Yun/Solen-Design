import { API } from "./ballpit.jsx";
import entrySource from "../../src/components/ballpit/Ballpit.jsx?raw";
import specSource from "../../src/components/ballpit/SPEC.md?raw";

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
      files: [{ name: "Ballpit.jsx", code: entrySource }],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Ballpit } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: "100vh" }}>
  <Ballpit
    count={200}
    colors={["#ffd93d", "#ff6b6b", "#4d96ff", "#6bd98b"]}
    material="satin"
    minSize={0.5}
    maxSize={1}
    gravity={0.5}
    bounce={0.85}
    depth={2}
    cursorSize={1}
    grab={true}
    followCursor={true}
    intro={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
