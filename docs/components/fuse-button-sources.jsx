import { API } from "./fuse-button.jsx";
import entrySource from "../../src/components/fuse-button/FuseButton.jsx?raw";
import cssSource from "../../src/components/fuse-button/FuseButton.css?raw";
import specSource from "../../src/components/fuse-button/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom @hugeicons/react @hugeicons/core-free-icons",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom @hugeicons/react @hugeicons/core-free-icons",
        pnpm: "pnpm add react react-dom @hugeicons/react @hugeicons/core-free-icons",
        yarn: "yarn add react react-dom @hugeicons/react @hugeicons/core-free-icons",
        bun: "bun add react react-dom @hugeicons/react @hugeicons/core-free-icons",
      },
      files: [
        { name: "FuseButton.jsx", code: entrySource },
        { name: "FuseButton.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { FuseButton } from "solen-design/react";

<FuseButton
  label="Archive"
  undoLabel="Undo"
  doneLabel="Archived"
  size="md"
  radius={22}
  undoWindow={4000}
  fuse="outline"
  fuseThickness={1.5}
  crossfadeMs={200}
  commitOn="press"
  pauseOnHover={true}
  settle="reset"
  onCommit={(reason) => console.log(reason)}
  onUndo={() => console.log("undo")}
  onFuseEnd={() => console.log("fuse end")}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
