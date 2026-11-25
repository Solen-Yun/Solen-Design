import { API } from "./comet-dial.jsx";
import entrySource from "../../src/components/comet-dial/CometDial.jsx?raw";
import cssSource from "../../src/components/comet-dial/CometDial.css?raw";
import specSource from "../../src/components/comet-dial/SPEC.md?raw";

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
        { name: "CometDial.jsx", code: entrySource },
        { name: "CometDial.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { CometDial } from "solen-design/react";

<CometDial
  defaultValue={62}
  min={0}
  max={100}
  step={1}
  unit="%"
  size={250}
  sweep={320}
  thickness={5}
  speed={25}
  momentum={1}
  cometReach={180}
  cometWidth={12}
  onChange={(value) => console.log(value)}
  onChangeEnd={(value, detail) => console.log(value, detail)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
