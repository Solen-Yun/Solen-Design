import { API } from "./prompt-bar.jsx";
import entrySource from "../../src/components/prompt-bar/PromptBar.jsx?raw";
import cssSource from "../../src/components/prompt-bar/PromptBar.css?raw";
import specSource from "../../src/components/prompt-bar/SPEC.md?raw";

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
        { name: "PromptBar.jsx", code: entrySource },
        { name: "PromptBar.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { PromptBar } from "solen-design/react";

<PromptBar
  placeholder="Ask anything"
  width={400}
  radius={16}
  maxRows={5}
  morphDuration={240}
  squash={0.12}
  tilt={8}
  defaultEffort="Max"
  onSend={(text, meta) => console.log(text, meta)}
  onStop={() => console.log("stop")}
  onAttach={() => "Q3-report.pdf"}
  onDictate={() => Promise.resolve("Dictated text")}
  onEffortChange={(level) => console.log(level)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
