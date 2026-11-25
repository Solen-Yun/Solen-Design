import { API } from "./scrub-field.jsx";
import entrySource from "../../src/components/scrub-field/ScrubField.jsx?raw";
import cssSource from "../../src/components/scrub-field/ScrubField.css?raw";
import specSource from "../../src/components/scrub-field/SPEC.md?raw";

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
        { name: "ScrubField.jsx", code: entrySource },
        { name: "ScrubField.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ScrubField } from "solen-design/react";

<ScrubField
  label="Radius"
  suffix="px"
  defaultValue={24}
  min={0}
  max={100}
  step={1}
  size="md"
  sensitivity={2}
  rubberReach={8}
  returnDuration={300}
  coarseMultiplier={10}
  fineMultiplier={0.1}
  showDelta={true}
  showFill={true}
  accent="#f5f5f5"
  chipColor="#27272a"
  onChange={(value) => console.log(value)}
  onCommit={(value) => console.log("commit", value)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
