import { API } from "./split-flap-text.jsx";
import entrySource from "../../src/components/split-flap-text/SplitFlapText.jsx?raw";
import cssSource from "../../src/components/split-flap-text/SplitFlapText.css?raw";
import specSource from "../../src/components/split-flap-text/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom",
        pnpm: "pnpm add react react-dom",
        yarn: "yarn add react react-dom",
        bun: "bun add react react-dom",
      },
      files: [
        { name: "SplitFlapText.jsx", code: entrySource },
        { name: "SplitFlapText.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { SplitFlapText } from "solen-design/react";

<SplitFlapText
  words={["LAUNCH READY", "SYNC ONLINE", "SIGNAL LIVE"]}
  flipDuration={0.12}
  stagger={0.06}
  cycleDelay={2400}
  flipsPerChar={8}
  order="left"
  align="left"
  depth={0.5}
  fontSize={52}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
