import { API } from "./curved-input.jsx";
import entrySource from "../../src/components/curved-input/CurvedInput.jsx?raw";
import cssSource from "../../src/components/curved-input/CurvedInput.css?raw";
import specSource from "../../src/components/curved-input/SPEC.md?raw";

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
        { name: "CurvedInput.jsx", code: entrySource },
        { name: "CurvedInput.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { CurvedInput } from "solen-design/react";

<CurvedInput
  theme="dark"
  bend={28}
  width={450}
  height={64}
  fontSize={16}
  placeholder="Enter your email"
  buttonText="Get Started"
  showButton={true}
  showIcon={true}
  onSubmit={(value) => console.log(value)}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
