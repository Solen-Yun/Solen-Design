import { API } from "./call-chip.jsx";
import entrySource from "../../src/components/call-chip/CallChip.jsx?raw";
import cssSource from "../../src/components/call-chip/CallChip.css?raw";
import specSource from "../../src/components/call-chip/SPEC.md?raw";

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
        { name: "CallChip.jsx", code: entrySource },
        { name: "CallChip.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { CallChip } from "solen-design/react";

<CallChip
  name="bash"
  argument="npm test"
  status="running"
  expectedMs={2500}
  size={34}
  radius={10}
  showTimer={true}
  onRetry={() => setRunning()}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
