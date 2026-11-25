import { API } from "./fade-content.jsx";
import entrySource from "../../src/components/fade-content/FadeContent.jsx?raw";
import specSource from "../../src/components/fade-content/SPEC.md?raw";

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
        { name: "FadeContent.jsx", code: entrySource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { FadeContent } from "solen-design/react";

<FadeContent effect="mist" duration={1.2} threshold={0.1} trigger="scroll">
  <img src="/photo.jpg" alt="进入视口时穿过雾气显影" />
</FadeContent>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
