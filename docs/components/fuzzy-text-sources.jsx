import { API } from "./fuzzy-text.jsx";
import entrySource from "../../src/components/fuzzy-text/FuzzyText.jsx?raw";
import specSource from "../../src/components/fuzzy-text/SPEC.md?raw";

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
      files: [{ name: "FuzzyText.jsx", code: entrySource }],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { FuzzyText } from "solen-design/react";

<FuzzyText
  color="#f4f4f5"
  trigger="hover"
  baseIntensity={0.18}
  hoverIntensity={0.5}
  fuzzRange={30}
  colorSplit={1.2}
>
  FUZZY
</FuzzyText>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
