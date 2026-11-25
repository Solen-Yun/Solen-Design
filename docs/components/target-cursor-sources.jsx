import { API } from "./target-cursor.jsx";
import entrySource from "../../src/components/target-cursor/TargetCursor.jsx?raw";
import cssSource from "../../src/components/target-cursor/TargetCursor.css?raw";
import specSource from "../../src/components/target-cursor/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom@^19.0.0",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom@^19.0.0",
        pnpm: "pnpm add react react-dom@^19.0.0",
        yarn: "yarn add react react-dom@^19.0.0",
        bun: "bun add react react-dom@^19.0.0",
      },
      files: [
        { name: "TargetCursor.jsx", code: entrySource },
        { name: "TargetCursor.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { TargetCursor } from "solen-design/react";

<div style={{ minHeight: "100vh", background: "#101014", color: "#fff" }}>
  <button className="cursor-target" data-cursor-label="部署">
    部署
  </button>
  <a className="cursor-target" href="#docs">
    文档
  </a>
  <TargetCursor
    targetSelector=".cursor-target"
    cursorColor="#ffffff"
    cursorColorOnTarget="#a5b4fc"
    spinDuration={2}
    hoverDuration={0.2}
    parallaxOn={true}
    hideDefaultCursor={true}
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
