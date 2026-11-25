import { API } from "./glitch-text.jsx";
import entrySource from "../../src/components/glitch-text/GlitchText.jsx?raw";
import cssSource from "../../src/components/glitch-text/GlitchText.css?raw";
import specSource from "../../src/components/glitch-text/SPEC.md?raw";

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
        { name: "GlitchText.jsx", code: entrySource },
        { name: "GlitchText.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { GlitchText } from "solen-design/react";

<GlitchText
  mode="slices"
  intensity={0.5}
  speed={0.5}
  offset={10}
  shadowColors={["#ff0000", "#00ffff"]}
  fontSize={64}
  fontWeight={900}
>
  GLITCH
</GlitchText>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
