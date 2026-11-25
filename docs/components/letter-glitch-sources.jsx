import { API } from "./letter-glitch.jsx";
import entrySource from "../../src/components/letter-glitch/LetterGlitch.jsx?raw";
import cssSource from "../../src/components/letter-glitch/LetterGlitch.css?raw";
import specSource from "../../src/components/letter-glitch/SPEC.md?raw";

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
        { name: "LetterGlitch.jsx", code: entrySource },
        { name: "LetterGlitch.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { LetterGlitch } from "solen-design/react";

<div style={{ position: "relative", width: "100%", height: 480 }}>
  <LetterGlitch
    glitchColors={["#ffffff", "#61dca3"]}
    baseColor="#ffffff"
    fontSize={14}
    glitchAmount={0.5}
    density={0.9}
    baseOpacity={0.16}
    clickEffect="tear"
  />
</div>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
