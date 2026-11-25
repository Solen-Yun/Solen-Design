import { API } from "./text-cursor.jsx";
import entrySource from "../../src/components/text-cursor/TextCursor.jsx?raw";
import cssSource from "../../src/components/text-cursor/TextCursor.css?raw";
import specSource from "../../src/components/text-cursor/SPEC.md?raw";

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
        { name: "TextCursor.jsx", code: entrySource },
        { name: "TextCursor.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { TextCursor } from "solen-design/react";

<div style={{ width: "100%", height: "100vh" }}>
  <TextCursor
    text="Hello"
    mode="stamp"
    spacing={88}
    maxPoints={7}
    fontSize={28}
    followMouseDirection
    randomFloat
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
