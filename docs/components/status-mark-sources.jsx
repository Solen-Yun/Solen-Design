import { API } from "./status-mark.jsx";
import entrySource from "../../src/components/status-mark/StatusMark.jsx?raw";
import cssSource from "../../src/components/status-mark/StatusMark.css?raw";
import specSource from "../../src/components/status-mark/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom motion",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom motion",
        pnpm: "pnpm add react react-dom motion",
        yarn: "yarn add react react-dom motion",
        bun: "bun add react react-dom motion",
      },
      files: [
        { name: "StatusMark.jsx", code: entrySource },
        { name: "StatusMark.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { useState } from "react";
import { StatusMark } from "solen-design/react";

const [status, setStatus] = useState("running");

<StatusMark
  status={status}
  progress={0.6}
  label="Deploying site"
  size={20}
  strokeWidth={2}
  dashes={8}
  spinDuration={1100}
  drawDuration={240}
  strike={true}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
