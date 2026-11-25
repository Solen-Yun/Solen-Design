import { API } from "./refine-frame.jsx";
import entrySource from "../../src/components/refine-frame/RefineFrame.jsx?raw";
import cssSource from "../../src/components/refine-frame/RefineFrame.css?raw";
import specSource from "../../src/components/refine-frame/SPEC.md?raw";

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
        { name: "RefineFrame.jsx", code: entrySource },
        { name: "RefineFrame.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { RefineFrame } from "solen-design/react";

<RefineFrame
  status="generating"
  aspectRatio="4 / 3"
  width={320}
  radius={16}
  stageDuration={400}
  sweep={true}
  showStatus={true}
  hideAfter={1200}
  labels={{ complete: "Done" }}
  retryLabel="Retry"
  onRetry={() => console.log("retry")}
>
  <img src="./shot.jpg" alt="Generated scene" />
</RefineFrame>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
