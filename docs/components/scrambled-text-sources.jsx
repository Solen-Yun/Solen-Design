import { API } from "./scrambled-text.jsx";
import entrySource from "../../src/components/scrambled-text/ScrambledText.jsx?raw";
import cssSource from "../../src/components/scrambled-text/ScrambledText.css?raw";
import specSource from "../../src/components/scrambled-text/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom gsap@^3.13.0",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom gsap@^3.13.0",
        pnpm: "pnpm add react react-dom gsap@^3.13.0",
        yarn: "yarn add react react-dom gsap@^3.13.0",
        bun: "bun add react react-dom gsap@^3.13.0",
      },
      files: [
        { name: "ScrambledText.jsx", code: entrySource },
        { name: "ScrambledText.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { ScrambledText } from "solen-design/react";

<ScrambledText
  radius={100}
  duration={1.2}
  speed={0.5}
  scrambleChars=".:"
  effect="lift"
  strength={1}
  trail={0.6}
  clickBurst
  intro
  scrambleColor="#ff5a36"
>
  The signal decodes as you sweep across it.
</ScrambledText>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
