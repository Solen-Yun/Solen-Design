import { API } from "./spring-check.jsx";
import entrySource from "../../src/components/spring-check/SpringCheck.jsx?raw";
import cssSource from "../../src/components/spring-check/SpringCheck.css?raw";
import specSource from "../../src/components/spring-check/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom motion @hugeicons/core-free-icons",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom motion @hugeicons/core-free-icons",
        pnpm: "pnpm add react react-dom motion @hugeicons/core-free-icons",
        yarn: "yarn add react react-dom motion @hugeicons/core-free-icons",
        bun: "bun add react react-dom motion @hugeicons/core-free-icons",
      },
      files: [
        { name: "SpringCheck.jsx", code: entrySource },
        { name: "SpringCheck.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { useState } from "react";
import { SpringCheck } from "solen-design/react";

const [done, setDone] = useState(false);

<SpringCheck
  label="Ship the build"
  checked={done}
  onChange={setDone}
  bounce={0.2}
  strikeLag={0.12}
  doneOpacity={0.42}
  strike="left"
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
