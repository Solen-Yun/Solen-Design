import { API } from "./warp-text.jsx";
import entrySource from "../../src/components/warp-text/WarpText.jsx?raw";
import cssSource from "../../src/components/warp-text/WarpText.css?raw";
import specSource from "../../src/components/warp-text/SPEC.md?raw";

const DEP_NOTE = "上方安装命令会自动添加这些依赖。如果手动复制源码，请自行安装。";

export default {
  frameworks: [
    {
      name: "React",
      install: "npm install solen-design react react-dom ogl@^1.0.11",
      dependencies: {
        note: DEP_NOTE,
        npm: "npm install react react-dom ogl@^1.0.11",
        pnpm: "pnpm add react react-dom ogl@^1.0.11",
        yarn: "yarn add react react-dom ogl@^1.0.11",
        bun: "bun add react react-dom ogl@^1.0.11",
      },
      files: [
        { name: "WarpText.jsx", code: entrySource },
        { name: "WarpText.css", code: cssSource },
      ],
      api: API,
      usage: [
        {
          file: "App.jsx",
          code: `import { WarpText } from "solen-design/react";

<WarpText
  text={"Bend the moment"}
  lens="swirl"
  pointerStrength={0.38}
  pointerInfluence={0.42}
  refraction={0.018}
  chromatic={0.35}
  clickRipple={true}
/>`,
        },
      ],
    },
  ],
  prompt: specSource,
};
