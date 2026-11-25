import { API } from "./jelly-radio.jsx";
import entrySource from "../../src/components/jelly-radio/JellyRadio.jsx?raw";
import cssSource from "../../src/components/jelly-radio/JellyRadio.css?raw";
import specSource from "../../src/components/jelly-radio/SPEC.md?raw";

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
        { name: "JellyRadio.jsx", code: entrySource },
        { name: "JellyRadio.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { JellyRadio } from "solen-design/react";

const items = ["Off", "Low", "Medium", "High", "Max"];

<JellyRadio
  items={items}
  defaultValue="Medium"
  size="md"
  gap={8}
  radius={18}
  swell={0.2}
  barge={6}
  shrink={0.05}
  jelly={1}
  bounce={0.25}
  stagger={22}
  stiffness={580}
  onChange={(value, index) => console.log(value, index)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
