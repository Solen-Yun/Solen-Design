import { API } from "./hold-button.jsx";
import entrySource from "../../src/components/hold-button/HoldButton.jsx?raw";
import cssSource from "../../src/components/hold-button/HoldButton.css?raw";
import specSource from "../../src/components/hold-button/SPEC.md?raw";

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
        { name: "HoldButton.jsx", code: entrySource },
        { name: "HoldButton.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { HoldButton } from "solen-design/react";

<HoldButton
  doneLabel="Deleted"
  size="md"
  radius={14}
  fillDirection="right"
  holdTime={2000}
  releaseTime={200}
  pressScale={0.97}
  waveAmplitude={6}
  wave={true}
  glow={true}
  resetAfter={1200}
  onHold={() => console.log("confirmed")}
  onTap={() => console.log("tapped")}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
