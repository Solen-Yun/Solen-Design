import { API } from "./thought-line.jsx";
import entrySource from "../../src/components/thought-line/ThoughtLine.jsx?raw";
import cssSource from "../../src/components/thought-line/ThoughtLine.css?raw";
import specSource from "../../src/components/thought-line/SPEC.md?raw";

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
        { name: "ThoughtLine.jsx", code: entrySource },
        { name: "ThoughtLine.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { useState } from "react";
import { ThoughtLine } from "solen-design/react";

const [working, setWorking] = useState(true);

<ThoughtLine
  label="Thinking…"
  steps={["解析问题结构", "检索相关组件模式", "整理结论"]}
  working={working}
  settleAfter={0}
  showTimer={true}
  shimmer={true}
  collapseOnSettle={true}
  onSettle={(seconds) => {
    setWorking(false);
    console.log("settled after", seconds, "s");
  }}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
