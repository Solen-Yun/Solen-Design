import { API } from "./decrypted-text.jsx";
import entrySource from "../../src/components/decrypted-text/DecryptedText.jsx?raw";
import specSource from "../../src/components/decrypted-text/SPEC.md?raw";

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
      files: [{ name: "DecryptedText.jsx", code: entrySource }],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { DecryptedText } from "solen-design/react";

<DecryptedText
  text="ACCESS GRANTED"
  animateOn="view"
  effect="scramble"
  speed={50}
  maxIterations={10}
  sequential={false}
  revealDirection="start"
  scrambleColor="#22d3ee"
  encryptedClassName="text-cyan-300"
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
