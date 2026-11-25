import { API } from "./circular-text.jsx";
import entrySource from "../../src/components/circular-text/CircularText.jsx?raw";
import cssSource from "../../src/components/circular-text/CircularText.css?raw";
import specSource from "../../src/components/circular-text/SPEC.md?raw";

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
        { name: "CircularText.jsx", code: entrySource },
        { name: "CircularText.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { CircularText } from "solen-design/react";

<CircularText
  text="Solen Design • Solen Design • "
  size={200}
  fontSize={24}
  fontWeight={900}
  spinDuration={20}
  onHover="speedUp"
  direction="clockwise"
  fill={true}
  repeat={1}
  draggable={false}
>
  <span aria-hidden="true">✦</span>
</CircularText>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
