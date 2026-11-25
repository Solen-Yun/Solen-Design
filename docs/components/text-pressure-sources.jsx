import { API } from "./text-pressure.jsx";
import entrySource from "../../src/components/text-pressure/TextPressure.jsx?raw";
import specSource from "../../src/components/text-pressure/SPEC.md?raw";

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
      files: [{ name: "TextPressure.jsx", code: entrySource }],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { TextPressure } from "solen-design/react";

<div style={{ width: "100%", height: "40vh" }}>
  <TextPressure
    text="Compressa"
    width
    weight
    italic
    flex
    radius={0.5}
    smoothing={0.5}
    idle="wave"
    clickRipple
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
