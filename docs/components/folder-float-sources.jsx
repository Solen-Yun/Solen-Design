import { API } from "./folder-float.jsx";
import entrySource from "../../src/components/folder-float/FolderFloat.jsx?raw";
import cssSource from "../../src/components/folder-float/FolderFloat.css?raw";
import specSource from "../../src/components/folder-float/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom matter-js",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom matter-js",
        pnpm: "pnpm add react react-dom matter-js",
        yarn: "yarn add react react-dom matter-js",
        bun: "bun add react react-dom matter-js",
      },
      files: [
        { name: "FolderFloat.jsx", code: entrySource },
        { name: "FolderFloat.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { FolderFloat } from "solen-design/react";

const items = ["Try a warmer palette", "Tighten the spacing", "Logo feels small", "Love the new hero"];

<FolderFloat
  items={items}
  label="Design feedback"
  trigger="hover"
  physics={true}
  drift={0.5}
  spread={180}
  openDuration={520}
  stagger={45}
  onSelect={(value, index) => console.log(value, index)}
  onOpenChange={(open) => console.log(open)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
