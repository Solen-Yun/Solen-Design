import { API } from "./stack.jsx";
import entrySource from "../../src/components/stack/Stack.jsx?raw";
import cssSource from "../../src/components/stack/Stack.css?raw";
import specSource from "../../src/components/stack/SPEC.md?raw";

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
        { name: "Stack.jsx", code: entrySource },
        { name: "Stack.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { Stack } from "solen-design/react";

const cards = [
  <div style={{ background: "linear-gradient(150deg, #a78bfa, #6d28d9)" }} />,
  <div style={{ background: "linear-gradient(150deg, #60a5fa, #1d4ed8)" }} />,
  <div style={{ background: "linear-gradient(150deg, #f472b6, #be185d)" }} />,
  <div style={{ background: "linear-gradient(150deg, #34d399, #047857)" }} />
];

<Stack
  cards={cards}
  layout="fan"
  visible={4}
  spread={0.5}
  depth={0.5}
  radius={16}
  tilt={30}
  threshold={90}
  speed={1}
  sendToBackOnClick={false}
  onChange={(index) => console.log(index)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
