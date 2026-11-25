import { API } from "./code-slots.jsx";
import entrySource from "../../src/components/code-slots/CodeSlots.jsx?raw";
import cssSource from "../../src/components/code-slots/CodeSlots.css?raw";
import specSource from "../../src/components/code-slots/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
        pnpm: "pnpm add react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
        yarn: "yarn add react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
        bun: "bun add react react-dom motion @hugeicons/react @hugeicons/core-free-icons",
      },
      files: [
        { name: "CodeSlots.jsx", code: entrySource },
        { name: "CodeSlots.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { CodeSlots } from "solen-design/react";

<CodeSlots
  length={6}
  defaultValue=""
  status={status}
  slotSize={44}
  gap={8}
  radius={12}
  bounce={0.2}
  settle={0.3}
  cascade={20}
  onChange={(code) => setCode(code)}
  onComplete={(code) => verify(code)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
