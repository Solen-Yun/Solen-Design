import { API } from "./masked-heading.jsx";
import entrySource from "../../src/components/masked-heading/MaskedHeading.jsx?raw";
import cssSource from "../../src/components/masked-heading/MaskedHeading.css?raw";
import specSource from "../../src/components/masked-heading/SPEC.md?raw";

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
        { name: "MaskedHeading.jsx", code: entrySource },
        { name: "MaskedHeading.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { MaskedHeading } from "solen-design/react";

<MaskedHeading
  text="Designed in the details"
  mediaType="image"
  src="data:image/svg+xml,...%3E"
  reveal="rise"
  trigger="view"
  fillScale={1.25}
  parallax={26}
  drift={18}
  spotlight
  outline={false}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
